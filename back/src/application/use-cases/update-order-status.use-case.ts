import { Injectable, Inject } from "@nestjs/common";
import { Order, OrderStatus } from "../../domain/entities/order.entity";
import { ORDER_REPOSITORY } from "../../infrastructure/repositories/order.repository";
import { OrderRepository } from "../../infrastructure/repositories/order.repository";
import { PartStockRepository, PART_STOCK_REPOSITORY } from "../../infrastructure/repositories/part-stock.repository";

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository,
    @Inject(PART_STOCK_REPOSITORY) private readonly partStockRepository: PartStockRepository
  ) {}

  async execute(): Promise<void> {
    const now = new Date();

    const orders = await this.orderRepository.findAllNotShipped();

    for (const order of orders) {
      if (order.expectedDeliveryDate <= now) {
        console.log(`🚚 Commande ${order.id} passée en SHIPPED !`);

        order.status = OrderStatus.SHIPPED;
        await this.orderRepository.update(order);

        await this.updateStock(order);
      }
    }
  }

  private async updateStock(order: Order): Promise<void> {
    const entityId = order.company?.id || order.concession?.id || order.client?.id;
    if (!entityId) {
      console.error(`Impossible de mettre à jour le stock : aucune entité Client Concession Company trouvée pour la commande ${order.id}`);
      return;
    }

    console.log(`Mise à jour du stock pour l'entité ID: ${entityId} (Entreprise/Concession/Client)`);

    for (const orderItem of order.orderItems) {
      const partId = orderItem.partSupplier.part.id;
      const quantityToAdd = orderItem.quantity;

      console.log(`Ajout de ${quantityToAdd} unités de ${orderItem.partSupplier.part.name} au stock`);

      const stock = await this.partStockRepository.findStock(entityId, partId);
      if (stock) {
        await this.partStockRepository.updateStockWithoutThreshold(stock.id, stock.quantity + quantityToAdd);
      } else {
        await this.partStockRepository.createStock(entityId, partId, quantityToAdd);
      }
    }
  }
}

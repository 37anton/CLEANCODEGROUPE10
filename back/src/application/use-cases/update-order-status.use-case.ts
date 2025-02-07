import { Injectable, Inject } from "@nestjs/common";
import { Order, OrderStatus } from "../../domain/entities/order.entity";
import { ORDER_REPOSITORY } from "../../infrastructure/repositories/order.repository";
import { OrderRepository } from "../../infrastructure/repositories/order.repository";

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository
  ) {}

  async execute(): Promise<void> {
    const now = new Date();

    // 🔍 Récupérer toutes les commandes qui ne sont pas SHIPPED
    const orders = await this.orderRepository.findAllNotShipped();

    for (const order of orders) {
      if (order.expectedDeliveryDate <= now) {
        console.log(`Commande ${order.id} passée en SHIPPED !`);

        // Mise à jour du statut
        order.status = OrderStatus.SHIPPED;
        await this.orderRepository.update(order);
      }
    }
  }
}
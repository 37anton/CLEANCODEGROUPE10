// Vérifier que l'utilisateur a une entreprise, une concession ou est un client
// Calculer le total de la commande en récupérant les prix des produits commandés
// Enregistrer la commande et ses éléments

import { Injectable, BadRequestException, UnauthorizedException, Inject } from "@nestjs/common";
import { PartSupplierRepository } from "../../infrastructure/repositories/part-supplier.repository";
import { Order, OrderStatus } from "../../domain/entities/order.entity";
import { OrderItem } from "../../domain/entities/order-item.entity";
import { User } from "../../domain/entities/user.entity";
import { ORDER_REPOSITORY } from "../../infrastructure/repositories/order.repository";
import { PART_SUPPLIER_REPOSITORY } from "../../infrastructure/repositories/part-supplier.repository";

interface CreateOrderDto {
  supplierId: string;
  items: { partSupplierId: string; quantity: number }[];
  expectedDeliveryDate: Date;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: any,
    @Inject(PART_SUPPLIER_REPOSITORY) private readonly partSupplierRepository: PartSupplierRepository
  ) {}

  async execute(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    if (!user.company && !user.concession && !user.client) {
      throw new UnauthorizedException("L'utilisateur doit être rattaché à une entreprise, une concession ou un client.");
    }

    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const partSupplier = await this.partSupplierRepository.findById(item.partSupplierId);
      if (!partSupplier) {
        throw new BadRequestException(`Fournisseur pour la pièce ${item.partSupplierId} introuvable.`);
      }

      const itemTotal = Number(partSupplier.price) * item.quantity;
      totalPrice += itemTotal;

      const orderItem = new OrderItem();
      orderItem.partSupplier = partSupplier;
      orderItem.quantity = item.quantity;
      orderItem.price = Number(partSupplier.price);
      orderItems.push(orderItem);
    }

    const order = new Order();
    order.supplier = { id: createOrderDto.supplierId } as any;
    order.orderItems = orderItems;
    order.totalPrice = totalPrice;
    order.expectedDeliveryDate = createOrderDto.expectedDeliveryDate;
    order.status = OrderStatus.PENDING;

    // Assigner à l'utilisateur (entreprise, concession ou client)
    if (user.company) {
      order.company = user.company;
    } else if (user.concession) {
      order.concession = user.concession;
    } else if (user.client){
      order.client = user.client;
    }

    return this.orderRepository.createOrder(order);
}
  }
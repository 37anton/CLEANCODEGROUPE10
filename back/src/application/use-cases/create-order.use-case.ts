// Vérifier que l'utilisateur a une entreprise, une concession ou est un client
// Calculer le total de la commande en récupérant les prix des produits commandés
// Enregistrer la commande et ses éléments

import { Injectable, BadRequestException, UnauthorizedException, Inject } from "@nestjs/common";
import { PartSupplierRepository } from "../../infrastructure/repositories/part-supplier.repository";
import { Order, OrderStatus } from "../../domain/entities/order.entity";
import { OrderItem } from "../../domain/entities/order-item.entity";
import { SupplierRepository, SUPPLIER_REPOSITORY } from "../../infrastructure/repositories/supplier.repository";
import { User } from "../../domain/entities/user.entity";
import { ORDER_REPOSITORY } from "../../infrastructure/repositories/order.repository";
import { PART_SUPPLIER_REPOSITORY } from "../../infrastructure/repositories/part-supplier.repository";

interface CreateOrderDto {
  supplierId: string;
  items: { partSupplierId: string; quantity: number }[];
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: any,
    @Inject(PART_SUPPLIER_REPOSITORY) private readonly partSupplierRepository: PartSupplierRepository,
    @Inject(SUPPLIER_REPOSITORY) private readonly supplierRepository: SupplierRepository
  ) {}

  async execute(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    // Vérifier que l'utilisateur est lié à une entreprise, une concession ou un client
    if (!user.company && !user.concession && !user.client) {
      throw new UnauthorizedException(
        "L'utilisateur doit être rattaché à une entreprise, une concession ou un client."
      );
    }

    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    // Vérifier que le fournisseur existe et récupérer son deliveryTime
    const supplier = await this.supplierRepository.findById(createOrderDto.supplierId);
    if (!supplier) {
      throw new BadRequestException(`Fournisseur avec l'ID ${createOrderDto.supplierId} introuvable.`);
    }

    // Pour chaque item de commande, récupérer le PartSupplier et calculer le total
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

    // Calcul de la date de livraison estimée (en ajoutant le délai de livraison du fournisseur en minutes)
    const now = new Date();
    const expectedDeliveryDate = new Date(now.getTime() + supplier.deliveryTime * 60 * 1000);

    // Création de l'ordre
    const order = new Order();
    order.supplier = { id: createOrderDto.supplierId } as any;
    order.orderItems = orderItems;
    order.totalPrice = totalPrice;
    order.expectedDeliveryDate = expectedDeliveryDate;
    order.status = OrderStatus.PENDING;

    // Affecter l'order à une entreprise, concession ou client
    if (user.company) {
      order.company = user.company;
    } else if (user.concession) {
      order.concession = user.concession;
    } else if (user.client) {
      order.client = user.client;
    }

    return await this.orderRepository.createOrder(order);
  }
}
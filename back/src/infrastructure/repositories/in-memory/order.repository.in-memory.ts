import { Inject, Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../order.repository';
import { PART_SUPPLIER_REPOSITORY, PartSupplierRepository } from '../part-supplier.repository';
import { PART_REPOSITORY, PartRepository } from '../part.repository';
import { SUPPLIER_REPOSITORY, SupplierRepository } from '../supplier.repository';

@Injectable()
export class OrderInMemoryRepository implements OrderRepository {
  private orders: Order[] = [];

  constructor(
    @Inject(PART_SUPPLIER_REPOSITORY) private readonly partSupplierRepository: PartSupplierRepository,
    @Inject(PART_REPOSITORY) private readonly partRepository: PartRepository,
    @Inject(SUPPLIER_REPOSITORY) private readonly supplierRepository: SupplierRepository
  ) {}

  async getOrdersByUser(userAssociationId: string): Promise<Order[]> {
    return Promise.all(
        this.orders
            .filter(order =>
                order.company?.id === userAssociationId ||
                order.concession?.id === userAssociationId ||
                order.client?.id === userAssociationId
            )
            .map(async order => {
                // Récupérer le fournisseur complet
                const supplier = await this.supplierRepository.findById(order.supplier.id);
                if (supplier) {
                    order.supplier = {
                        id: supplier.id,
                        name: supplier.name,
                        phone: supplier.phone || "N/A",
                        deliveryTime: supplier.deliveryTime || 0,
                        city: supplier.city || "Non défini",
                        partSuppliers: supplier.partSuppliers || []
                    };
                } else {
                    order.supplier = {
                        id: order.supplier.id,
                        name: "Fournisseur inconnu",
                        phone: "N/A",
                        deliveryTime: 0,
                        city: "Non défini",
                        partSuppliers: []
                    };
                }

                // Associe le fournisseur et les pièces aux items de commande
                order.orderItems = await Promise.all(
                    order.orderItems.map(async orderItem => {
                        const partSupplier = await this.partSupplierRepository.findById(orderItem.partSupplier.id);
                        if (partSupplier) {
                            orderItem.partSupplier = {
                                ...partSupplier,
                                part: await this.partRepository.findById(partSupplier.part.id),
                                supplier: await this.supplierRepository.findById(partSupplier.supplier.id),
                            };
                        }
                        return orderItem;
                    })
                );

                return order;
            })
    );
}

  async createOrder(order: Order): Promise<Order> {
    order.id = Math.random().toString(36).substring(7);
    this.orders.push(order);
    return order;
  }

  async findAllNotShipped(): Promise<Order[]> {
    return this.orders.filter(order => order.status !== OrderStatus.SHIPPED);
  }

  async update(order: Order): Promise<Order> {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      this.orders[index] = order;
    }
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.find(o => o.id === id) || null;
  }
}

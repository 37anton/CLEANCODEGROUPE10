import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../order.repository';

@Injectable()
export class OrderInMemoryRepository implements OrderRepository {
  private orders: Order[] = [];

  async getOrdersByUser(userAssociationId: string): Promise<Order[]> {
    return this.orders.filter(order =>
      order.company?.id === userAssociationId ||
      order.concession?.id === userAssociationId ||
      order.client?.id === userAssociationId
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

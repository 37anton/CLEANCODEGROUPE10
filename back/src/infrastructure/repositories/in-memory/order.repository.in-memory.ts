import { Injectable } from '@nestjs/common';
import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../order.repository';

@Injectable()
export class OrderInMemoryRepository implements OrderRepository {
  private orders: Order[] = [];

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return this.orders.filter(order =>
      order.company?.id === userId ||
      order.concession?.id === userId ||
      order.client?.id === userId
    );
  }
}

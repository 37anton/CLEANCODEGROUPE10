export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
import { Order } from "../../domain/entities/order.entity";

export interface OrderRepository {
  getOrdersByUser(userAssociationId: string): Promise<any>;
  createOrder(order: Order): Promise<Order>;
  findAllNotShipped(): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
}
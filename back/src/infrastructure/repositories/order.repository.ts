export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
import { Order } from "../../domain/entities/order.entity";

export interface OrderRepository {
  getOrdersByUser(userId: string): Promise<any>;
  createOrder(order: Order): Promise<Order>;
  findAllNotShipped(): Promise<Order[]>;
  update(order: Order): Promise<Order>; 
}
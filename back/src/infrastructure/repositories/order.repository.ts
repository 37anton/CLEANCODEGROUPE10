export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepository {
  getOrdersByUser(userId: string): Promise<any>;
}
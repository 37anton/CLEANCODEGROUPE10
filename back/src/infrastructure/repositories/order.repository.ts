export const ORDER_REPOSITORY = "ORDER_REPOSITORY";

import { Order } from "../../domain/entities/order.entity";

export interface OrderRepository {
  findByCompany(companyId: string): Promise<Order[]>;
  findByConcession(concessionId: string): Promise<Order[]>;
  findByClient(clientId: string): Promise<Order[]>;
}

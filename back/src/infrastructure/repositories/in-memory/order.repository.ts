import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../../../infrastructure/repositories/order.repository";
import { Order } from "../../../domain/entities/order.entity";

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];

  async findByCompany(companyId: string): Promise<Order[]> {
    return this.orders.filter(order => order.company?.id === companyId);
  }

  async findByConcession(concessionId: string): Promise<Order[]> {
    return this.orders.filter(order => order.concession?.id === concessionId);
  }

  async findByClient(clientId: string): Promise<Order[]> {
    return this.orders.filter(order => order.client?.id === clientId);
  }
}

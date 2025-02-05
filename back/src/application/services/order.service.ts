import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { ORDER_REPOSITORY, OrderRepository } from "../../infrastructure/repositories/order.repository";
import { Order } from "../../domain/entities/order.entity";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository
  ) {}

  async getOrdersByUser(user: User): Promise<Order[]> {
    if (user.company) {
      return this.orderRepository.findByCompany(user.company.id);
    } else if (user.concession) {
      return this.orderRepository.findByConcession(user.concession.id);
    } else if (user.client) {
      return this.orderRepository.findByClient(user.client.id);
    }
    return [];
  }
}

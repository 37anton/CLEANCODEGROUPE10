import { Injectable, Inject } from '@nestjs/common';
import { OrderRepository, ORDER_REPOSITORY } from '../../infrastructure/repositories/order.repository';

@Injectable()
export class FindOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository,
  ) {}

  async execute(userId: string) {
    return await this.orderRepository.getOrdersByUser(userId);
  }
}
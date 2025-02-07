import { Injectable } from '@nestjs/common';
import { FindOrdersUseCase } from '../use-cases/find-orders.use-case';

@Injectable()
export class OrderService {
  constructor(
    private readonly findOrdersUseCase: FindOrdersUseCase,
  ) {}

  async getOrdersByUser(userId: string) {
    return await this.findOrdersUseCase.execute(userId);
  }
}
import { Injectable } from '@nestjs/common';
import { FindOrdersUseCase } from '../use-cases/find-orders.use-case';
import { CreateOrderUseCase } from '../use-cases/create-order.use-case';
import { User } from "../../domain/entities/user.entity";
import { Cron } from "@nestjs/schedule";
import { UpdateOrderStatusUseCase } from "../use-cases/update-order-status.use-case";

interface CreateOrderDto {
  supplierId: string;
  items: { partSupplierId: string; quantity: number }[];
  expectedDeliveryDate: Date;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly findOrdersUseCase: FindOrdersUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase
  ) {}

  async getOrdersByUser(userId: string) {
    return await this.findOrdersUseCase.execute(userId);
  }

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(user, createOrderDto);
  }

  @Cron("*/30 * * * * *")
  async checkOrdersStatus() {
    console.log("Vérification des commandes...");
    await this.updateOrderStatusUseCase.execute();
  }
}
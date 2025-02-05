import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../../../domain/entities/order.entity";
import { OrderService } from "../../../application/services/order.service";
import { OrderController } from "../../frameworks/nestjs/order.controller";
import { ORDER_REPOSITORY } from "../../../infrastructure/repositories/order.repository";
import { SqlOrderRepository } from "../../repositories/sql/order.repository";
import { InMemoryOrderRepository } from "../../repositories/in-memory/order.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY === "true" ? InMemoryOrderRepository : SqlOrderRepository
    }
  ],
  exports: [OrderService, ORDER_REPOSITORY],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../domain/entities/order.entity';
import { OrderService } from '../../application/services/order.service';
import { OrderController } from '../../interfaces/controllers/order.controller';
import { ORDER_REPOSITORY } from '../repositories/order.repository';
import { User } from 'src/domain/entities/user.entity'; 
import { UserModule } from './user.module';
import { FindOrdersUseCase } from 'src/application/use-cases/find-orders.use-case';
import { OrderSqlRepository } from '../repositories/sql/order.repository.sql';
import { OrderInMemoryRepository } from '../repositories/in-memory/order.repository.in-memory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User]),
    UserModule
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    FindOrdersUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === 'in-memory' ? OrderInMemoryRepository : OrderSqlRepository,
    },
  ],
  exports: [OrderService, ORDER_REPOSITORY],
})
export class OrderModule {}

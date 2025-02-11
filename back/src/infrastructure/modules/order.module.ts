import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../domain/entities/order.entity';
import { OrderService } from '../../application/services/order.service';
import { OrderController } from '../../application/controllers/order.controller';
import { ORDER_REPOSITORY } from '../repositories/order.repository';
import { User } from 'src/domain/entities/user.entity'; 
import { UserModule } from './user.module';
import { FindOrdersUseCase } from 'src/application/use-cases/find-orders.use-case';
import { OrderSqlRepository } from '../repositories/sql/order.repository.sql';
import { OrderInMemoryRepository } from '../repositories/in-memory/order.repository.in-memory';
import { PartSupplier } from "../../domain/entities/part-supplier.entity";
import { CreateOrderUseCase } from "../../application/use-cases/create-order.use-case";
import { PART_SUPPLIER_REPOSITORY } from '../repositories/part-supplier.repository';
import { PartSupplierSqlRepository } from '../repositories/sql/part-supplier.repository.sql';
import { PartSupplierInMemoryRepository } from '../repositories/in-memory/part-supplier.repository.in-memory';
import { SupplierModule } from './supplier.module';
import { UpdateOrderStatusUseCase } from "../../application/use-cases/update-order-status.use-case";
import { PART_STOCK_REPOSITORY } from '../repositories/part-stock.repository';
import { PartStockModule } from "./part-stock.module"; 
import { PartSupplierModule } from './part-supplier.module';
import { PartModule } from './part.module';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    PartModule,
    ...(!isInMemory ? [TypeOrmModule.forFeature([Order, User, PartSupplier])] : []),
    UserModule,
    SupplierModule,
    PartStockModule,
    PartSupplierModule
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    UpdateOrderStatusUseCase,
    FindOrdersUseCase,
    CreateOrderUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === 'in-memory' ? OrderInMemoryRepository : OrderSqlRepository,
    },
  ],
  exports: [OrderService, ORDER_REPOSITORY],
})
export class OrderModule {}

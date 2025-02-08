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
import { PartSupplier } from "../../domain/entities/part-supplier.entity";
import { CreateOrderUseCase } from "../../application/use-cases/create-order.use-case";
import { PART_SUPPLIER_REPOSITORY } from '../repositories/part-supplier.repository';
import { PartSupplierSqlRepository } from '../repositories/sql/part-supplier.repository.sql';
import { PartSupplierInMemoryRepository } from '../repositories/in-memory/part-supplier.repository.in-memory';
import { SupplierModule } from './supplier.module';
import { UpdateOrderStatusUseCase } from "../../application/use-cases/update-order-status.use-case";
import { PART_STOCK_REPOSITORY } from '../repositories/part-stock.repository';
import { PartStockModule } from "./part-stock.module"; 

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Order, User, PartSupplier])] : []),
    UserModule,
    SupplierModule,
    PartStockModule
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
    {
      provide: PART_SUPPLIER_REPOSITORY,
      useClass: process.env.STORAGE_ADAPTER === 'in-memory' ? PartSupplierInMemoryRepository : PartSupplierSqlRepository,
    }    
  ],
  exports: [OrderService, ORDER_REPOSITORY, PART_SUPPLIER_REPOSITORY],
})
export class OrderModule {}

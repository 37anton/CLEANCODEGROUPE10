import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from '../../domain/entities/repair.entity';
import { SQLRepairRepository } from '../../infrastructure/repositories/sql/sql-repair.repository';
import { InMemoryRepairRepository } from '../../infrastructure/repositories/in-memory/in-memory-repair.repository';
import { CreateRepairUseCase } from '../../application/use-cases/create-repair.use-case';
import { GetRepairHistoryUseCase } from '../../application/use-cases/get-repair-history.use-case';
import { REPAIR_REPOSITORY } from '../repositories/repair.repository';
import { RepairController } from 'src/application/controllers/repair.controller';
import { PartStockModule } from './part-stock.module';
const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Repair])] : []),
    PartStockModule,
  ],
  controllers: [RepairController],
  providers: [
    {
      provide: REPAIR_REPOSITORY,
      useClass: isInMemory ? InMemoryRepairRepository : SQLRepairRepository,
    },
    CreateRepairUseCase,
    GetRepairHistoryUseCase,
  ],
  exports: [
    CreateRepairUseCase,
    GetRepairHistoryUseCase,
    REPAIR_REPOSITORY,
    ...(!isInMemory ? [TypeOrmModule] : []),
  ],
})
export class RepairModule {}

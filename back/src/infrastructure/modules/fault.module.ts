// src/infrastructure/modules/fault.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fault } from '../../domain/entities/fault.entity';
import { FaultController } from '../../interfaces/controllers/fault.controller';
import { SQLFaultRepository } from '../repositories/sql/sql-fault.repository';
import { InMemoryFaultRepository } from '../repositories/in-memory/in-memory-fault.repository';
import { ReportFaultUseCase } from '../../application/use-cases/report-fault.use-case';
import { UpdateFaultRepairUseCase } from '../../application/use-cases/update-fault-repair.use-case';
import { GetFaultHistoryUseCase } from '../../application/use-cases/get-fault-history.use-case';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Fault])] : []),
  ],
  controllers: [FaultController],
  providers: [
    isInMemory ? InMemoryFaultRepository : SQLFaultRepository,
    {
      provide: 'CustomFaultRepository',
      useClass: isInMemory ? InMemoryFaultRepository : SQLFaultRepository,
    },
    ReportFaultUseCase,
    UpdateFaultRepairUseCase,
    GetFaultHistoryUseCase,
  ],
  exports: ['CustomFaultRepository', ReportFaultUseCase, UpdateFaultRepairUseCase, GetFaultHistoryUseCase],
})
export class FaultModule {}

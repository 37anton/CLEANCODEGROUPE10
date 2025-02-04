// src/infrastructure/modules/maintenance.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { MaintenanceController } from '../../interfaces/controllers/maintenance.controller';
import { SQLMaintenanceRepository } from '../../infrastructure/repositories/sql/sql-maintenance.repository';
import { InMemoryMaintenanceRepository } from '../../infrastructure/repositories/in-memory/in-memory-maintenance.repository';
import { PlanMaintenanceUseCase } from '../../application/use-cases/plan-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from '../../application/use-cases/get-maintenance-history.use-case';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Maintenance])] : []),
  ],
  controllers: [MaintenanceController],
  providers: [
    isInMemory ? InMemoryMaintenanceRepository : SQLMaintenanceRepository,
    {
      provide: 'CustomMaintenanceRepository',
      useClass: isInMemory ? InMemoryMaintenanceRepository : SQLMaintenanceRepository,
    },
    PlanMaintenanceUseCase,
    GetMaintenanceHistoryUseCase,
  ],
  exports: ['CustomMaintenanceRepository', PlanMaintenanceUseCase, GetMaintenanceHistoryUseCase],
})
export class MaintenanceModule {}

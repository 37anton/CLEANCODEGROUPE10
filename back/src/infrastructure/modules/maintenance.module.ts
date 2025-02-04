import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { MaintenanceController } from '../../interfaces/controllers/maintenance.controller';
import { SQLMaintenanceRepository } from '../../infrastructure/repositories/sql/sql-maintenance.repository';
import { InMemoryMaintenanceRepository } from '../../infrastructure/repositories/in-memory/in-memory-maintenance.repository';
import { PlanMaintenanceUseCase } from '../../application/use-cases/plan-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from '../../application/use-cases/get-maintenance-history.use-case';
import { GetDueMaintenanceUseCase } from '../../application/use-cases/get-due-maintenance.use-case';
import { SQLMotorcycleRepository } from '../../infrastructure/repositories/sql/sql-motorcycle.repository';
import { InMemoryMotorcycleRepository } from '../../infrastructure/repositories/in-memory/in-memory-motorcycle.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Maintenance, Motorcycle])] : []),
  ],
  controllers: [MaintenanceController],
  providers: [
    isInMemory ? InMemoryMaintenanceRepository : SQLMaintenanceRepository,
    {
      provide: 'CustomMaintenanceRepository',
      useClass: isInMemory ? InMemoryMaintenanceRepository : SQLMaintenanceRepository,
    },
    isInMemory ? InMemoryMotorcycleRepository : SQLMotorcycleRepository,
    {
      provide: 'CustomMotorcycleRepository',
      useClass: isInMemory ? InMemoryMotorcycleRepository : SQLMotorcycleRepository,
    },
    PlanMaintenanceUseCase,
    GetMaintenanceHistoryUseCase,
    GetDueMaintenanceUseCase,
  ],
  exports: [
    'CustomMaintenanceRepository',
    'CustomMotorcycleRepository',
    PlanMaintenanceUseCase,
    GetMaintenanceHistoryUseCase,
    GetDueMaintenanceUseCase,
  ],
})
export class MaintenanceModule {}

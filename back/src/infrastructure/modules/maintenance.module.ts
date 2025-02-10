import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { SQLMaintenanceRepository } from '../repositories/sql/sql-maintenance.repository';
import { InMemoryMaintenanceRepository } from '../../infrastructure/repositories/in-memory/in-memory-maintenance.repository';
import { CreateMaintenanceUseCase } from '../../application/use-cases/create-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from '../../application/use-cases/get-maintenance-history.use-case';
import { MaintenanceController } from 'src/application/controllers/maintenance.controller';
import { MotorcycleModule } from './motorcycle.module';
import { PartStockModule } from './part-stock.module';
import { MAINTENANCE_REPOSITORY } from '../repositories/maintenance.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
    imports: [
      ...(!isInMemory ? [TypeOrmModule.forFeature([Maintenance])] : []),
        MotorcycleModule,
        PartStockModule, 
      ],
  controllers: [MaintenanceController],
  providers: [
    {
      provide: MAINTENANCE_REPOSITORY,
      useClass: isInMemory ? InMemoryMaintenanceRepository : SQLMaintenanceRepository,
    },
    CreateMaintenanceUseCase,
    GetMaintenanceHistoryUseCase,
  ],
  exports: [
    CreateMaintenanceUseCase,
    GetMaintenanceHistoryUseCase,
    MAINTENANCE_REPOSITORY,
    ...(!isInMemory ? [TypeOrmModule] : []),
  ],
})
export class MaintenanceModule {}

// src/infrastructure/modules/maintenance.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { SQLMaintenanceRepository } from '../repositories/sql/sql-maintenance.repository';
import { InMemoryMaintenanceRepository } from '../../infrastructure/repositories/in-memory/in-memory-maintenance.repository';
import { CreateMaintenanceUseCase } from '../../application/use-cases/create-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from '../../application/use-cases/get-maintenance-history.use-case';
import { MaintenanceController } from 'src/interfaces/controllers/maintenance.controller';
import { MotorcycleModule } from './motorcycle.module';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
    imports: [
        TypeOrmModule.forFeature([Maintenance]),
        MotorcycleModule, // IMPORTANT : importer MotorcycleModule
      ],
  controllers: [MaintenanceController],
  providers: [
    {
      provide: 'CustomMaintenanceRepository',
      useClass: isInMemory ? InMemoryMaintenanceRepository : SQLMaintenanceRepository,
    },
    CreateMaintenanceUseCase,
    GetMaintenanceHistoryUseCase,
  ],
  exports: [
    CreateMaintenanceUseCase,
    GetMaintenanceHistoryUseCase,
    'CustomMaintenanceRepository',
    TypeOrmModule,
  ],
})
export class MaintenanceModule {}

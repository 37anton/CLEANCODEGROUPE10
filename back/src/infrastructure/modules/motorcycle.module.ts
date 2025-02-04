// src/infrastructure/modules/motorcycle.module.ts (exemple)
// ADDED/UPDATED : on importe Interval et on déclare le repository
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { CompanyMotorcycle } from '../../domain/entities/company-motorcycle.entity';
import { ClientMotorcycle } from '../../domain/entities/client-motorcycle.entity';
import { Interval } from '../../domain/entities/interval.entity'; // ADDED
import { MotorcycleController } from '../../interfaces/controllers/motorcycle.controller';
import { SQLMotorcycleRepository } from '../../infrastructure/repositories/sql/sql-motorcycle.repository';
import { InMemoryMotorcycleRepository } from '../../infrastructure/repositories/in-memory/in-memory-motorcycle.repository';
import { CreateMotorcycleUseCase } from '../../application/use-cases/create-motorcycle.use-case';
import { ListMotorcyclesUseCase } from '../../application/use-cases/list-motorcycles.use-case';
import { UpdateMotorcycleUseCase } from '../../application/use-cases/update-motorcycle.use-case'; // ADDED
import { SQLCompanyMotorcycleRepository } from '../../infrastructure/repositories/sql/sql-company-motorcycle.repository';
import { InMemoryCompanyMotorcycleRepository } from '../../infrastructure/repositories/in-memory/in-memory-company-motorcycle.repository';
import { SQLClientMotorcycleRepository } from '../../infrastructure/repositories/sql/sql-client-motorcycle.repository';
import { InMemoryClientMotorcycleRepository } from '../../infrastructure/repositories/in-memory/in-memory-client-motorcycle.repository';
import { SQLIntervalRepository } from '../../infrastructure/repositories/sql/sql-interval.repository'; // ADDED
import { InMemoryIntervalRepository } from '../../infrastructure/repositories/in-memory/in-memory-interval.repository'; // ADDED

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([
      Motorcycle, CompanyMotorcycle, ClientMotorcycle, Interval // ADDED
    ])] : []),
  ],
  controllers: [MotorcycleController],
  providers: [
    // Motorcycle
    isInMemory ? InMemoryMotorcycleRepository : SQLMotorcycleRepository,
    {
      provide: 'CustomMotorcycleRepository',
      useClass: isInMemory ? InMemoryMotorcycleRepository : SQLMotorcycleRepository,
    },
    // CompanyMotorcycle
    isInMemory ? InMemoryCompanyMotorcycleRepository : SQLCompanyMotorcycleRepository,
    {
      provide: 'CustomCompanyMotorcycleRepository',
      useClass: isInMemory ? InMemoryCompanyMotorcycleRepository : SQLCompanyMotorcycleRepository,
    },
    // ClientMotorcycle
    isInMemory ? InMemoryClientMotorcycleRepository : SQLClientMotorcycleRepository,
    {
      provide: 'CustomClientMotorcycleRepository',
      useClass: isInMemory ? InMemoryClientMotorcycleRepository : SQLClientMotorcycleRepository,
    },
    // ADDED: Interval
    isInMemory ? InMemoryIntervalRepository : SQLIntervalRepository,
    {
      provide: 'CustomIntervalRepository',
      useClass: isInMemory ? InMemoryIntervalRepository : SQLIntervalRepository,
    },
    CreateMotorcycleUseCase,
    ListMotorcyclesUseCase,
    UpdateMotorcycleUseCase, // ADDED
  ],
  exports: [
    'CustomMotorcycleRepository',
    'CustomCompanyMotorcycleRepository',
    'CustomClientMotorcycleRepository',
    'CustomIntervalRepository', // ADDED
    CreateMotorcycleUseCase,
    ListMotorcyclesUseCase,
    UpdateMotorcycleUseCase,  // ADDED
  ],
})
export class MotorcycleModule {}

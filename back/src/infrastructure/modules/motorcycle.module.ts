import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorcycle } from 'src/domain/entities/motorcycle.entity';
import { CompanyMotorcycle } from 'src/domain/entities/company-motorcycle.entity';
import { ClientMotorcycle } from 'src/domain/entities/client-motorcycle.entity';
import { CreateMotorcycleUseCase } from 'src/application/use-cases/create-motorcycle.use-case';
import { GetMotorcyclesUseCase } from 'src/application/use-cases/get-motorcycles.use-case';
import { MotorcycleController } from '../../interfaces/controllers/motorcycle.controller';
import { InMemoryMotorcycleRepository } from '../repositories/in-memory/in-memory-motorcycle.repository';
import { SQLMotorcycleRepository } from '../repositories/sql/sql-motorcycle.repository';
import { InMemoryCompanyMotorcycleRepository } from '../repositories/in-memory/in-memory-company-motorcycle.repository';
import { SQLCompanyMotorcycleRepository } from '../repositories/sql/sql-company-motorcycle.repository';
import { InMemoryClientMotorcycleRepository } from '../repositories/in-memory/in-memory-client-motorcycle.repository';
import { SQLClientMotorcycleRepository } from '../repositories/sql/sql-client-motorcycle.repository';
import { UpdateMotorcycleUseCase } from 'src/application/use-cases/update-motorcycle.use-case';
import { DeleteMotorcycleUseCase } from 'src/application/use-cases/delete-motorcycle.use-case';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Motorcycle, CompanyMotorcycle, ClientMotorcycle]),
  ],
  controllers: [MotorcycleController],
  providers: [
    {
      provide: 'CustomMotorcycleRepository',
      useClass: isInMemory ? InMemoryMotorcycleRepository : SQLMotorcycleRepository,
    },
    {
      provide: 'CustomCompanyMotorcycleRepository',
      useClass: isInMemory ? InMemoryCompanyMotorcycleRepository : SQLCompanyMotorcycleRepository,
    },
    {
      provide: 'CustomClientMotorcycleRepository',
      useClass: isInMemory ? InMemoryClientMotorcycleRepository : SQLClientMotorcycleRepository,
    },
    CreateMotorcycleUseCase,
    GetMotorcyclesUseCase,
    UpdateMotorcycleUseCase,
    DeleteMotorcycleUseCase,
  ],
  exports: [CreateMotorcycleUseCase, GetMotorcyclesUseCase, UpdateMotorcycleUseCase, DeleteMotorcycleUseCase],
})
export class MotorcycleModule {}

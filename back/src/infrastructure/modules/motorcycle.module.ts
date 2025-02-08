// src/infrastructure/modules/motorcycle.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorcycle } from 'src/domain/entities/motorcycle.entity';
import { CompanyMotorcycle } from 'src/domain/entities/company-motorcycle.entity';
import { ClientMotorcycle } from 'src/domain/entities/client-motorcycle.entity';
import { Interval } from 'src/domain/entities/interval.entity';

// Import des use cases
import { CreateMotorcycleUseCase } from 'src/application/use-cases/create-motorcycle.use-case';
import { GetMotorcyclesUseCase } from 'src/application/use-cases/get-motorcycles.use-case';
import { UpdateMotorcycleUseCase } from 'src/application/use-cases/update-motorcycle.use-case';
import { DeleteMotorcycleUseCase } from 'src/application/use-cases/delete-motorcycle.use-case';
import { SetMotorcycleIntervalUseCase } from 'src/application/use-cases/set-motorcycle-interval.use-case';
import { GetMaintenancePlanUseCase } from 'src/application/use-cases/get-maintenance-plan.use-case';

// Import du contrôleur
import { MotorcycleController } from 'src/interfaces/controllers/motorcycle.controller';

// Import des repositories
import { InMemoryMotorcycleRepository } from 'src/infrastructure/repositories/in-memory/in-memory-motorcycle.repository';
import { SQLMotorcycleRepository } from 'src/infrastructure/repositories/sql/sql-motorcycle.repository';
import { InMemoryCompanyMotorcycleRepository } from 'src/infrastructure/repositories/in-memory/in-memory-company-motorcycle.repository';
import { SQLCompanyMotorcycleRepository } from 'src/infrastructure/repositories/sql/sql-company-motorcycle.repository';
import { InMemoryClientMotorcycleRepository } from 'src/infrastructure/repositories/in-memory/in-memory-client-motorcycle.repository';
import { SQLClientMotorcycleRepository } from 'src/infrastructure/repositories/sql/sql-client-motorcycle.repository';
import { SQLIntervalRepository } from 'src/infrastructure/repositories/sql/sql-interval.repository';
import { InMemoryIntervalRepository } from 'src/infrastructure/repositories/in-memory/in-memory-interval.repository';

// Import des modules qui exportent d'autres providers
import { IntervalDefinitionModule } from 'src/infrastructure/modules/interval-definition.module';
import { UserModule } from './user.module';
import { NotificationModule } from './notification.module';
import { MOTORCYCLE_REPOSITORY } from '../repositories/motorcycle.repository';
import { COMPANY_MOTORCYCLE_REPOSITORY } from '../repositories/company-motorcycle.repository';
import { CLIENT_MOTORCYCLE_REPOSITORY } from '../repositories/client-motorcycle.repository';
import { INTERVAL_REPOSITORY } from '../repositories/interval.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Motorcycle, CompanyMotorcycle, ClientMotorcycle, Interval])] : []),
    IntervalDefinitionModule,
    UserModule,
    NotificationModule,
  ],
  controllers: [MotorcycleController],
  providers: [
    {
      provide: MOTORCYCLE_REPOSITORY,
      useClass: isInMemory ? InMemoryMotorcycleRepository : SQLMotorcycleRepository,
    },
    {
      provide: COMPANY_MOTORCYCLE_REPOSITORY,
      useClass: isInMemory ? InMemoryCompanyMotorcycleRepository : SQLCompanyMotorcycleRepository,
    },
    {
      provide: CLIENT_MOTORCYCLE_REPOSITORY,
      useClass: isInMemory ? InMemoryClientMotorcycleRepository : SQLClientMotorcycleRepository,
    },
    {
      provide: INTERVAL_REPOSITORY,
      useClass: isInMemory ? InMemoryIntervalRepository : SQLIntervalRepository,
    },
    CreateMotorcycleUseCase,
    GetMotorcyclesUseCase,
    UpdateMotorcycleUseCase,
    DeleteMotorcycleUseCase,
    SetMotorcycleIntervalUseCase,
    GetMaintenancePlanUseCase,
  ],
  exports: [
    CreateMotorcycleUseCase,
    GetMotorcyclesUseCase,
    UpdateMotorcycleUseCase,
    DeleteMotorcycleUseCase,
    GetMaintenancePlanUseCase,  // <-- EXPORT ajouté pour le use case de maintenance
    MOTORCYCLE_REPOSITORY,
    ...(!isInMemory ? [TypeOrmModule] : []),
  ],
})
export class MotorcycleModule {}

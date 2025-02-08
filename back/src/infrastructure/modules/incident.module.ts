import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from '../../domain/entities/incident.entity';
import { SQLIncidentRepository } from '../../infrastructure/repositories/sql/sql-incident.repository';
import { InMemoryIncidentRepository } from '../../infrastructure/repositories/in-memory/in-memory-incident.repository';
import { CreateIncidentUseCase } from '../../application/use-cases/create-incident.use-case';
import { GetIncidentHistoryUseCase } from '../../application/use-cases/get-incident-history.use-case';
import { IncidentController } from 'src/interfaces/controllers/incident.controller';
import { MotorcycleModule } from './motorcycle.module';
import { INCIDENT_REPOSITORY } from '../repositories/incident.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Incident])] : []),
    MotorcycleModule,
  ],
  controllers: [IncidentController],
  providers: [
    {
      provide: INCIDENT_REPOSITORY,
      useClass: isInMemory ? InMemoryIncidentRepository : SQLIncidentRepository,
    },
    CreateIncidentUseCase,
    GetIncidentHistoryUseCase,
  ],
  exports: [
    CreateIncidentUseCase,
    GetIncidentHistoryUseCase,
    INCIDENT_REPOSITORY,
    ...(!isInMemory ? [TypeOrmModule] : []),
  ],
})
export class IncidentModule {}

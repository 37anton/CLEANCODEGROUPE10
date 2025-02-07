import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from '../../domain/entities/incident.entity';
import { SQLIncidentRepository } from '../../infrastructure/repositories/sql/sql-incident.repository';
import { InMemoryIncidentRepository } from '../../infrastructure/repositories/in-memory/in-memory-incident.repository';
import { CreateIncidentUseCase } from '../../application/use-cases/create-incident.use-case';
import { GetIncidentHistoryUseCase } from '../../application/use-cases/get-incident-history.use-case';
import { IncidentController } from 'src/interfaces/controllers/incident.controller';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  controllers: [IncidentController],
  providers: [
    {
      provide: 'CustomIncidentRepository',
      useClass: isInMemory ? InMemoryIncidentRepository : SQLIncidentRepository,
    },
    CreateIncidentUseCase,
    GetIncidentHistoryUseCase,
  ],
  exports: [
    CreateIncidentUseCase,
    GetIncidentHistoryUseCase,
    'CustomIncidentRepository',
    TypeOrmModule,
  ],
})
export class IncidentModule {}

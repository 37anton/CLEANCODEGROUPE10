// src/infrastructure/modules/incident.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from '../../domain/entities/incident.entity';
import { IncidentController } from '../../interfaces/controllers/incident.controller';
import { SQLIncidentRepository } from '../../infrastructure/repositories/sql/sql-incident.repository';
import { InMemoryIncidentRepository } from '../../infrastructure/repositories/in-memory/in-memory-incident.repository';
import { ReportIncidentUseCase } from '../../application/use-cases/report-incident.use-case';
import { GetIncidentHistoryUseCase } from '../../application/use-cases/get-incident-history.use-case';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    ...(!isInMemory ? [TypeOrmModule.forFeature([Incident])] : []),
  ],
  controllers: [IncidentController],
  providers: [
    isInMemory ? InMemoryIncidentRepository : SQLIncidentRepository,
    {
      provide: 'CustomIncidentRepository',
      useClass: isInMemory ? InMemoryIncidentRepository : SQLIncidentRepository,
    },
    ReportIncidentUseCase,
    GetIncidentHistoryUseCase,
  ],
  exports: ['CustomIncidentRepository', ReportIncidentUseCase, GetIncidentHistoryUseCase],
})
export class IncidentModule {}

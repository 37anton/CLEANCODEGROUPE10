// src/application/use-cases/report-incident.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Incident } from '../../domain/entities/incident.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Injectable()
export class ReportIncidentUseCase {
  constructor(
    @Inject('CustomIncidentRepository')
    private readonly incidentRepository: {
      save(incident: Incident): Promise<Incident>;
    },
  ) {}

  async execute(motorcycle: Motorcycle, description: string): Promise<Incident> {
    const incident = new Incident();
    incident.id = crypto.randomUUID();
    incident.incidentDate = new Date();
    incident.description = description;
    incident.motorcycle = motorcycle;
    return await this.incidentRepository.save(incident);
  }
}

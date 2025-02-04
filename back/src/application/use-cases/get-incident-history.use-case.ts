// src/application/use-cases/get-incident-history.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Incident } from '../../domain/entities/incident.entity';

@Injectable()
export class GetIncidentHistoryUseCase {
  constructor(
    @Inject('CustomIncidentRepository')
    private readonly incidentRepository: {
      findByVehicleId(vehicleId: string): Promise<Incident[]>;
    },
  ) {}

  async execute(vehicleId: string): Promise<Incident[]> {
    return await this.incidentRepository.findByVehicleId(vehicleId);
  }
}

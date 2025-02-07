import { Injectable, Inject } from '@nestjs/common';
import { IncidentRepository } from '../../infrastructure/repositories/incident.repository';
import { Incident } from '../../domain/entities/incident.entity';

@Injectable()
export class GetIncidentHistoryUseCase {
  constructor(
    @Inject('CustomIncidentRepository')
    private readonly incidentRepository: IncidentRepository,
  ) {}

  async execute(vehicleId: string): Promise<Incident[]> {
    return this.incidentRepository.findByVehicleId(vehicleId);
  }
}

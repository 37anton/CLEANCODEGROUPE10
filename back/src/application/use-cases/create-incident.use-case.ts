import { Injectable, Inject } from '@nestjs/common';
import { Incident } from '../../domain/entities/incident.entity';
import { INCIDENT_REPOSITORY, IncidentRepository } from '../../infrastructure/repositories/incident.repository';
import * as crypto from 'crypto';
import { MOTORCYCLE_REPOSITORY, MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import { CreateIncidentDto } from '../dto/create-incident.dto';

@Injectable()
export class CreateIncidentUseCase {
  constructor(
    @Inject(INCIDENT_REPOSITORY)
    private readonly incidentRepository: IncidentRepository,
    @Inject(MOTORCYCLE_REPOSITORY)
    private readonly motorcycleRepository: MotorcycleRepository,
  ) {}

  async execute(data: CreateIncidentDto): Promise<Incident> {
    if (!data.motorcycleId) {
      throw new Error('L\'identifiant de la moto est requis.');
    }
    const motorcycle = await this.motorcycleRepository.findById(data.motorcycleId);
    if (!motorcycle) {
      throw new Error(`Moto avec l'ID ${data.motorcycleId} introuvable.`);
    }

    const incident = new Incident();
    incident.id = crypto.randomUUID();
    incident.incidentDate = data.incidentDate ? new Date(data.incidentDate) : new Date();
    incident.description = data.description ?? '';
    incident.motorcycle = motorcycle;
    incident.repairs = [];

    return this.incidentRepository.create(incident);
  }
}

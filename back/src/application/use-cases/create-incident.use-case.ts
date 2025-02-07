import { Injectable, Inject } from '@nestjs/common';
import { Incident } from '../../domain/entities/incident.entity';
import { IncidentRepository } from '../../infrastructure/repositories/incident.repository';
import * as crypto from 'crypto';

@Injectable()
export class CreateIncidentUseCase {
  constructor(
    @Inject('CustomIncidentRepository')
    private readonly incidentRepository: IncidentRepository,
  ) {}

  async execute(data: Partial<Incident>): Promise<Incident> {
    if (!data.motorcycle) {
      throw new Error('La moto associée est requise.');
    }
    const incident = new Incident();
    incident.id = crypto.randomUUID();
    incident.incidentDate = data.incidentDate ? new Date(data.incidentDate) : new Date();
    incident.description = data.description ?? '';
    incident.motorcycle = data.motorcycle;
    // On peut initialiser repairs comme un tableau vide (si nécessaire)
    incident.repairs = [];
    return this.incidentRepository.create(incident);
  }
}

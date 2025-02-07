import { Injectable } from '@nestjs/common';
import { Incident } from '../../../domain/entities/incident.entity';
import { IncidentRepository } from '../incident.repository';

@Injectable()
export class InMemoryIncidentRepository implements IncidentRepository {
  private incidents: Incident[] = [];

  async create(incident: Incident): Promise<Incident> {
    this.incidents.push(incident);
    return incident;
  }

  async findByVehicleId(vehicleId: string): Promise<Incident[]> {
    // On filtre les incidents dont l'incident.motorcycle.id correspond à vehicleId
    return this.incidents
      .filter(i => i.motorcycle && i.motorcycle.id === vehicleId)
      .sort((a, b) => new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime());
  }
}

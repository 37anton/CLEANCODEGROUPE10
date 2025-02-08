import { Incident } from '../../domain/entities/incident.entity';

export const INCIDENT_REPOSITORY = 'INCIDENT_REPOSITORY';

export interface IncidentRepository {
  create(incident: Incident): Promise<Incident>;
  findByVehicleId(vehicleId: string): Promise<Incident[]>;
}

import { Incident } from '../../domain/entities/incident.entity';

export interface IncidentRepository {
  create(incident: Incident): Promise<Incident>;
  findByVehicleId(vehicleId: string): Promise<Incident[]>;
}

import { Repair } from '../../domain/entities/repair.entity';

export interface RepairRepository {
  create(repair: Repair): Promise<Repair>;
  findByIncidentId(incidentId: string): Promise<Repair[]>;
}

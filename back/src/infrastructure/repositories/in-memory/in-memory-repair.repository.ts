import { Injectable } from '@nestjs/common';
import { Repair } from '../../../domain/entities/repair.entity';
import { RepairRepository } from '../repair.repository';

@Injectable()
export class InMemoryRepairRepository implements RepairRepository {
  private repairs: Repair[] = [];

  async create(repair: Repair): Promise<Repair> {
    this.repairs.push(repair);
    return repair;
  }

  async findByIncidentId(incidentId: string): Promise<Repair[]> {
    return this.repairs
      .filter(r => r.incident && r.incident.id === incidentId)
      .sort((a, b) => new Date(b.repairDate).getTime() - new Date(a.repairDate).getTime());
  }
}

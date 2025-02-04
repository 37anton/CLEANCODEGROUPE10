// src/application/use-cases/update-repair.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Repair } from '../../domain/entities/repair.entity';

@Injectable()
export class UpdateRepairUseCase {
  constructor(
    @Inject('CustomIncidentRepository')
    private readonly incidentRepository: {
      findRepairById(id: string): Promise<Repair>;
      updateRepair(repair: Repair): Promise<Repair>;
    },
  ) {}

  async execute(id: string, updateData: Partial<Repair>): Promise<Repair> {
    const repair = await this.incidentRepository.findRepairById(id);
    if (!repair) {
      throw new Error('Repair not found');
    }
    if (updateData.repairDate) {
      repair.repairDate = updateData.repairDate;
    }
    if (updateData.description) {
      repair.description = updateData.description;
    }
    return await this.incidentRepository.updateRepair(repair);
  }
}

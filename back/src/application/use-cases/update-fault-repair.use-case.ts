// src/application/use-cases/update-fault-repair.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Fault, FaultStatus } from '../../domain/entities/fault.entity';

@Injectable()
export class UpdateFaultRepairUseCase {
  constructor(
    @Inject('CustomFaultRepository')
    private readonly faultRepository: {
      findById(id: string): Promise<Fault>;
      save(fault: Fault): Promise<Fault>;
    },
  ) {}

  async execute(id: string, updateData: Partial<Fault>): Promise<Fault> {
    const fault = await this.faultRepository.findById(id);
    if (!fault) {
      throw new Error('Fault not found');
    }

    if (updateData.repairDate) {
      fault.repairDate = updateData.repairDate;
    }
    if (updateData.repairCost !== undefined) {
      fault.repairCost = updateData.repairCost;
    }
    if (updateData.correctiveActions) {
      fault.correctiveActions = updateData.correctiveActions;
    }
    if (updateData.status) {
      fault.status = updateData.status;
    } else {
      fault.status = FaultStatus.REPAIRED;
    }

    return await this.faultRepository.save(fault);
  }
}

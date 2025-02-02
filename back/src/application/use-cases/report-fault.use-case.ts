// src/application/use-cases/report-fault.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Fault, FaultStatus, FaultType } from '../../domain/entities/fault.entity';

@Injectable()
export class ReportFaultUseCase {
  constructor(
    @Inject('CustomFaultRepository')
    private readonly faultRepository: {
      save(fault: Fault): Promise<Fault>;
    },
  ) {}

  async execute(faultData: Partial<Fault>): Promise<Fault> {
    if (!faultData.vehicleId || !faultData.description || !faultData.type) {
      throw new Error('Missing required fields: vehicleId, description, type');
    }

    const fault = new Fault();
    fault.id = crypto.randomUUID();
    fault.vehicleId = faultData.vehicleId;
    fault.reportedDate = new Date();
    fault.description = faultData.description;
    fault.type = faultData.type as FaultType;
    fault.status = FaultStatus.REPORTED;
    // On assigne directement, de sorte qu'en cas d'absence la propriété reste undefined
    fault.repairDate = faultData.repairDate;
    fault.repairCost = faultData.repairCost;
    fault.correctiveActions = faultData.correctiveActions;
    fault.warrantyDetails = faultData.warrantyDetails;

    return await this.faultRepository.save(fault);
  }
}

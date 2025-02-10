import { Injectable, Inject } from '@nestjs/common';
import { Repair } from '../../domain/entities/repair.entity';
import { RepairRepository, REPAIR_REPOSITORY } from '../../infrastructure/repositories/repair.repository';

@Injectable()
export class GetRepairHistoryUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY)
    private readonly repairRepository: RepairRepository,
  ) {}

  async execute(vehicleId: string): Promise<Repair[]> {
    return this.repairRepository.findByVehicleId(vehicleId);
  }
}

// src/application/use-cases/get-fault-history.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Fault } from '../../domain/entities/fault.entity';

@Injectable()
export class GetFaultHistoryUseCase {
  constructor(
    @Inject('CustomFaultRepository')
    private readonly faultRepository: {
      findByVehicleId(vehicleId: string): Promise<Fault[]>;
    },
  ) {}

  async execute(vehicleId: string): Promise<Fault[]> {
    return await this.faultRepository.findByVehicleId(vehicleId);
  }
}

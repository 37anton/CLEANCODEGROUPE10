// src/application/use-cases/get-warranty-history.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Warranty } from '../../domain/entities/warranty.entity';

@Injectable()
export class GetWarrantyHistoryUseCase {
  constructor(
    @Inject('CustomWarrantyRepository')
    private readonly warrantyRepository: {
      findByVehicleId(vehicleId: string): Promise<Warranty[]>;
    },
  ) {}

  async execute(vehicleId: string): Promise<Warranty[]> {
    return await this.warrantyRepository.findByVehicleId(vehicleId);
  }
}

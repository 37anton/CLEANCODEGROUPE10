import { Injectable, Inject } from '@nestjs/common';
import { WarrantyRepository } from '../../infrastructure/repositories/warranty.repository';
import { Warranty } from '../../domain/entities/warranty.entity';

@Injectable()
export class GetWarrantyHistoryUseCase {
  constructor(
    @Inject('CustomWarrantyRepository')
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  async execute(motorcycleId: string): Promise<Warranty[]> {
    return this.warrantyRepository.findByMotorcycleId(motorcycleId);
  }
}

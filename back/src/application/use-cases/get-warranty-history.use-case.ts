import { Injectable, Inject } from '@nestjs/common';
import { WARRANTY_REPOSITORY, WarrantyRepository } from '../../infrastructure/repositories/warranty.repository';
import { Warranty } from '../../domain/entities/warranty.entity';

@Injectable()
export class GetWarrantyHistoryUseCase {
  constructor(
    @Inject(WARRANTY_REPOSITORY)
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  async execute(motorcycleId: string): Promise<Warranty[]> {
    return this.warrantyRepository.findByMotorcycleId(motorcycleId);
  }
}

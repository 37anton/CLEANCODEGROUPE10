import { Injectable, Inject } from '@nestjs/common';
import { PartSupplier } from '../../domain/entities/part-supplier.entity';
import { PART_SUPPLIER_REPOSITORY, PartSupplierRepository } from '../../infrastructure/repositories/part-supplier.repository';

@Injectable()
export class CreatePartSupplierUseCase {
  constructor(
    @Inject(PART_SUPPLIER_REPOSITORY)
    private readonly partSupplierRepository: PartSupplierRepository,
  ) {}

  async execute(data: { supplierId: string; partId: string; price: number }): Promise<PartSupplier> {
    return await this.partSupplierRepository.createPartSupplier(data);
  }
}

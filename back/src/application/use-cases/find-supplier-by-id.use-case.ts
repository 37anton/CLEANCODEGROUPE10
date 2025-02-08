import { Injectable, NotFoundException, Inject  } from '@nestjs/common';
import { SupplierRepository, SUPPLIER_REPOSITORY } from '../../infrastructure/repositories/supplier.repository';

@Injectable()
export class FindSupplierByIdUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: SupplierRepository
  ) {}

  async execute(id: string) {
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      throw new NotFoundException(`Fournisseur avec l'ID ${id} non trouvé.`);
    }
    return supplier;
  }
}
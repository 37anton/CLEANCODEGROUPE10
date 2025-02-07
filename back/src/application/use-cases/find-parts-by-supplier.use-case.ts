import { Injectable, Inject } from "@nestjs/common";
import { PartSupplierRepository, PART_SUPPLIER_REPOSITORY } from "../../infrastructure/repositories/part-supplier.repository";

@Injectable()
export class FindPartsBySupplierUseCase {
  constructor(
    @Inject(PART_SUPPLIER_REPOSITORY) private readonly partSupplierRepository: PartSupplierRepository,
  ) {}

  async execute(supplierId: string) {
    return await this.partSupplierRepository.findBySupplier(supplierId);
  }
}
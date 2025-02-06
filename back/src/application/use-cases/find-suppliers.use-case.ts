import { Injectable, Inject } from "@nestjs/common";
import { SupplierRepository, SUPPLIER_REPOSITORY } from "../../infrastructure/repositories/supplier.repository";

@Injectable()
export class FindSuppliersUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY) private readonly supplierRepository: SupplierRepository,
  ) {}

  async execute() {
    return await this.supplierRepository.findAll();
  }
}
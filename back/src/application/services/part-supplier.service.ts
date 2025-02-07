import { Injectable } from "@nestjs/common";
import { FindPartsBySupplierUseCase } from "../use-cases/find-parts-by-supplier.use-case";

@Injectable()
export class PartSupplierService {
  constructor(
    private readonly findPartsBySupplierUseCase: FindPartsBySupplierUseCase,
  ) {}

  async findBySupplier(supplierId: string) {
    return await this.findPartsBySupplierUseCase.execute(supplierId);
  }
}
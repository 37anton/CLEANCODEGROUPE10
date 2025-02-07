import { Injectable, NotFoundException } from "@nestjs/common";
import { FindSuppliersUseCase } from "../use-cases/find-suppliers.use-case";
import { FindSupplierByIdUseCase } from "../use-cases/find-supplier-by-id.use-case";

@Injectable()
export class SupplierService {
  constructor(
    private readonly findSuppliersUseCase: FindSuppliersUseCase,
    private readonly findSupplierByIdUseCase: FindSupplierByIdUseCase
  ) {}

  async findAll() {
    return await this.findSuppliersUseCase.execute();
  }

  async findById(id: string) {
    return await this.findSupplierByIdUseCase.execute(id);
  }
}
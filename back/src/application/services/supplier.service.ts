import { Injectable, NotFoundException } from "@nestjs/common";
import { FindSuppliersUseCase } from "../use-cases/find-suppliers.use-case";
import { FindSupplierByIdUseCase } from "../use-cases/find-supplier-by-id.use-case";
import { CreateSupplierUseCase } from "../use-cases/create-supplier.use-case";
import { Supplier } from "src/domain/entities/supplier.entity";

@Injectable()
export class SupplierService {
  constructor(
    private readonly findSuppliersUseCase: FindSuppliersUseCase,
    private readonly findSupplierByIdUseCase: FindSupplierByIdUseCase,
    private readonly createSupplierUseCase: CreateSupplierUseCase
  ) {}

  async findAll() {
    return await this.findSuppliersUseCase.execute();
  }

  async findById(id: string) {
    return await this.findSupplierByIdUseCase.execute(id);
  }

  async createSupplier(supplierData: { name: string; phone: string; deliveryTime: number; city: string }): Promise<Supplier> {
    return await this.createSupplierUseCase.execute(supplierData);
  }
}
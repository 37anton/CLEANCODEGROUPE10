import { Injectable } from "@nestjs/common";
import { FindPartsBySupplierUseCase } from "../use-cases/find-parts-by-supplier.use-case";
import { CreatePartSupplierUseCase } from '../use-cases/create-part-supplier.use-case';
import { PartSupplier } from "src/domain/entities/part-supplier.entity";

@Injectable()
export class PartSupplierService {
  constructor(
    private readonly findPartsBySupplierUseCase: FindPartsBySupplierUseCase,
    private readonly createPartSupplierUseCase: CreatePartSupplierUseCase,
  ) {}

  async findBySupplier(supplierId: string) {
    return await this.findPartsBySupplierUseCase.execute(supplierId);
  }

  async createPartSupplier(data: { supplierId: string; partId: string; price: number }): Promise<PartSupplier> {
    return await this.createPartSupplierUseCase.execute(data);
  }
}
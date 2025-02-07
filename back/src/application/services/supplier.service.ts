import { Injectable } from "@nestjs/common";
import { FindSuppliersUseCase } from "../use-cases/find-suppliers.use-case";

@Injectable()
export class SupplierService {
  constructor(
    private readonly findSuppliersUseCase: FindSuppliersUseCase,
  ) {}

  async findAll() {
    return await this.findSuppliersUseCase.execute();
  }
}
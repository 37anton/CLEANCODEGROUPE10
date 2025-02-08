import { Controller, Get, Param } from "@nestjs/common";
import { SupplierService } from "../../application/services/supplier.service";
import { Supplier } from "../../domain/entities/supplier.entity";

@Controller("suppliers")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async findAll(): Promise<Supplier[]> {
    return this.supplierService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.supplierService.findById(id);
  }
}
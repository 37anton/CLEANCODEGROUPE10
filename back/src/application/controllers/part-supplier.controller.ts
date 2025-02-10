import { Controller, Get, Param } from "@nestjs/common";
import { PartSupplierService } from "../services/part-supplier.service";
import { PartSupplier } from "../../domain/entities/part-supplier.entity";

@Controller("part-suppliers")
export class PartSupplierController {
  constructor(private readonly partSupplierService: PartSupplierService) {}

  @Get(":supplierId")
  async findBySupplier(@Param("supplierId") supplierId: string): Promise<PartSupplier[]> {
    return this.partSupplierService.findBySupplier(supplierId);
  }
}
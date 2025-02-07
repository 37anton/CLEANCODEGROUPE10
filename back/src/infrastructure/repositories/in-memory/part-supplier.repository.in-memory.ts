import { Injectable } from "@nestjs/common";
import { PartSupplier } from "../../../domain/entities/part-supplier.entity";
import { PartSupplierRepository } from "../part-supplier.repository";

@Injectable()
export class PartSupplierInMemoryRepository implements PartSupplierRepository {
  private partSuppliers: PartSupplier[] = [];

  async findBySupplier(supplierId: string): Promise<PartSupplier[]> {
    return this.partSuppliers.filter(ps => ps.supplier.id === supplierId);
  }
}
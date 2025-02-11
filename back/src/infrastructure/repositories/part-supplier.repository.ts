import { PartSupplier } from "src/domain/entities/part-supplier.entity";

export const PART_SUPPLIER_REPOSITORY = 'PART_SUPPLIER_REPOSITORY';

export interface PartSupplierRepository {
  findBySupplier(supplierId: string): Promise<any>;
  findById(partSupplierId: string): Promise<any>;
  createPartSupplier(data: { supplierId: string; partId: string; price: number }): Promise<PartSupplier>;
}
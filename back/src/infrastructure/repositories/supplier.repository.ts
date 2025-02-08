import { Supplier } from "src/domain/entities/supplier.entity";

export const SUPPLIER_REPOSITORY = 'SUPPLIER_REPOSITORY';

export interface SupplierRepository {
  findAll(): Promise<any>;
  findById(id: string): Promise<any>;
  createSupplier(supplier: Supplier): Promise<Supplier>;
}

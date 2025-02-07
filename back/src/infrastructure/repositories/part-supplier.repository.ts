export const PART_SUPPLIER_REPOSITORY = 'PART_SUPPLIER_REPOSITORY';

export interface PartSupplierRepository {
  findBySupplier(supplierId: string): Promise<any>;
  findById(partSupplierId: string): Promise<any>;
}
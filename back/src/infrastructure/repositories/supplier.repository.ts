export const SUPPLIER_REPOSITORY = 'SUPPLIER_REPOSITORY';

export interface SupplierRepository {
  findAll(): Promise<any>;
}

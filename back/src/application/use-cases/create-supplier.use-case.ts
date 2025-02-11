import { Injectable, Inject } from '@nestjs/common';
import { Supplier } from '../../domain/entities/supplier.entity';
import { SupplierRepository, SUPPLIER_REPOSITORY } from '../../infrastructure/repositories/supplier.repository';

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async execute(supplierData: { name: string; phone: string; deliveryTime: number; city: string }): Promise<Supplier> {
    const supplier = new Supplier();
    supplier.name = supplierData.name;
    supplier.phone = supplierData.phone;
    supplier.deliveryTime = supplierData.deliveryTime;
    supplier.city = supplierData.city;
    return await this.supplierRepository.createSupplier(supplier);
  }
}

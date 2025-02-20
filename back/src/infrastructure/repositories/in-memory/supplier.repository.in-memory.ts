import { Injectable } from "@nestjs/common";
import { Supplier } from "../../../domain/entities/supplier.entity";
import { SupplierRepository } from "../supplier.repository";

@Injectable()
export class SupplierInMemoryRepository implements SupplierRepository {
  private suppliers: Supplier[] = [];

  async findAll(): Promise<Supplier[]> {
    return this.suppliers;
  }

  async findById(id: string): Promise<Supplier | null> {
    return this.suppliers.find(supplier => supplier.id === id) || null;
  }

  async createSupplier(supplier: Supplier): Promise<Supplier> {
    supplier.id = Math.random().toString(36).substring(7);
    this.suppliers.push(supplier);
    return supplier;
  }

  findByIdSync(id: string): Supplier | null {
    return this.suppliers.find(supplier => supplier.id === id) || null;
  }
}
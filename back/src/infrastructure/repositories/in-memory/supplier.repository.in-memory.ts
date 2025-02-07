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
}
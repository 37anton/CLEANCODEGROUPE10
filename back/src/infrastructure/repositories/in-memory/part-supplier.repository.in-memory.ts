import { Injectable } from "@nestjs/common";
import { PartSupplier } from "../../../domain/entities/part-supplier.entity";
import { PartSupplierRepository } from "../part-supplier.repository";

@Injectable()
export class PartSupplierInMemoryRepository implements PartSupplierRepository {
  private partSuppliers: PartSupplier[] = [];

  async findBySupplier(supplierId: string): Promise<PartSupplier[]> {
    return this.partSuppliers.filter(ps => ps.supplier.id === supplierId);
  }

  async findById(partSupplierId: string): Promise<PartSupplier | null> {
    console.log('Contenu de partSuppliers:', this.partSuppliers);
    console.log('Part supplier id recherché : ', partSupplierId);
    return this.partSuppliers.find(p => p.id === partSupplierId) || null;
  }

  async createPartSupplier(data: { supplierId: string; partId: string; price: number }): Promise<PartSupplier> {
    const partSupplier = new PartSupplier();
    partSupplier.id = Math.random().toString(36).substring(7);
    partSupplier.price = data.price;
    partSupplier.supplier = { id: data.supplierId } as any;
    partSupplier.part = { id: data.partId } as any;
    this.partSuppliers.push(partSupplier);
    console.log('id du part supplier créé : ', partSupplier.id);
    return partSupplier;
  }

  findByIdSync(id: string): PartSupplier | null {
    return this.partSuppliers.find(ps => ps.id === id) || null;
  }
  
}
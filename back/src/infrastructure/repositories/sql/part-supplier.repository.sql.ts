import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PartSupplier } from "../../../domain/entities/part-supplier.entity";
import { Injectable } from "@nestjs/common";
import { PartSupplierRepository } from "../part-supplier.repository";

@Injectable()
export class PartSupplierSqlRepository implements PartSupplierRepository {
  constructor(
    @InjectRepository(PartSupplier)
    private readonly partSupplierRepository: Repository<PartSupplier>,
  ) {}

  async findBySupplier(supplierId: string): Promise<PartSupplier[]> {
    return await this.partSupplierRepository.find({
      where: { supplier: { id: supplierId } },
      relations: ["part", "supplier"],
    });
  }

  async findById(partSupplierId: string): Promise<PartSupplier | null> {
    return this.partSupplierRepository.findOne({
      where: { id: partSupplierId },
      relations: ["part", "supplier"]
    });
  }

  async createPartSupplier(data: { supplierId: string; partId: string; price: number }): Promise<PartSupplier> {
    const partSupplier = this.partSupplierRepository.create({
      price: data.price,
      supplier: { id: data.supplierId } as any,
      part: { id: data.partId } as any,
    });
    return await this.partSupplierRepository.save(partSupplier);
  }
}
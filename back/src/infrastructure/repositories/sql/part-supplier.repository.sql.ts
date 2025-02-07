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
}
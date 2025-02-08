import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Supplier } from "../../../domain/entities/supplier.entity";
import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "../supplier.repository";

@Injectable()
export class SupplierSqlRepository implements SupplierRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return await this.supplierRepository.find();
  }

  async findById(id: string): Promise<Supplier | null> {
    return await this.supplierRepository.findOne({ where: { id } });
  }

  async createSupplier(supplier: Supplier): Promise<Supplier> {
    return await this.supplierRepository.save(supplier);
  }

}
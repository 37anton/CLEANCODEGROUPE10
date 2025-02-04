// src/infrastructure/repositories/sql-warranty.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Warranty } from '../../../domain/entities/warranty.entity';

@Injectable()
export class SQLWarrantyRepository {
  constructor(
    @InjectRepository(Warranty)
    private readonly warrantyRepository: Repository<Warranty>,
  ) {}

  async save(warranty: Warranty): Promise<Warranty> {
    return this.warrantyRepository.save(warranty);
  }

  async findByVehicleId(vehicleId: string): Promise<Warranty[]> {
    return this.warrantyRepository.find({ where: { motorcycle: { id: vehicleId } } });
  }
}

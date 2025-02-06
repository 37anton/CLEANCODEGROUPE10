// src/infrastructure/repositories/sql/sql-warranty.repository.ts
import { Injectable } from '@nestjs/common';
import { Warranty } from '../../../domain/entities/warranty.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WarrantyRepository } from '../warranty.repository';

@Injectable()
export class SQLWarrantyRepository implements WarrantyRepository {
  constructor(
    @InjectRepository(Warranty)
    private readonly ormRepository: Repository<Warranty>,
  ) {}

  async create(warranty: Warranty): Promise<Warranty> {
    return this.ormRepository.save(warranty);
  }

  async findByMotorcycleId(motorcycleId: string): Promise<Warranty[]> {
    return this.ormRepository.find({
      where: { motorcycle: { id: motorcycleId } },
      relations: ['warrantyParts'],
      order: { startDate: 'DESC' },
    });
  }
}

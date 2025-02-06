// src/application/use-cases/create-warranty.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Warranty } from '../../domain/entities/warranty.entity';
import { WarrantyRepository } from '../../infrastructure/repositories/warranty.repository';
import * as crypto from 'crypto';

@Injectable()
export class CreateWarrantyUseCase {
  constructor(
    @Inject('CustomWarrantyRepository')
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  async execute(data: Partial<Warranty>): Promise<Warranty> {
    if (!data.motorcycle) {
      throw new Error('La moto associée est requise pour la garantie.');
    }
    const warranty = new Warranty();
    warranty.id = crypto.randomUUID();
    warranty.startDate = data.startDate ? new Date(data.startDate) : new Date();
    warranty.endDate = data.endDate ? new Date(data.endDate) : new Date();
    warranty.motorcycle = data.motorcycle;
    warranty.warrantyParts = data.warrantyParts || [];
    return this.warrantyRepository.create(warranty);
  }
}

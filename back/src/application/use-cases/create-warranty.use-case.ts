import { Injectable, Inject } from '@nestjs/common';
import { Warranty } from '../../domain/entities/warranty.entity';
import { WarrantyRepository } from '../../infrastructure/repositories/warranty.repository';
import { MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import * as crypto from 'crypto';
import { CreateWarrantyDto } from '../dto/create-warranty.dto';

@Injectable()
export class CreateWarrantyUseCase {
  constructor(
    @Inject('CustomWarrantyRepository')
    private readonly warrantyRepository: WarrantyRepository,
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: MotorcycleRepository,
  ) {}

  async execute(data: CreateWarrantyDto): Promise<Warranty> {
    if (!data.motorcycleId) {
      throw new Error('L\'identifiant de la moto est requis pour la garantie.');
    }
    const motorcycle = await this.motorcycleRepository.findById(data.motorcycleId);
    if (!motorcycle) {
      throw new Error(`Moto avec l'ID ${data.motorcycleId} introuvable.`);
    }

    const warranty = new Warranty();
    warranty.id = crypto.randomUUID();
    warranty.startDate = data.startDate ? new Date(data.startDate) : new Date();
    warranty.endDate = data.endDate ? new Date(data.endDate) : new Date();
    warranty.motorcycle = motorcycle;
    warranty.warrantyParts = data.warrantyParts || [];
    return this.warrantyRepository.create(warranty);
  }
}

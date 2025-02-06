import { Injectable, Inject } from '@nestjs/common';
import { Repair } from '../../domain/entities/repair.entity';
import { RepairRepository } from '../../infrastructure/repositories/repair.repository';
import * as crypto from 'crypto';

@Injectable()
export class CreateRepairUseCase {
  constructor(
    @Inject('CustomRepairRepository')
    private readonly repairRepository: RepairRepository,
  ) {}

  async execute(data: Partial<Repair>): Promise<Repair> {
    if (!data.incident) {
      throw new Error("L'incident associé est requis.");
    
    }
    const repair = new Repair();
    repair.id = crypto.randomUUID();
    repair.repairDate = data.repairDate ? new Date(data.repairDate) : new Date();
    repair.description = data.description ?? '';
    repair.incident = data.incident;
    // On suppose que repairParts sera géré séparément
    repair.repairParts = [];
    return this.repairRepository.create(repair);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Repair } from '../../domain/entities/repair.entity';
import { REPAIR_REPOSITORY, RepairRepository } from '../../infrastructure/repositories/repair.repository';
import * as crypto from 'crypto';

@Injectable()
export class CreateRepairUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY)
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
    repair.repairParts = [];
    return this.repairRepository.create(repair);
  }
}

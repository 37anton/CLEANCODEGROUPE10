import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repair } from '../../../domain/entities/repair.entity';
import { RepairRepository } from '../repair.repository';

@Injectable()
export class SQLRepairRepository implements RepairRepository {
  constructor(
    @InjectRepository(Repair)
    private readonly ormRepository: Repository<Repair>,
  ) {}

  async create(repair: Repair): Promise<Repair> {
    return this.ormRepository.save(repair);
  }

  async findByIncidentId(incidentId: string): Promise<Repair[]> {
    return this.ormRepository.find({
      where: { incident: { id: incidentId } },
      relations: ['repairParts'],
      order: { repairDate: 'DESC' },
    });
  }
}

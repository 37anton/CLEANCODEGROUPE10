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
      relations: ['incident', 'repairParts', 'repairParts.partStock', 'repairParts.partStock.part'],
      order: { repairDate: 'DESC' },
    });
  }

  async findByVehicleId(vehicleId: string): Promise<Repair[]> {
    const repairs = await this.ormRepository.createQueryBuilder('repair')
      .leftJoinAndSelect('repair.incident', 'incident')
      .leftJoinAndSelect('repair.repairParts', 'repairParts')
      .leftJoinAndSelect('repairParts.partStock', 'partStock')
      .leftJoinAndSelect('partStock.part', 'part')
      .where('incident.motorcycleId = :vehicleId', { vehicleId })
      .orderBy('repair.repairDate', 'DESC')
      .getMany();
    console.log('Repairs récupérées:', repairs);
    return repairs;
  }
  
}

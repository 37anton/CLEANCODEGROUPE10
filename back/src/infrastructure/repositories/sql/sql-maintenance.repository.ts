import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from '../../../domain/entities/maintenance.entity';
import { MaintenanceRepository } from '../maintenance.repository';

@Injectable()
export class SQLMaintenanceRepository implements MaintenanceRepository {
  constructor(
    @InjectRepository(Maintenance)
    private readonly ormRepository: Repository<Maintenance>,
  ) {}

  async create(maintenance: Maintenance): Promise<Maintenance> {
    return this.ormRepository.save(maintenance);
  }

  async findByVehicleId(vehicleId: string): Promise<Maintenance[]> {
    return this.ormRepository.find({
      where: { vehicleId },
      relations: [
        'maintenanceParts', 
        'maintenanceParts.partStock', 
        'maintenanceParts.partStock.part'
      ],
      order: { scheduledDate: 'DESC' },
    });
  }
}

// src/infrastructure/repositories/sql-maintenance.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from '../../domain/entities/maintenance.entity';

@Injectable()
export class SQLMaintenanceRepository {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}

  async save(maintenance: Maintenance): Promise<Maintenance> {
    return this.maintenanceRepository.save(maintenance);
  }

  async findByVehicleId(vehicleId: string): Promise<Maintenance[]> {
    return this.maintenanceRepository.find({ where: { vehicleId } });
  }
}

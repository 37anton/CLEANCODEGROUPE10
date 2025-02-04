// src/infrastructure/repositories/sql-incident.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from '../../../domain/entities/incident.entity';

@Injectable()
export class SQLIncidentRepository {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
  ) {}

  async save(incident: Incident): Promise<Incident> {
    return this.incidentRepository.save(incident);
  }

  async findByVehicleId(vehicleId: string): Promise<Incident[]> {
    return this.incidentRepository.find({ where: { motorcycle: { id: vehicleId } } });
  }

  async findRepairById(id: string): Promise<any> {
    // Implémentation simplifiée – adapter selon vos besoins
    return null;
  }

  async updateRepair(repair: any): Promise<any> {
    return repair;
  }
}

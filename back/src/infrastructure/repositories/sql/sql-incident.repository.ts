import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from '../../../domain/entities/incident.entity';
import { IncidentRepository } from '../incident.repository';

@Injectable()
export class SQLIncidentRepository implements IncidentRepository {
  constructor(
    @InjectRepository(Incident)
    private readonly ormRepository: Repository<Incident>,
  ) {}

  async create(incident: Incident): Promise<Incident> {
    return this.ormRepository.save(incident);
  }

  async findByVehicleId(vehicleId: string): Promise<Incident[]> {
    return this.ormRepository.find({
      where: { motorcycle: { id: vehicleId } }, 
      relations: ['repairs'], 
      order: { incidentDate: 'DESC' },
    });
  }
}

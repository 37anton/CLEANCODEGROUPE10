// src/infrastructure/repositories/sql-fault.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fault } from '../../../domain/entities/fault.entity';

@Injectable()
export class SQLFaultRepository {
  constructor(
    @InjectRepository(Fault)
    private readonly faultRepository: Repository<Fault>,
  ) {}

  async save(fault: Fault): Promise<Fault> {
    return this.faultRepository.save(fault);
  }

  async findByVehicleId(vehicleId: string): Promise<Fault[]> {
    return this.faultRepository.find({ where: { vehicleId } });
  }

  async findById(id: string): Promise<Fault> {
    const fault = await this.faultRepository.findOne({ where: { id } });
    if (!fault) {
      throw new Error('Fault not found');
    }
    return fault;
  }
}

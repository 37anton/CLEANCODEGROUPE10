// src/infrastructure/repositories/in-memory-fault.repository.ts
import { Injectable } from '@nestjs/common';
import { Fault } from '../../../domain/entities/fault.entity';

@Injectable()
export class InMemoryFaultRepository {
  private faults: Fault[] = [];

  async save(fault: Fault): Promise<Fault> {
    const index = this.faults.findIndex(f => f.id === fault.id);
    if (index > -1) {
      this.faults[index] = fault;
    } else {
      this.faults.push(fault);
    }
    return fault;
  }

  async findByVehicleId(vehicleId: string): Promise<Fault[]> {
    return this.faults.filter(f => f.vehicleId === vehicleId);
  }

  async findById(id: string): Promise<Fault> {
    const fault = this.faults.find(f => f.id === id);
    if (!fault) {
      throw new Error('Fault not found');
    }
    return fault;
  }
}

// src/infrastructure/repositories/in-memory-warranty.repository.ts
import { Injectable } from '@nestjs/common';
import { Warranty } from '../../../domain/entities/warranty.entity';

@Injectable()
export class InMemoryWarrantyRepository {
  private warranties: Warranty[] = [];

  async save(warranty: Warranty): Promise<Warranty> {
    this.warranties.push(warranty);
    return warranty;
  }

  async findByVehicleId(vehicleId: string): Promise<Warranty[]> {
    return this.warranties.filter(w => w.motorcycle.id === vehicleId);
  }
}

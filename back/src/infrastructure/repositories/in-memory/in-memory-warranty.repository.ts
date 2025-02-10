import { Injectable } from '@nestjs/common';
import { Warranty } from '../../../domain/entities/warranty.entity';
import { WarrantyRepository } from '../warranty.repository';

@Injectable()
export class InMemoryWarrantyRepository implements WarrantyRepository {
  private warranties: Warranty[] = [];

  async create(warranty: Warranty): Promise<Warranty> {
    this.warranties.push(warranty);
    return warranty;
  }

  async findByMotorcycleId(motorcycleId: string): Promise<Warranty[]> {
    return this.warranties
      .filter(w => w.motorcycle && w.motorcycle.id === motorcycleId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }
}

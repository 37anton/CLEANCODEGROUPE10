import { Injectable } from '@nestjs/common';
import { CompanyMotorcycle } from '../../../domain/entities/company-motorcycle.entity';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class InMemoryCompanyMotorcycleRepository {
  private companyMotorcycles: CompanyMotorcycle[] = [];

  async create(cm: CompanyMotorcycle): Promise<CompanyMotorcycle> {
    this.companyMotorcycles.push(cm);
    return cm;
  }

  async findAllByCompanyId(companyId: string): Promise<Motorcycle[]> {
    const records = this.companyMotorcycles.filter(cm => cm.company.id === companyId);
    return records.map(cm => cm.motorcycle);
  }
}

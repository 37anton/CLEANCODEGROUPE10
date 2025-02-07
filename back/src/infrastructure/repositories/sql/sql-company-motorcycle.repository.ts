import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyMotorcycle } from '../../../domain/entities/company-motorcycle.entity';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class SQLCompanyMotorcycleRepository {
  constructor(
    @InjectRepository(CompanyMotorcycle)
    private readonly repository: Repository<CompanyMotorcycle>,
  ) {}

  async create(cm: CompanyMotorcycle): Promise<CompanyMotorcycle> {
    return this.repository.save(cm);
  }

  async findAllByCompanyId(companyId: string): Promise<Motorcycle[]> {
    const companyMotorcycles = await this.repository.find({
      where: { company: { id: companyId } },
      relations: ['motorcycle'],
    });
    return companyMotorcycles.map(cm => cm.motorcycle);
  }

  async findOneByMotorcycleAndCompany(motorcycleId: string, companyId: string): Promise<CompanyMotorcycle | null> {
    return this.repository.findOne({
      where: {
        motorcycle: { id: motorcycleId },
        company: { id: companyId },
      },
      relations: ['motorcycle', 'company'],
    });
  }
}

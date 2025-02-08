import { Injectable } from '@nestjs/common';
import { CreateCompanyUseCase } from '../use-cases/create-company.use-case';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

  async createCompany(companyData: { name: string }): Promise<Company> {
    return await this.createCompanyUseCase.execute(companyData);
  }
}
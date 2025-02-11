import { Injectable, Inject } from '@nestjs/common';
import { Company } from '../../domain/entities/company.entity';
import { CompanyRepository, COMPANY_REPOSITORY } from '../../infrastructure/repositories/company.repository';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(companyData: { name: string }): Promise<Company> {
    const company = new Company();
    company.name = companyData.name;
    return await this.companyRepository.createCompany(company);
  }
}
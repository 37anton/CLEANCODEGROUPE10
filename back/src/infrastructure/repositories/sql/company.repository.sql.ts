import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../../../domain/entities/company.entity";
import { CompanyRepository } from "../company.repository";

@Injectable()
export class CompanySqlRepository implements CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  async findOne(id: string): Promise<Company | null> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async createCompany(company: Company): Promise<Company> {
    return this.companyRepository.save(company);
  }
}
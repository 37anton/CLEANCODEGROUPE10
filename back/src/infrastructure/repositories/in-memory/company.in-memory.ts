import { Injectable } from "@nestjs/common";
import { Company } from "../../../domain/entities/company.entity";
import { COMPANY_REPOSITORY, CompanyRepository } from "../company.repository";

@Injectable()
export class CompanyInMemoryRepository implements CompanyRepository {
  private companies: Company[] = [];

  async findOne(companyId: string): Promise<Company | null> {
    return this.companies.find(company => company.id === companyId) || null;
  }

  async create(company: Company): Promise<Company> {
    company.id = Math.random().toString(36).substring(7); // Génération d'un faux ID unique
    this.companies.push(company);
    return company;
  }

  async findAll(): Promise<Company[]> {
    return this.companies;
  }

  async update(company: Company): Promise<Company> {
    const index = this.companies.findIndex(c => c.id === company.id);
    if (index !== -1) {
      this.companies[index] = company;
    }
    return company;
  }

  async delete(companyId: string): Promise<void> {
    this.companies = this.companies.filter(company => company.id !== companyId);
  }

  async createCompany(company: Company): Promise<Company> {
    this.companies.push(company);
    return company;
  }
}
import { Injectable } from "@nestjs/common";
import { Company } from "../../../domain/entities/company.entity";
import { CompanyRepository } from "../../repositories/company.repository";

@Injectable()
export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = [];

  async findById(companyId: string): Promise<Company | null> {
    return this.companies.find(company => company.id === companyId) || null;
  }

  // Fonction pour ajouter une entreprise en In-Memory (pour les tests)
  addCompany(company: Company) {
    this.companies.push(company);
  }
}

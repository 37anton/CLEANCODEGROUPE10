import { Company } from "../../domain/entities/company.entity";

export const COMPANY_REPOSITORY = "COMPANY_REPOSITORY";

export interface CompanyRepository {
  findOne(id: string): Promise<any>;
  createCompany(company: Company): Promise<Company>;
}

import { Company } from "../../domain/entities/company.entity";

export const COMPANY_REPOSITORY = "COMPANY_REPOSITORY"; 

export interface CompanyRepository {
  findById(companyId: string): Promise<Company | null>;
}
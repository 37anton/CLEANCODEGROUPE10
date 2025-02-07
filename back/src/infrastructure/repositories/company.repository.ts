export const COMPANY_REPOSITORY = "COMPANY_REPOSITORY";

export interface CompanyRepository {
  findOne(id: string): Promise<any>;
}

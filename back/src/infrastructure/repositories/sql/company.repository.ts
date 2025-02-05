import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../../../domain/entities/company.entity";
import { CompanyRepository } from "../../repositories/company.repository";

@Injectable()
export class SqlCompanyRepository implements CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>
  ) {}

  async findById(companyId: string): Promise<Company | null> {
    return this.repository.findOne({ where: { id: companyId } });
  }
}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "../../domain/entities/company.entity";
import { COMPANY_REPOSITORY } from "../repositories/company.repository";
import { CompanySqlRepository } from "../repositories/sql/company.repository.sql";
import { CompanyInMemoryRepository } from "../repositories/in-memory/company.in-memory";

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([Company])] : []),],
  providers: [
    { provide: COMPANY_REPOSITORY,
      useClass: isInMemory ? CompanyInMemoryRepository : CompanySqlRepository,
    }
  ],
  exports: [COMPANY_REPOSITORY],
})
export class CompanyModule {}
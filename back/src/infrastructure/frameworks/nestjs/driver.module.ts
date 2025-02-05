import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "../../../domain/entities/driver.entity";
import { Company } from "../../../domain/entities/company.entity";
import { DriverService } from "../../../application/services/driver.service";
import { GetDriversByCompanyUseCase } from "../../../application/use-cases/get-drivers-by-company.use-case";
import { CreateDriverUseCase } from "../../../application/use-cases/create-driver.use-case";
import { UpdateDriverUseCase } from "../../../application/use-cases/update-driver.use-case";
import { DRIVER_REPOSITORY } from "../../repositories/driver.repository";
import { COMPANY_REPOSITORY } from "../../repositories/company.repository";
import { SqlDriverRepository } from "../../repositories/sql/driver.repository";
import { InMemoryDriverRepository } from "../../repositories/in-memory/driver.repository";
import { SqlCompanyRepository } from "../../repositories/sql/company.repository";
import { InMemoryCompanyRepository } from "../../repositories/in-memory/company.repository";
import { DriverController } from "../../frameworks/nestjs/driver.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Company])],
  controllers: [DriverController],
  providers: [
    DriverService,
    GetDriversByCompanyUseCase,
    CreateDriverUseCase,
    UpdateDriverUseCase,

    // Injection du repository Driver
    {
      provide: DRIVER_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY === "true" ? InMemoryDriverRepository : SqlDriverRepository
    },

    // Injection du repository Company
    {
      provide: COMPANY_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY === "true" ? InMemoryCompanyRepository : SqlCompanyRepository
    }
  ],
  exports: [DriverService, DRIVER_REPOSITORY, COMPANY_REPOSITORY], // On exporte les Tokens
})
export class DriverModule {}

import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { DRIVER_REPOSITORY, DriverRepository } from "../../infrastructure/repositories/driver.repository";
import { COMPANY_REPOSITORY, CompanyRepository } from "../../infrastructure/repositories/company.repository";
import { Driver } from "../../domain/entities/driver.entity";

interface CreateDriverInput {
  name: string;
  license: string;
  experience: number;
  companyId: string;
}

@Injectable()
export class CreateDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY) private readonly driverRepository: DriverRepository,
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: CompanyRepository
  ) {}

  async execute(input: CreateDriverInput): Promise<Driver> {
    const company = await this.companyRepository.findById(input.companyId);
    if (!company) {
      throw new BadRequestException("L'entreprise associée n'existe pas.");
    }

    const newDriver = new Driver();
    newDriver.name = input.name;
    newDriver.license = input.license;
    newDriver.experience = input.experience;
    newDriver.company = company;

    return this.driverRepository.save(newDriver);
  }
}
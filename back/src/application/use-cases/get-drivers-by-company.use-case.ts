import { Inject, Injectable } from "@nestjs/common";
import { DRIVER_REPOSITORY, DriverRepository } from "../../infrastructure/repositories/driver.repository";
import { Driver } from "../../domain/entities/driver.entity";

@Injectable()
export class GetDriversByCompanyUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY) private readonly driverRepository: DriverRepository
  ) {}

  async execute(companyId: string): Promise<Driver[]> {
    return this.driverRepository.findByCompanyId(companyId);
  }
}
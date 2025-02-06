import { Injectable, Inject } from '@nestjs/common';
import { DriverRepository, DRIVER_REPOSITORY } from '../../infrastructure/repositories/driver.repository';

@Injectable()
export class FindDriversByCompanyUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY) private readonly driverRepository: DriverRepository,
  ) {}

  async execute(companyId: string) {
    return await this.driverRepository.findByCompany(companyId);
  }
}
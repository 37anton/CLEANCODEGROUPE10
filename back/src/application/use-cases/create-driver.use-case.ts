import { Injectable, Inject } from '@nestjs/common';
import { DriverRepository, DRIVER_REPOSITORY } from '../../infrastructure/repositories/driver.repository';

@Injectable()
export class CreateDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY) private readonly driverRepository: DriverRepository,
  ) {}

  async execute(companyId: string, name: string, license: string, experience: number) {
    return await this.driverRepository.createDriver(companyId, name, license, experience);
  }
}

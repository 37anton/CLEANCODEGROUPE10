import { Injectable, Inject } from '@nestjs/common';
import { DriverRepository, DRIVER_REPOSITORY } from '../../infrastructure/repositories/driver.repository';

@Injectable()
export class UpdateDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY) private readonly driverRepository: DriverRepository,
  ) {}

  async execute(driverId: string, companyId: string, updateData: Partial<any>) {
    return await this.driverRepository.updateDriver(driverId, companyId, updateData);
  }
}

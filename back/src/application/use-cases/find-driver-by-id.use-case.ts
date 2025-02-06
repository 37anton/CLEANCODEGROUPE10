import { Injectable, Inject } from '@nestjs/common';
import { DriverRepository, DRIVER_REPOSITORY } from '../../infrastructure/repositories/driver.repository';

@Injectable()
export class FindDriverByIdUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY) private readonly driverRepository: DriverRepository,
  ) {}

  async execute(id: string) {
    return await this.driverRepository.findById(id);
  }
}
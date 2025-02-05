import { Inject, Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { DRIVER_REPOSITORY, DriverRepository } from "../../infrastructure/repositories/driver.repository";
import { Driver } from "../../domain/entities/driver.entity";

interface UpdateDriverInput {
  name?: string;
  license?: string;
  experience?: number;
}

@Injectable()
export class UpdateDriverUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY) private readonly driverRepository: DriverRepository
  ) {}

  async execute(driverId: string, companyId: string, updateData: UpdateDriverInput): Promise<Driver> {
    const driver = await this.driverRepository.findById(driverId);
    if (!driver) {
      throw new NotFoundException("Conducteur non trouvé.");
    }

    if (driver.company.id !== companyId) {
      throw new ForbiddenException("Vous n'avez pas le droit de modifier ce conducteur.");
    }

    Object.assign(driver, updateData);
    return this.driverRepository.save(driver);
  }
}

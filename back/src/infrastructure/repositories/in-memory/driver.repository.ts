import { Injectable } from "@nestjs/common";
import { Driver } from "../../../domain/entities/driver.entity";
import { DriverRepository } from "../../../infrastructure/repositories/driver.repository";

@Injectable()
export class InMemoryDriverRepository implements DriverRepository {
  private drivers: Driver[] = [];

  async findByCompanyId(companyId: string): Promise<Driver[]> {
    return this.drivers.filter(driver => driver.company.id === companyId);
  }

  async findById(driverId: string): Promise<Driver | null> {
    return this.drivers.find(driver => driver.id === driverId) || null;
  }

  async save(driver: Driver): Promise<Driver> {
    const existingIndex = this.drivers.findIndex(d => d.id === driver.id);
    if (existingIndex !== -1) {
      this.drivers[existingIndex] = driver;
    } else {
      this.drivers.push(driver);
    }
    return driver;
  }
}

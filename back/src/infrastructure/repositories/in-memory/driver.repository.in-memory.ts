import { Injectable } from '@nestjs/common';
import { Driver } from '../../../domain/entities/driver.entity';
import { DriverRepository } from '../driver.repository';

@Injectable()
export class DriverInMemoryRepository implements DriverRepository {
  private drivers: Driver[] = [];

  async createDriver(companyId: string, name: string, license: string, experience: number): Promise<Driver> {
    const driver = new Driver();
    driver.id = Math.random().toString(36).substring(7);
    driver.name = name;
    driver.license = license;
    driver.experience = experience;
    driver.company = { id: companyId } as any;
    this.drivers.push(driver);
    return driver;
  }

  async findById(id: string): Promise<Driver | null> {
    return this.drivers.find(driver => driver.id === id) || null;
  }

  async findByCompany(companyId: string): Promise<Driver[]> {
    return this.drivers.filter(driver => driver.company.id === companyId);
  }

  async updateDriver(driverId: string, companyId: string, updateData: Partial<Driver>): Promise<Driver | null> {
    const driver = await this.findById(driverId);

    if (!driver || driver.company.id !== companyId) {
      return null;
    }

    Object.assign(driver, updateData);
    return driver;
  }
}
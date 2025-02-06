import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../domain/entities/driver.entity';
import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../driver.repository';

@Injectable()
export class DriverSqlRepository implements DriverRepository {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async createDriver(companyId: string, name: string, license: string, experience: number): Promise<Driver> {
    const driver = this.driverRepository.create({ name, license, experience, company: { id: companyId } as any });
    return await this.driverRepository.save(driver);
  }

  async findById(id: string): Promise<Driver | null> {
    return await this.driverRepository.findOne({ where: { id }, relations: ['company'] });
  }

  async findByCompany(companyId: string): Promise<Driver[]> {
    return await this.driverRepository.find({ where: { company: { id: companyId } }, order: { name: 'ASC' } });
  }

  async updateDriver(driverId: string, companyId: string, updateData: Partial<Driver>): Promise<Driver | null> {
    const driver = await this.findById(driverId);
    if (!driver || driver.company.id !== companyId) {
      return null;
    }

    Object.assign(driver, updateData);
    return await this.driverRepository.save(driver);
  }
}
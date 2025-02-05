import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../../domain/entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getDriversByCompany(companyId: string): Promise<Driver[]> {
    return this.driverRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'], // Inclure les détails de la company si nécessaire
    });
  }
}

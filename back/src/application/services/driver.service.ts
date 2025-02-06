import { Injectable } from '@nestjs/common';
import { CreateDriverUseCase } from '../use-cases/create-driver.use-case';
import { FindDriverByIdUseCase } from '../use-cases/find-driver-by-id.use-case';
import { FindDriversByCompanyUseCase } from '../use-cases/find-drivers-by-company.use-case';
import { UpdateDriverUseCase } from '../use-cases/update-driver.use-case';

@Injectable()
export class DriverService {
  constructor(
    private readonly createDriverUseCase: CreateDriverUseCase,
    private readonly findDriverByIdUseCase: FindDriverByIdUseCase,
    private readonly findDriversByCompanyUseCase: FindDriversByCompanyUseCase,
    private readonly updateDriverUseCase: UpdateDriverUseCase,
  ) {}

  async create(companyId: string, name: string, license: string, experience: number) {
    if (!companyId) {
      throw new Error("companyId ne peut pas être null");
    }
    return await this.createDriverUseCase.execute(companyId, name, license, experience);
  }

  async findById(id: string) {
    return await this.findDriverByIdUseCase.execute(id);
  }

  async findByCompany(companyId: string) {
    return await this.findDriversByCompanyUseCase.execute(companyId);
  }

  async updateDriver(driverId: string, companyId: string, updateData: Partial<any>) {
    return await this.updateDriverUseCase.execute(driverId, companyId, updateData);
  }

}
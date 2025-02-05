import { Injectable } from "@nestjs/common";
import { GetDriversByCompanyUseCase } from "../use-cases/get-drivers-by-company.use-case";
import { CreateDriverUseCase } from "../use-cases/create-driver.use-case";
import { UpdateDriverUseCase } from "../use-cases/update-driver.use-case";

@Injectable()
export class DriverService {
  constructor(
    private readonly getDriversByCompanyUseCase: GetDriversByCompanyUseCase,
    private readonly createDriverUseCase: CreateDriverUseCase,
    private readonly updateDriverUseCase: UpdateDriverUseCase
  ) {}

  async getDriversByCompany(companyId: string) {
    return this.getDriversByCompanyUseCase.execute(companyId);
  }

  async createDriver(companyId: string, driverData: any) {
    return this.createDriverUseCase.execute({ ...driverData, companyId });
  }

  async updateDriver(driverId: string, companyId: string, updateData: any) {
    return this.updateDriverUseCase.execute(driverId, companyId, updateData);
  }
}
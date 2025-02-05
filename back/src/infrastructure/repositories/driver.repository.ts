import { Driver } from "../../domain/entities/driver.entity";

export const DRIVER_REPOSITORY = "DRIVER_REPOSITORY";

export interface DriverRepository {
  findByCompanyId(companyId: string): Promise<Driver[]>;
  findById(driverId: string): Promise<Driver | null>;
  save(driver: Driver): Promise<Driver>;
}

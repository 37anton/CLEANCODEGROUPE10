export const DRIVER_REPOSITORY = 'DRIVER_REPOSITORY';

export interface DriverRepository {
  createDriver(companyId: string, name: string, license: string, experience: number): Promise<any>;
  findById(id: string): Promise<any>;
  findByCompany(companyId: string): Promise<any>;
  updateDriver(driverId: string, companyId: string, updateData: Partial<any>): Promise<any>;
}

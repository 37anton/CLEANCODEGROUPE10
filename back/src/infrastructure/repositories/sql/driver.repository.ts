import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Driver } from "../../../domain/entities/driver.entity";
import { DriverRepository } from "../../../infrastructure/repositories/driver.repository";

@Injectable()
export class SqlDriverRepository implements DriverRepository {
  constructor(
    @InjectRepository(Driver)
    private readonly repository: Repository<Driver>
  ) {}

  async findByCompanyId(companyId: string): Promise<Driver[]> {
    return this.repository.find({
      where: { company: { id: companyId } },
      relations: ["company"],
      order: { name: "ASC" },
    });
  }

  async findById(driverId: string): Promise<Driver | null> {
    return this.repository.findOne({
      where: { id: driverId },
      relations: ["company"],
    });
  }

  async save(driver: Driver): Promise<Driver> {
    return this.repository.save(driver);
  }
}

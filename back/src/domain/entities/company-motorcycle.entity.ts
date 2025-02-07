// src/domain/entities/company-motorcycle.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Motorcycle } from './motorcycle.entity';
import { Driver } from './driver.entity';

@Entity()
export class CompanyMotorcycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, company => company.companyMotorcycles)
  company: Company;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.companyMotorcycles, { onDelete: "CASCADE" })
  motorcycle: Motorcycle;

  @OneToMany(() => Driver, driver => driver.companyMotorcycle)
  drivers: Driver[];
}
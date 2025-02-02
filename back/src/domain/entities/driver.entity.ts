// src/domain/entities/driver.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompanyMotorcycle } from './company-motorcycle.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CompanyMotorcycle, companyMotorcycle => companyMotorcycle.drivers)
  companyMotorcycle: CompanyMotorcycle;
}
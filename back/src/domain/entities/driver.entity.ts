// src/domain/entities/driver.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompanyMotorcycle } from './company-motorcycle.entity';
import { Company } from './company.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  license: string; // Type de permis de conduire (ex: A1, A2, A)

  @Column()
  experience: number; // Années d'expérience en moto

  @ManyToOne(() => Company, company => company.drivers, { nullable: false })
  company: Company;

  @ManyToOne(() => CompanyMotorcycle, companyMotorcycle => companyMotorcycle.drivers, { nullable: true })
  companyMotorcycle: CompanyMotorcycle;
}
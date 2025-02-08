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
  license: string; 

  @Column()
  experience: number;

  @ManyToOne(() => Company, company => company.drivers, { nullable: false })
  company: Company;

  @ManyToOne(() => CompanyMotorcycle, companyMotorcycle => companyMotorcycle.drivers, { nullable: true })
  companyMotorcycle: CompanyMotorcycle;
}
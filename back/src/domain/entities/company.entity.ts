// src/domain/entities/company.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CompanyMotorcycle } from './company-motorcycle.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, user => user.company)
  users: User[];

  @OneToMany(() => CompanyMotorcycle, cm => cm.company)
  companyMotorcycles: CompanyMotorcycle[];
}

// src/domain/entities/motorcycle.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Concession } from './concession.entity';
import { Trial } from './trial.entity';
import { ClientMotorcycle } from './client-motorcycle.entity';
import { Incident } from './incident.entity';
import { Warranty } from './warranty.entity';
import { Maintenance } from './maintenance.entity';
import { MotorcyclePart } from './motorcycle-part.entity';
import { CompanyMotorcycle } from './company-motorcycle.entity';
import { Interval } from './interval.entity';

@Entity()
export class Motorcycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vin: string; // Vehicle Identification Number

  @Column()
  model: string;

  @Column({ type: 'timestamp' })
  manufactureDate: Date;

  // Maintenance info
  @Column({ type: 'timestamp' })
  lastMaintenanceDate: Date;

  @Column()
  mileage: number;

  @Column()
  lastMaintenanceMileage: number;

  @ManyToOne(() => Concession, concession => concession.motorcycles, { nullable: true })
  concession: Concession;

  @OneToMany(() => Trial, trial => trial.motorcycle)
  trials: Trial[];

  @OneToMany(() => ClientMotorcycle, cm => cm.motorcycle)
  clientMotorcycles: ClientMotorcycle[];

  @OneToMany(() => Incident, incident => incident.motorcycle)
  incidents: Incident[];

  @OneToMany(() => Warranty, warranty => warranty.motorcycle)
  warranties: Warranty[];

  @OneToMany(() => Maintenance, maintenance => maintenance.vehicleId)
  maintenances: Maintenance[];

  @OneToMany(() => MotorcyclePart, mp => mp.motorcycle)
  motorcycleParts: MotorcyclePart[];

  @OneToMany(() => Interval, interval => interval.motorcycle)
  intervals: Interval[];

  // For CompanyMotorcycle relation:
  @OneToMany(() => CompanyMotorcycle, cm => cm.motorcycle)
  companyMotorcycles: CompanyMotorcycle[];
}

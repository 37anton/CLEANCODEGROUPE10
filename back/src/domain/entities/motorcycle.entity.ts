import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Concession } from './concession.entity';
import { Incident } from './incident.entity';
import { Warranty } from './warranty.entity';
import { Maintenance } from './maintenance.entity';
import { Interval } from './interval.entity';
import { CompanyMotorcycle } from './company-motorcycle.entity';
import { ClientMotorcycle } from './client-motorcycle.entity';
import { MotorcyclePart } from './motorcycle-part.entity';
import { Trial } from './trial.entity';

@Entity()
export class Motorcycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  vin: string;

  @Column()
  model: string;

  @Column({ type: 'timestamp' })
  manufactureDate: Date;

  @Column({ type: 'timestamp' })
  lastMaintenanceDate: Date;

  @Column()
  mileage: number;

  @Column()
  lastMaintenanceMileage: number;

  @ManyToOne(() => Concession, concession => concession.motorcycles, { nullable: true })
  @JoinColumn({ name: "concessionId" })
  concession: Concession | null;

  @OneToMany(() => Incident, incident => incident.motorcycle)
  incidents: Incident[];

  @OneToMany(() => Warranty, warranty => warranty.motorcycle)
  warranties: Warranty[];

  @OneToMany(() => Maintenance, maintenance => maintenance.vehicleId)
  maintenances: Maintenance[];

  @OneToMany(() => Interval, interval => interval.motorcycle)
  intervals: Interval[];

  @OneToMany(() => CompanyMotorcycle, cm => cm.motorcycle, { cascade: true, onDelete: "CASCADE" } )
  companyMotorcycles: CompanyMotorcycle[];

  @OneToMany(() => ClientMotorcycle, cm => cm.motorcycle, { cascade: true, onDelete: "CASCADE" } )
  clientMotorcycles: ClientMotorcycle[];

  @OneToMany(() => MotorcyclePart, mp => mp.motorcycle)
  motorcycleParts: MotorcyclePart[];

  @OneToMany(() => Trial, trial => trial.motorcycle)
  trials: Trial[];
}

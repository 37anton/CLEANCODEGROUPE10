// src/domain/entities/maintenance.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Interval } from './interval.entity';
import { MaintenancePart } from './maintenance-part.entity';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vehicleId: string;

  @Column({ type: 'timestamp' })
  scheduledDate: Date;

  @Column({ type: 'varchar' })
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';

  @Column({ type: 'int', nullable: true })
  scheduledMileage?: number;


  @Column({ type: 'float', nullable: true })
  cost?: number;

  @Column({ type: 'text', nullable: true })
  technicianRecommendations?: string;

  @ManyToOne(() => Interval, interval => interval.maintenances, { nullable: true })
  interval: Interval;

  @OneToMany(() => MaintenancePart, maintenancePart => maintenancePart.maintenance, { cascade: true })
  maintenanceParts: MaintenancePart[];
}

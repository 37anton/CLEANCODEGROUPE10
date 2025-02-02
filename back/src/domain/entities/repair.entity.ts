// src/domain/entities/repair.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Incident } from './incident.entity';
import { RepairPart } from './repair-part.entity';

@Entity()
export class Repair {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  repairDate: Date;

  @Column()
  description: string;

  @ManyToOne(() => Incident, incident => incident.repairs)
  incident: Incident;

  @OneToMany(() => RepairPart, rp => rp.repair)
  repairParts: RepairPart[];
}

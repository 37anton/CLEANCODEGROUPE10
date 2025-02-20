import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Motorcycle } from './motorcycle.entity';
import { Maintenance } from './maintenance.entity';

@Entity()
export class Interval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  km: number;

  @Column()
  timeInYears: number;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.intervals,  { onDelete: 'CASCADE' })
  motorcycle: Motorcycle;

  @OneToMany(() => Maintenance, maintenance => maintenance.interval)
  maintenances: Maintenance[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Motorcycle } from './motorcycle.entity';
import { Repair } from './repair.entity';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  incidentDate: Date;

  @Column()
  description: string;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.incidents)
  motorcycle: Motorcycle;

  @OneToMany(() => Repair, repair => repair.incident)
  repairs: Repair[];
}

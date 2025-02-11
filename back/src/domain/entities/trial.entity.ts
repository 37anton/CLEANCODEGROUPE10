import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';
import { Motorcycle } from './motorcycle.entity';

@Entity()
export class Trial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, client => client.trials)
  client: Client;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.trials)
  motorcycle: Motorcycle;

  @Column({ type: 'timestamp' })
  trialDate: Date;
}

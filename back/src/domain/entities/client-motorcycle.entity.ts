import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Client } from './client.entity'; // Doit être défini
import { Motorcycle } from './motorcycle.entity';

@Entity()
export class ClientMotorcycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, client => client.clientMotorcycles)
  client: Client;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.clientMotorcycles)
  motorcycle: Motorcycle;
}

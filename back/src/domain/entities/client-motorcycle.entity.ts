// src/domain/entities/client-motorcycle.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Client } from './client.entity';
import { Motorcycle } from './motorcycle.entity';

@Entity()
export class ClientMotorcycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, client => client.clientMotorcycles)
  client: Client;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.clientMotorcycles, { onDelete: "CASCADE" })
  motorcycle: Motorcycle;
}

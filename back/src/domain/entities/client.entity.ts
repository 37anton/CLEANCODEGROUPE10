// src/domain/entities/client.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Trial } from './trial.entity';
import { ClientMotorcycle } from './client-motorcycle.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, user => user.client)
  users: User[];

  @OneToMany(() => Trial, trial => trial.client)
  trials: Trial[];

  @OneToMany(() => ClientMotorcycle, cm => cm.client)
  clientMotorcycles: ClientMotorcycle[];
}

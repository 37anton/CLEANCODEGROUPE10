import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Motorcycle } from './motorcycle.entity';

@Entity()
export class Concession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, user => user.concession)
  users: User[];

  @OneToMany(() => Motorcycle, motorcycle => motorcycle.concession)
  motorcycles: Motorcycle[];
}

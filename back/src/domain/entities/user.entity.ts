import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Company } from './company.entity';
import { Concession } from './concession.entity';
import { Client } from './client.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' }) // "admin", "company", "client"
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isAdmin: boolean;

  @ManyToOne(() => Company, company => company.users, { nullable: true })
  company: Company;

  @ManyToOne(() => Concession, concession => concession.users, { nullable: true })
  concession: Concession;

  @ManyToOne(() => Client, client => client.users, { nullable: true })
  client: Client;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Concession } from './concession.entity';
import { Client } from './client.entity';

import { Notification } from "./notification.entity";


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
  company: Company | null;

  @ManyToOne(() => Concession, concession => concession.users, { nullable: true })
  concession: Concession | null;

  @ManyToOne(() => Client, client => client.users, { nullable: true })
  client: Client | null;

  @OneToMany(() => Notification, (notification) => notification.user, { cascade: true })
  notifications: Notification[];

}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Part } from "./part.entity";
import { Company } from "./company.entity";
import { Concession } from "./concession.entity";
import { Client } from "./client.entity";
import { RepairPart } from './repair-part.entity';

@Entity()
export class PartStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Part, { nullable: false })
  part: Part;

  @ManyToOne(() => Company, { nullable: true }) 
  company?: Company;

  @ManyToOne(() => Concession, { nullable: true }) 
  concession?: Concession;

  @ManyToOne(() => Client, { nullable: true }) 
  client?: Client;

  @Column({ default: 0 }) 
  quantity: number;

  @Column({ default: 5 }) 
  alertThreshold: number;

  @OneToMany(() => RepairPart, repairPart => repairPart.partStock)
  repairParts?: RepairPart[];
}
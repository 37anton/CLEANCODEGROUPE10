import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Part } from "./part.entity";
import { Company } from "./company.entity";
import { Concession } from "./concession.entity";

@Entity()
export class PartStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Part, { nullable: false }) // Référence à la pièce
  part: Part;

  @ManyToOne(() => Company, { nullable: true }) // Si c'est une entreprise qui gère le stock
  company?: Company;

  @ManyToOne(() => Concession, { nullable: true }) // Si c'est une concession qui gère le stock
  concession?: Concession;

  @Column({ default: 0 }) // Nombre de pièces disponibles
  quantity: number;

  @Column({ default: 5 }) // Seuil d’alerte pour les stocks bas
  alertThreshold: number;
}
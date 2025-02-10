import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MotorcyclePart } from './motorcycle-part.entity';
import { WarrantyPart } from './warranty-part.entity';
import { PartSupplier } from "./part-supplier.entity";

@Entity()
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => MotorcyclePart, mp => mp.part)
  motorcycleParts: MotorcyclePart[];

  @OneToMany(() => WarrantyPart, wp => wp.part)
  warrantyParts: WarrantyPart[];

  @OneToMany(() => PartSupplier, (partSupplier) => partSupplier.part)
  partSuppliers: PartSupplier[];
}

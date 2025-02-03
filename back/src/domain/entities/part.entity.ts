import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MotorcyclePart } from './motorcycle-part.entity';
import { WarrantyPart } from './warranty-part.entity';
import { RepairPart } from './repair-part.entity';

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

  @OneToMany(() => RepairPart, rp => rp.part)
  repairParts: RepairPart[];
}

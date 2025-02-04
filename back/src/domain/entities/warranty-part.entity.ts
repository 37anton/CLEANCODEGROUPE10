// src/domain/entities/warranty-part.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Warranty } from './warranty.entity';
import { Part } from './part.entity';

@Entity()
export class WarrantyPart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Warranty, warranty => warranty.warrantyParts)
  warranty: Warranty;

  @ManyToOne(() => Part, part => part.warrantyParts)
  part: Part;
}

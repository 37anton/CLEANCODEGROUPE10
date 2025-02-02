// src/domain/entities/motorcycle-part.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Motorcycle } from './motorcycle.entity';
import { Part } from './part.entity';

@Entity()
export class MotorcyclePart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.motorcycleParts)
  motorcycle: Motorcycle;

  @ManyToOne(() => Part, part => part.motorcycleParts)
  part: Part;
}

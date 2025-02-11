import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Motorcycle } from './motorcycle.entity';
import { WarrantyPart } from './warranty-part.entity';

@Entity()
export class Warranty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @ManyToOne(() => Motorcycle, motorcycle => motorcycle.warranties, {onDelete: 'SET NULL' })
  motorcycle: Motorcycle;

  @OneToMany(() => WarrantyPart, wp => wp.warranty)
  warrantyParts: WarrantyPart[];
}

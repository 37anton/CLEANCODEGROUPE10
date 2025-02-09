import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Repair } from './repair.entity';
import { Part } from './part.entity';

@Entity()
export class RepairPart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Repair, repair => repair.repairParts)
  repair: Repair;

  @ManyToOne(() => Part, part => part.repairParts)
  part: Part;
}

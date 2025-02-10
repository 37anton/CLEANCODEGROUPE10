import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Repair } from './repair.entity';
import { PartStock } from './part-stock.entity';

@Entity()
export class RepairPart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Repair, repair => repair.repairParts, { nullable: false, onDelete: 'CASCADE' })
  repair: Repair;

  @ManyToOne(() => PartStock, { nullable: false })
  partStock: PartStock;

  @Column({ type: 'int' })
  quantity: number;
}

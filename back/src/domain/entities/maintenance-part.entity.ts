import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Maintenance } from './maintenance.entity';
import { PartStock } from './part-stock.entity';

@Entity()
export class MaintenancePart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Maintenance, maintenance => maintenance.maintenanceParts, { nullable: false, onDelete: 'CASCADE' })
  maintenance: Maintenance;

  @ManyToOne(() => PartStock, { nullable: false })
  partStock: PartStock;

  @Column({ type: 'int' })
  quantity: number;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IntervalDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  model: string;

  @Column()
  km: number;

  @Column()
  timeInYears: number;
}

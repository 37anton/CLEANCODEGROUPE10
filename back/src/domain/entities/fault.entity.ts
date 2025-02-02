// src/domain/entities/fault.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum FaultType {
  BREAKDOWN = 'BREAKDOWN',
  WARRANTY = 'WARRANTY',
}

export enum FaultStatus {
  REPORTED = 'REPORTED',
  IN_REPAIR = 'IN_REPAIR',
  REPAIRED = 'REPAIRED',
  CLOSED = 'CLOSED',
}

@Entity()
export class Fault {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vehicleId: string;

  @Column({ type: 'timestamp' })
  reportedDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  type: FaultType;

  @Column({ type: 'varchar' })
  status: FaultStatus;

  @Column({ type: 'timestamp', nullable: true })
  repairDate?: Date;

  @Column({ type: 'float', nullable: true })
  repairCost?: number;

  @Column({ type: 'text', nullable: true })
  correctiveActions?: string;

  @Column({ type: 'text', nullable: true })
  warrantyDetails?: string;
}

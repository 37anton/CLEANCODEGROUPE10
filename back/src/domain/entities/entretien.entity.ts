import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entretien {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  motoId: string;

  @Column({ type: 'timestamp' })
  datePlanifiee: Date;

  @Column()
  statut: 'PLANIFIE' | 'REALISE' | 'ANNULE';

  constructor(
    id: string,
    motoId: string,
    datePlanifiee: Date,
    statut: 'PLANIFIE' | 'REALISE' | 'ANNULE',
  ) {
    this.id = id;
    this.motoId = motoId;
    this.datePlanifiee = datePlanifiee;
    this.statut = statut;
  }
}

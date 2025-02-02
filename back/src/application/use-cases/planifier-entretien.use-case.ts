import { Injectable, Inject } from '@nestjs/common';
import { Moto } from '../../domain/entities/moto.entity';
import { Entretien } from '../../domain/entities/entretien.entity';

@Injectable()
export class PlanifierEntretienUseCase {
  constructor(
    @Inject('EntretienRepository')
    private readonly entretienRepository: {
      save(entretien: Entretien): Entretien;
      findByMotoId(motoId: string): Entretien[];
    },
  ) {}

  execute(moto: Moto): Entretien {
    const prochainEntretienDate = new Date(moto.dernierEntretien);
    prochainEntretienDate.setMonth(
      prochainEntretienDate.getMonth() + moto.intervalleTemps,
    );

    if (moto.kilometrage >= moto.intervalleKm) {
      const entretien = new Entretien(
        crypto.randomUUID(),
        moto.id,
        prochainEntretienDate,
        'PLANIFIE',
      );
      this.entretienRepository.save(entretien);
      return entretien;
    }
    throw new Error("Pas encore besoin d'entretien");
  }
}

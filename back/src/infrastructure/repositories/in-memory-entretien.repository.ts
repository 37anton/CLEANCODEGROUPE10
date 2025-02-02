import { Injectable } from '@nestjs/common';
import { Entretien } from '../../domain/entities/entretien.entity';

@Injectable()
export class InMemoryEntretienRepository {
  private entretiens: Entretien[] = [];

  save(entretien: Entretien): Entretien {
    this.entretiens.push(entretien);
    return entretien;
  }

  findByMotoId(motoId: string): Entretien[] {
    return this.entretiens.filter((e) => e.motoId === motoId);
  }
}

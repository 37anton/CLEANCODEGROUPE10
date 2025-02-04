// list-motorcycles.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Injectable()
export class ListMotorcyclesUseCase {
  constructor(
    @Inject('CustomCompanyMotorcycleRepository')
    private readonly companyMotorcycleRepository: {
      findAllByCompanyId(companyId: string): Promise<Motorcycle[]>;
    },
    @Inject('CustomClientMotorcycleRepository')
    private readonly clientMotorcycleRepository: {
      findAllByClientId(clientId: string): Promise<Motorcycle[]>;
    },
  ) {}

  async execute(user: any): Promise<Motorcycle[]> {
    if (user.companyId) {
      return this.companyMotorcycleRepository.findAllByCompanyId(user.companyId);
    } else if (user.clientId) {
      return this.clientMotorcycleRepository.findAllByClientId(user.clientId);
    }
    // Vous pouvez aussi lever une erreur ou retourner un tableau vide si l'utilisateur n'a ni companyId ni clientId.
    return [];
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Injectable()
export class GetMotorcyclesUseCase {
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
    if (user.companyId || (user.company && user.company.id)) {
      const companyId = user.companyId || user.company.id;
      return this.companyMotorcycleRepository.findAllByCompanyId(companyId);
    } else if (user.clientId || (user.client && user.client.id)) {
      const clientId = user.clientId || user.client.id;
      return this.clientMotorcycleRepository.findAllByClientId(clientId);
    }
    return [];
  }
}

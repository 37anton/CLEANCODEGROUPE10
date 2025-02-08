import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { MOTORCYCLE_REPOSITORY, MotorcycleRepository } from 'src/infrastructure/repositories/motorcycle.repository';
import { COMPANY_MOTORCYCLE_REPOSITORY } from 'src/infrastructure/repositories/company-motorcycle.repository';
import { CLIENT_MOTORCYCLE_REPOSITORY } from 'src/infrastructure/repositories/client-motorcycle.repository';

@Injectable()
export class GetMotorcyclesUseCase {
  constructor(
    @Inject(MOTORCYCLE_REPOSITORY) 
    private readonly motorcycleRepository: MotorcycleRepository,
    
    @Inject(COMPANY_MOTORCYCLE_REPOSITORY)
    private readonly companyMotorcycleRepository: {
      findAllByCompanyId(companyId: string): Promise<Motorcycle[]>;
    },
    @Inject(CLIENT_MOTORCYCLE_REPOSITORY)
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

  async findById(id: string): Promise<Motorcycle | null> {
    return this.motorcycleRepository.findById(id);
  }
}

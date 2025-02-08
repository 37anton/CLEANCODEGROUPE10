import { Injectable, ForbiddenException, NotFoundException, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { COMPANY_MOTORCYCLE_REPOSITORY } from 'src/infrastructure/repositories/company-motorcycle.repository';
import { MOTORCYCLE_REPOSITORY } from 'src/infrastructure/repositories/motorcycle.repository';
import { CLIENT_MOTORCYCLE_REPOSITORY } from 'src/infrastructure/repositories/client-motorcycle.repository';

@Injectable()
export class UpdateMotorcycleUseCase {
  constructor(
    @Inject(MOTORCYCLE_REPOSITORY)
    private readonly motorcycleRepository: {
      findById(id: string): Promise<Motorcycle>;
      update(motorcycle: Motorcycle): Promise<Motorcycle>;
    },
    @Inject(COMPANY_MOTORCYCLE_REPOSITORY)
    private readonly companyMotorcycleRepository: {
      findOneByMotorcycleAndCompany(motorcycleId: string, companyId: string): Promise<any>;
    },
    @Inject(CLIENT_MOTORCYCLE_REPOSITORY)
    private readonly clientMotorcycleRepository: {
      findOneByMotorcycleAndClient(motorcycleId: string, clientId: string): Promise<any>;
    },
  ) {}

  async execute(id: string, updateData: Partial<Omit<Motorcycle, 'id'>>, user: any): Promise<Motorcycle> {
    const motorcycle = await this.motorcycleRepository.findById(id);
    if (!motorcycle) {
      throw new NotFoundException('Motorcycle not found');
    }

    const role = user.role;
    if (role === 'concession') {
      const concessionId = user.concessionId || (user.concession && user.concession.id);
      if (!motorcycle.concession || motorcycle.concession.id !== concessionId) {
        throw new ForbiddenException('You are not authorized to update this motorcycle');
      }
    } else if (role === 'company') {
      const companyId = user.companyId || (user.company && user.company.id);
      const linkingRecord = await this.companyMotorcycleRepository.findOneByMotorcycleAndCompany(id, companyId);
      if (!linkingRecord) {
        throw new ForbiddenException('You are not authorized to update this motorcycle');
      }
    } else if (role === 'client') {
      const clientId = user.clientId || (user.client && user.client.id);
      const linkingRecord = await this.clientMotorcycleRepository.findOneByMotorcycleAndClient(id, clientId);
      if (!linkingRecord) {
        throw new ForbiddenException('You are not authorized to update this motorcycle');
      }
    } else {
      throw new ForbiddenException('Role not authorized');
    }

    Object.assign(motorcycle, updateData);
    const updated = await this.motorcycleRepository.update(motorcycle);
    return updated;
  }
}

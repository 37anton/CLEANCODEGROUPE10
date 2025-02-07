import { Injectable, ForbiddenException, NotFoundException, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Injectable()
export class DeleteMotorcycleUseCase {
  constructor(
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: {
      findById(id: string): Promise<Motorcycle>;
      delete(id: string): Promise<void>;
    },
    @Inject('CustomCompanyMotorcycleRepository')
    private readonly companyMotorcycleRepository: {
      findOneByMotorcycleAndCompany(motorcycleId: string, companyId: string): Promise<any>;
    },
    @Inject('CustomClientMotorcycleRepository')
    private readonly clientMotorcycleRepository: {
      findOneByMotorcycleAndClient(motorcycleId: string, clientId: string): Promise<any>;
    },
  ) {}

  async execute(id: string, user: any): Promise<void> {
    const motorcycle = await this.motorcycleRepository.findById(id);
    if (!motorcycle) {
      throw new NotFoundException('Motorcycle not found');
    }

    const role = user.role;
    if (role === 'concession') {
      const concessionId = user.concessionId || (user.concession && user.concession.id);
      if (!motorcycle.concession || motorcycle.concession.id !== concessionId) {
        throw new ForbiddenException('You are not authorized to delete this motorcycle');
      }
    } else if (role === 'company') {
      const companyId = user.companyId || (user.company && user.company.id);
      const linkingRecord = await this.companyMotorcycleRepository.findOneByMotorcycleAndCompany(id, companyId);
      if (!linkingRecord) {
        throw new ForbiddenException('You are not authorized to delete this motorcycle');
      }
    } else if (role === 'client') {
      const clientId = user.clientId || (user.client && user.client.id);
      const linkingRecord = await this.clientMotorcycleRepository.findOneByMotorcycleAndClient(id, clientId);
      if (!linkingRecord) {
        throw new ForbiddenException('You are not authorized to delete this motorcycle');
      }
    } else {
      throw new ForbiddenException('Role not authorized');
    }

    await this.motorcycleRepository.delete(id);
  }
}

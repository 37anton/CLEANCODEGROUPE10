import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { CompanyMotorcycle } from '../../domain/entities/company-motorcycle.entity';
import { ClientMotorcycle } from '../../domain/entities/client-motorcycle.entity';
import { CreateMotorcycleDto } from '../dto/create-motorcycle.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class MotorcycleService {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
    @InjectRepository(CompanyMotorcycle)
    private readonly companyMotorcycleRepository: Repository<CompanyMotorcycle>,
    @InjectRepository(ClientMotorcycle)
    private readonly clientMotorcycleRepository: Repository<ClientMotorcycle>,
  ) {}

  async createMotorcycle(dto: CreateMotorcycleDto, user: User): Promise<Motorcycle> {

    const motorcycle = this.motorcycleRepository.create({
      vin: dto.vin,
      model: dto.model,
      manufactureDate: new Date(dto.manufactureDate),
      lastMaintenanceDate: new Date(dto.lastMaintenanceDate),
      mileage: dto.mileage,
      lastMaintenanceMileage: dto.lastMaintenanceMileage,
    });
    const savedMotorcycle = await this.motorcycleRepository.save(motorcycle);

    if (user.company) {
      const companyMoto = this.companyMotorcycleRepository.create({
        company: user.company,
        motorcycle: savedMotorcycle,
      });
      await this.companyMotorcycleRepository.save(companyMoto);
    } else if (user.client) {
      const clientMoto = this.clientMotorcycleRepository.create({
        client: user.client,
        motorcycle: savedMotorcycle,
      });
      await this.clientMotorcycleRepository.save(clientMoto);
    }
    return savedMotorcycle;
  }

  async findMotorcyclesForUser(user: User): Promise<Motorcycle[]> {
    if (user.company) {
      const companyMotos = await this.companyMotorcycleRepository.find({
        where: { company: { id: user.company.id } },
        relations: ['motorcycle'],
      });
      return companyMotos.map(cm => cm.motorcycle);
    } else if (user.client) {
      const clientMotos = await this.clientMotorcycleRepository.find({
        where: { client: { id: user.client.id } },
        relations: ['motorcycle'],
      });
      return clientMotos.map(cm => cm.motorcycle);
    }
    return [];
  }
}

import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../../domain/entities/driver.entity';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getDriversByCompany(companyId: string): Promise<Driver[]> {
    return this.driverRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'], // Inclure les détails de la company si nécessaire
      order: { name: "ASC" }
    });
  }

  async updateDriver(driverId: string, companyId: string, updateData: Partial<Driver>): Promise<Driver> {
    // Vérifier si le driver existe
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
      relations: ['company'],
    });

    if (!driver) {
      throw new NotFoundException("Conducteur non trouvé.");
    }

    // Vérifier que l'utilisateur appartient à la même entreprise que le driver
    if (driver.company.id !== companyId) {
      throw new ForbiddenException("Vous n'avez pas le droit de modifier ce conducteur.");
    }

    // Mettre à jour les informations
    Object.assign(driver, updateData);
    await this.driverRepository.save(driver);

    return driver;
  }

  async createDriver(companyId: string, driverData: Partial<Driver>): Promise<Driver> {
    // Vérifier si l'entreprise existe
    const company = await this.companyRepository.findOne({ where: { id: companyId } });

    if (!company) {
      throw new BadRequestException("L'entreprise associée n'existe pas.");
    }

    // Créer + sauvegarder le nouveau conducteur
    const newDriver = this.driverRepository.create({
      ...driverData,
      company, // Associe le conducteur à l'entreprise de l'utilisateur
    });

    return await this.driverRepository.save(newDriver);
  }
}
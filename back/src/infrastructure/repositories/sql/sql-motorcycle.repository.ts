import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class SQLMotorcycleRepository {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly ormRepository: Repository<Motorcycle>,
  ) {}

  async create(motorcycle: Motorcycle): Promise<Motorcycle> {
    return this.ormRepository.save(motorcycle);
  }

  async update(motorcycle: Motorcycle): Promise<Motorcycle> {
    return this.ormRepository.save(motorcycle);
  }

  async findById(id: string): Promise<Motorcycle> {
    // Si votre entité Motorcycle a une relation "intervals" (OneToMany),
    // il est utile de la charger ici :
    const motorcycle = await this.ormRepository.findOne({ 
      where: { id },
      relations: ['intervals']  // Charge la relation "intervals"
    });
    if (!motorcycle) throw new Error('Motorcycle not found');
    return motorcycle;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { User } from '../../domain/entities/user.entity';

export interface MotorcycleRepository {
  /**
   * Crée une moto et enregistre la liaison dans CompanyMotorcycle ou ClientMotorcycle
   * en fonction des informations de l’utilisateur.
   */
  createMotorcycle(motorcycle: Motorcycle, user: User): Promise<Motorcycle>;

  /**
   * Récupère toutes les motos associées à l’utilisateur (par company ou par client).
   */
  findMotorcyclesForUser(user: User): Promise<Motorcycle[]>;

  /**
   * Récupère une moto par son identifiant.
   */
  findById(id: string): Promise<Motorcycle>;

  /**
   * Met à jour une moto.
   */
  update(motorcycle: Motorcycle): Promise<Motorcycle>;

  /**
   * Supprime une moto par son identifiant.
   */
  delete(id: string): Promise<void>;
}

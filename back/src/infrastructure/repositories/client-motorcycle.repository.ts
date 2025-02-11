import { ClientMotorcycle } from '../../domain/entities/client-motorcycle.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

export const CLIENT_MOTORCYCLE_REPOSITORY = 'CLIENT_MOTORCYCLE_REPOSITORY';

export interface ClientMotorcycleRepository {
  /**
   * Enregistre une nouvelle association ClientMotorcycle.
   * @param cm 
   
  create(cm: ClientMotorcycle): Promise<ClientMotorcycle>;

  /**
   * Récupère la liste des motos associées à un client donné.
   * @param clientId 
   */
  findAllByClientId(clientId: string): Promise<Motorcycle[]>;

  /**
   * Récupère une association ClientMotorcycle pour une moto et un client donnés.
    @param motorcycleId 
    @param clientId 
   */
  findOneByMotorcycleAndClient(motorcycleId: string, clientId: string): Promise<ClientMotorcycle | null>;
}
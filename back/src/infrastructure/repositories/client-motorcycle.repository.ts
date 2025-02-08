import { ClientMotorcycle } from '../../domain/entities/client-motorcycle.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

export const CLIENT_MOTORCYCLE_REPOSITORY = 'CLIENT_MOTORCYCLE_REPOSITORY';

export interface ClientMotorcycleRepository {
  /**
   * Enregistre une nouvelle association ClientMotorcycle.
   * @param cm L'objet ClientMotorcycle à créer.
   */
  create(cm: ClientMotorcycle): Promise<ClientMotorcycle>;

  /**
   * Récupère la liste des motos associées à un client donné.
   * @param clientId L'identifiant du client.
   */
  findAllByClientId(clientId: string): Promise<Motorcycle[]>;

  /**
   * Récupère une association ClientMotorcycle pour une moto et un client donnés.
   * @param motorcycleId L'identifiant de la moto.
   * @param clientId L'identifiant du client.
   */
  findOneByMotorcycleAndClient(motorcycleId: string, clientId: string): Promise<ClientMotorcycle | null>;
}
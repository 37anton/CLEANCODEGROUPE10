import { CompanyMotorcycle } from '../../domain/entities/company-motorcycle.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

export const COMPANY_MOTORCYCLE_REPOSITORY = 'COMPANY_MOTORCYCLE_REPOSITORY';

export interface CompanyMotorcycleRepository {
  /**
   * Enregistre une nouvelle association CompanyMotorcycle.
   * @param cm L'objet CompanyMotorcycle à créer.
   */
  create(cm: CompanyMotorcycle): Promise<CompanyMotorcycle>;

  /**
   * Récupère la liste des motos associées à une entreprise donnée.
   * @param companyId L'identifiant de l'entreprise.
   */
  findAllByCompanyId(companyId: string): Promise<Motorcycle[]>;

  /**
   * Récupère une association CompanyMotorcycle pour une moto et une entreprise données.
   * @param motorcycleId L'identifiant de la moto.
   * @param companyId L'identifiant de l'entreprise.
   */
  findOneByMotorcycleAndCompany(motorcycleId: string, companyId: string): Promise<CompanyMotorcycle | null>;
}

import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { OrderRepository, ORDER_REPOSITORY } from '../../infrastructure/repositories/order.repository';
import { User } from 'src/domain/entities/user.entity';
import { Order } from 'src/domain/entities/order.entity';

@Injectable()
export class FindOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository,
  ) {}

  async execute(user: User): Promise<Order[]> {
    const associationId = user.company?.id || user.concession?.id || user.client?.id;
    console.log("ID d'association extrait de l'utilisateur :", associationId);
    if (!associationId) {
      throw new UnauthorizedException("L'utilisateur n'est rattaché à aucune entité.");
    }
    return await this.orderRepository.getOrdersByUser(associationId);
  }
}
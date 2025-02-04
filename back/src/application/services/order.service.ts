import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../domain/entities/order.entity';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getOrdersByUser(user: User): Promise<Order[]> {
    let query = this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.supplier', 'supplier')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.partSupplier', 'partSupplier')
      .leftJoinAndSelect('partSupplier.part', 'part');

    if (user.company) {
      console.log(`🔍 Recherche des commandes pour la company ID: ${user.company.id}`);
      query = query.where('order.companyId = :companyId', { companyId: user.company.id });
    } else if (user.concession) {
      console.log(`🔍 Recherche des commandes pour la concession ID: ${user.concession.id}`);
      query = query.where('order.concessionId = :concessionId', { concessionId: user.concession.id });
    } else if (user.client) {
      console.log(`🔍 Recherche des commandes pour le client ID: ${user.client.id}`);
      query = query.where('order.clientId = :clientId', { clientId: user.client.id });
    } else {
      return [];
    }

    const orders = await query.getMany();
    return orders;
  }
}

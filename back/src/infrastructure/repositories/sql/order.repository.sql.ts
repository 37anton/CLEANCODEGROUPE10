import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../domain/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../order.repository';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class OrderSqlRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["company", "concession", "client"],
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    let query = this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.supplier', 'supplier')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.partSupplier', 'partSupplier')
      .leftJoinAndSelect('partSupplier.part', 'part');

    if (user.company) {
      query = query.where('order.companyId = :companyId', { companyId: user.company.id });
    } else if (user.concession) {
      query = query.where('order.concessionId = :concessionId', { concessionId: user.concession.id });
    } else if (user.client) {
      query = query.where('order.clientId = :clientId', { clientId: user.client.id });
    } else {
      return [];
    }

    return await query.getMany();
  }

  async createOrder(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }
}
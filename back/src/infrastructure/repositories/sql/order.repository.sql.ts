import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from '../../../domain/entities/order.entity';
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

  async getOrdersByUser(userAssociationId: string): Promise<Order[]> {
    let query = this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.supplier', 'supplier')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.partSupplier', 'partSupplier')
      .leftJoinAndSelect('partSupplier.part', 'part');

    query = query.where(
      'order.companyId = :userAssociationId OR order.concessionId = :userAssociationId OR order.clientId = :userAssociationId',
      { userAssociationId }
    );

    return await query.getMany();
}

  async createOrder(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }

  async findAllNotShipped(): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { status: OrderStatus.PENDING },
      relations: [
        "company", 
        "concession", 
        "client",
        "orderItems",
        "orderItems.partSupplier",
        "orderItems.partSupplier.part"
      ],
    });
  }  

  async update(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }

  async findById(id: string): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'supplier', 'company', 'concession', 'client'],
    });
  }
}
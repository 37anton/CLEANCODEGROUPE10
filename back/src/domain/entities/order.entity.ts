import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { Supplier } from './supplier.entity';
import { OrderItem } from './order-item.entity';
import { Company } from './company.entity';
import { Concession } from './concession.entity';
import { Client } from './client.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Supplier, { nullable: false })
  supplier: Supplier;

  @ManyToOne(() => Company, { nullable: true })
  company: Company;

  @ManyToOne(() => Concession, { nullable: true })
  concession: Concession;

  @ManyToOne(() => Client, { nullable: true })
  client: Client;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'timestamp' })
  expectedDeliveryDate: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

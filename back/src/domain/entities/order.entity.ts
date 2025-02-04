import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from "typeorm";
import { Supplier } from "./supplier.entity";
import { OrderItem } from "./order-item.entity";
import { Company } from "./company.entity";
import { Concession } from "./concession.entity";
import { Client } from "./client.entity";

export enum OrderStatus {
  PENDING = "En attente",
  SHIPPED = "Expédié",
  DELIVERED = "Livré",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Supplier, { nullable: false })
  supplier: Supplier; // Fournisseur auprès duquel la commande est passée

  @ManyToOne(() => Company, { nullable: true })
  company?: Company; // Une entreprise peut passer une commande

  @ManyToOne(() => Concession, { nullable: true })
  concession?: Concession; // Une concession peut passer une commande

  @ManyToOne(() => Client, { nullable: true })
  client?: Client; // Un client peut aussi passer une commande

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[]; // Liste des pièces commandées

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus; // Statut de la commande

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  totalPrice: number; // Prix total de la commande

  @Column({ type: "timestamp", nullable: true })
  expectedDeliveryDate: Date; // Date de livraison prévue
}
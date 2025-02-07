import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PartSupplier } from "./part-supplier.entity";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  deliveryTime: number; // Délai de livraison en minutes (pour que les status changent rapidement via le cron)

  @Column()
  city: string;

  @OneToMany(() => PartSupplier, (partSupplier) => partSupplier.supplier)
  partSuppliers: PartSupplier[];
}
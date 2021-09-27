import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatusEnum } from '../../enum/order-status.enum';
import { Cart } from '../cart/cart.entity';

@Entity()
export class Order {
  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  orderId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  orderStatus: OrderStatusEnum;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}

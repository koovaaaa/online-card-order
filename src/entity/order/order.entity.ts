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
  @PrimaryGeneratedColumn()
  orderId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: OrderStatusEnum.PENDING })
  orderStatus: OrderStatusEnum;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}

import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';
import { CartTicket } from '../cart-ticket/cart-ticket.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  createdBy: User;

  @OneToMany(() => CartTicket, (cartTicket) => cartTicket.cart)
  cartTickets: CartTicket[];

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}

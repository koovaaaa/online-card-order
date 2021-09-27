import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Ticket } from '../ticket/ticket.entity';

@Index(['cart', 'ticket'], { unique: true })
@Entity()
export class CartTicket {
  constructor(partial: Partial<CartTicket>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  cartTicketId: number;

  @ManyToOne(() => Cart)
  cart: Cart;

  @ManyToOne(() => Ticket)
  @JoinColumn()
  ticket: Ticket;

  @Column()
  quantity: number;
}

import {
  Column,
  Entity,
  Index,
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
  ticket: Ticket;

  @Column()
  quantity: number;
}

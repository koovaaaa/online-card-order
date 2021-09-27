import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Cart {
  constructor(partial: Partial<Cart>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  cartId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  createdBy: User;
}

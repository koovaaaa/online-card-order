import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '../event/event.entity';
import { User } from '../user/user.entity';

@Entity()
export class Ticket {
  constructor(partial: Partial<Ticket>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  ticketId: number;

  @Column()
  ticketName: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Event)
  event: Event;

  @Column('decimal', { precision: 10, scale: 2 })
  ticketPrice: number;

  @Column({ unsigned: true })
  ticketCount: number;

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  editedBy: User;

  @UpdateDateColumn({ default: null })
  editedAt: Date;
}

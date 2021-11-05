import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { City } from '../city/city.entity';
import { Country } from '../country/country.entity';

@Entity()
export class Event {
  constructor(partial: Partial<Event>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  eventId: number;

  @Column()
  eventName: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  eventDate: Date;

  @Column()
  address: string;

  @ManyToOne(() => City)
  city: City;

  @ManyToOne(() => Country)
  country: Country;

  @Column()
  eventPhoto: string;

  @Column({ default: null })
  changedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  changedBy: User;
}

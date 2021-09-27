import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from '../../enum/user-role.enum';
import { City } from '../city/city.entity';
import { Country } from '../country/country.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({ default: null })
  @Exclude()
  lastPasswordChangeAt: Date;

  @Column({ default: 0 })
  @Exclude()
  passwordChangeCounter: number;

  @Column({ default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Column()
  address: string;

  @Column()
  contactPhone: string;

  @ManyToOne(() => City)
  city: City;

  @ManyToOne(() => Country)
  country: Country;

  @CreateDateColumn()
  registeredAt: Date;
}

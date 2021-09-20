import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEnum } from '../../enum/category.enum';
import { User } from '../user/user.entity';

@Entity()
export class Category {
  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: CategoryEnum;

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;
}

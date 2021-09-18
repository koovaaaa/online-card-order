import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../country/country.entity';

@Entity()
export class City {
  constructor(partial: Partial<City>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  cityId: number;

  @Column()
  cityName: string;

  @Column()
  postalCode: string;

  @ManyToOne(() => Country)
  country: Country;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CurrencyEnum } from '../../enum/currency.enum';
import { CountryNameEnum } from '../../enum/country.enum';

@Entity()
export class Country {
  constructor(partial: Partial<Country>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  countryId: number;

  @Column({ unique: true })
  countryName: CountryNameEnum;

  @Column()
  currency: CurrencyEnum;

  @Column('decimal', { precision: 10, scale: 2 })
  baseForConversionToBAM: number;
}

import { EntityRepository, Repository } from 'typeorm';
import { Country } from '../../entity/country/country.entity';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {}

import { EntityRepository, Repository } from 'typeorm';
import { City } from '../../entity/country/city.entity';

@EntityRepository(City)
export class CityRepository extends Repository<City> {}

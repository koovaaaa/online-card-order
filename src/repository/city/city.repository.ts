import { EntityRepository, Repository } from 'typeorm';
import { City } from '../../entity/city/city.entity';

@EntityRepository(City)
export class CityRepository extends Repository<City> {}

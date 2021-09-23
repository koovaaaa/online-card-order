import { Injectable } from '@nestjs/common';
import { Country } from '../../../entity/country/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryRepository } from '../../../repository/country/country.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { City } from '../../../entity/city/city.entity';
import { CityRepository } from '../../../repository/city/city.repository';

@Injectable()
export class UserPlaceService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: CountryRepository,
    @InjectRepository(City)
    private readonly cityRepository: CityRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getCountries(): Promise<Country[]> {
    try {
      return await this.countryRepository.find();
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getCities(): Promise<City[]> {
    try {
      return await this.cityRepository.find();
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getCitiesFromCountry(countryId: string): Promise<City[]> {
    try {
      return await this.cityRepository.find({
        where: { country: countryId },
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}

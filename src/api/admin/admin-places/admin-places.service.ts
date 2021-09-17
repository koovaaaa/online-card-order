import { Injectable } from '@nestjs/common';
import { AddCountryAdminDto } from './dto/add-country.admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../../entity/country/country.entity';
import { CountryRepository } from '../../../repository/country/country.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { EditCountryAdminDto } from './dto/edit-country.admin.dto';
import { AddCityAdminDto } from './dto/add-city.admin.dto';
import { City } from '../../../entity/country/city.entity';
import { CityRepository } from '../../../repository/country/city.repository';

@Injectable()
export class AdminPlacesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: CountryRepository,
    @InjectRepository(City)
    private readonly cityRepository: CityRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getAllCountries() {
    try {
      return this.countryRepository.find();
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async addNewCountry(createNewCountry: AddCountryAdminDto): Promise<Country> {
    try {
      const country = new Country(createNewCountry);
      return await this.countryRepository.save(country);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async editCountry(
    countryId: string,
    editCountry: EditCountryAdminDto,
  ): Promise<Country> {
    try {
      let country = await this.countryRepository.findOneOrFail(countryId);
      country = { ...country, ...editCountry };
      await this.countryRepository.update(countryId, country);
      return country;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async addCity(addCity: AddCityAdminDto) {
    try {
      const city = new City(addCity);
      return await this.cityRepository.save(city);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}

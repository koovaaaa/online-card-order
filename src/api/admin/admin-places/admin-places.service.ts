import { Injectable } from '@nestjs/common';
import { CreateCountryAdminDto } from './dto/create-country.admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../../../entity/country/country.entity';
import { CountryRepository } from '../../../repository/country/country.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { EditCountryAdminDto } from './dto/edit-country.admin.dto';

@Injectable()
export class AdminPlacesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: CountryRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async addNewCountry(
    createNewCountry: CreateCountryAdminDto,
  ): Promise<Country> {
    try {
      const country = new Country(createNewCountry);
      return await this.countryRepository.save(country);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async editCountry(countryId: string, editCountry: EditCountryAdminDto) {
    try {
      let country = await this.countryRepository.findOneOrFail(countryId);
      country = { ...country, ...editCountry };
      await this.countryRepository.update(countryId, country);
      return country;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}

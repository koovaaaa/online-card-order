import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminPlacesService } from './admin-places.service';
import { AddCountryAdminDto } from './dto/add-country.admin.dto';
import { Country } from '../../../entity/country/country.entity';
import { EditCountryAdminDto } from './dto/edit-country.admin.dto';
import { AddCityAdminDto } from './dto/add-city.admin.dto';
import { AddCitiesAdminDto } from './dto/add-cities.admin.dto';
import { EditCityAdminDto } from './dto/edit-city.admin.dto';
import { City } from '../../../entity/country/city.entity';

@ApiTags('Admin Places')
@Controller('admin/places')
export class AdminPlacesController {
  constructor(private readonly adminPlacesService: AdminPlacesService) {}
  @Get('country/get-countries')
  async getAllCountries() {
    return await this.adminPlacesService.getAllCountries();
  }

  @Post('country/add-country')
  async addNewCountry(
    @Body() createNewCountry: AddCountryAdminDto,
  ): Promise<Country> {
    return await this.adminPlacesService.addNewCountry(createNewCountry);
  }

  @Put('country/edit-country/:id')
  async editCountry(
    @Param('id') countryId: string,
    @Body() editCountry: EditCountryAdminDto,
  ): Promise<Country> {
    return await this.adminPlacesService.editCountry(countryId, editCountry);
  }

  @Get('city/get-cities')
  async getAllCities(): Promise<City[]> {
    return await this.adminPlacesService.getAllCities();
  }

  @Post('city/add-city')
  async addNewCity(@Body() addCity: AddCityAdminDto): Promise<City> {
    return await this.adminPlacesService.addCity(addCity);
  }

  @Post('city/add-cities')
  async addNewCities(@Body() newCities: AddCitiesAdminDto): Promise<City[]> {
    return await this.adminPlacesService.addCities(newCities);
  }

  @Put('city/edit-city/:id')
  async editCity(
    @Param('id') cityId: string,
    @Body() editCity: EditCityAdminDto,
  ): Promise<City> {
    return await this.adminPlacesService.editCity(cityId, editCity);
  }
}

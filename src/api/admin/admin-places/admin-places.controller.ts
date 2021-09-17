import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminPlacesService } from './admin-places.service';
import { CreateCountryAdminDto } from './dto/create-country.admin.dto';
import { Country } from '../../../entity/country/country.entity';
import { EditCountryAdminDto } from './dto/edit-country.admin.dto';

@ApiTags('Admin Places')
@Controller('admin/places')
export class AdminPlacesController {
  constructor(private readonly adminPlacesService: AdminPlacesService) {}
  @Get('get-countries')
  getAllCountries() {
    return 'test';
  }

  @Post('add-country')
  async addNewCountry(
    @Body() createNewCountry: CreateCountryAdminDto,
  ): Promise<Country> {
    return await this.adminPlacesService.addNewCountry(createNewCountry);
  }

  @Put('edit-country/:id')
  async editCountry(
    @Param('id') countryId: string,
    @Body() editCountry: EditCountryAdminDto,
  ) {
    return await this.adminPlacesService.editCountry(countryId, editCountry);
  }
}

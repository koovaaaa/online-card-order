import { Controller, Get, Param } from '@nestjs/common';
import { UserPlaceService } from './user-place.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Event Place')
@Controller('user-place')
export class UserPlaceController {
  constructor(private readonly userPlaceService: UserPlaceService) {}

  @Get('get-countries')
  async getCountries() {
    return await this.userPlaceService.getCountries();
  }

  @Get('get-cities')
  async getCities() {
    return await this.userPlaceService.getCities();
  }

  @Get('get-cities/:countryId')
  async getCitiesFromCountry(@Param('countryId') countryId: string) {
    return await this.userPlaceService.getCitiesFromCountry(countryId);
  }
}

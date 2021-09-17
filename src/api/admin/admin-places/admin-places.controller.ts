import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Places')
@Controller('admin/places')
export class AdminPlacesController {
  @Get('get-countries')
  getAllCountries() {
    return 'test';
  }
}

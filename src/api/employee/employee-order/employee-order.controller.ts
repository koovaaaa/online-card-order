import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employee Order')
@Controller('employee-order')
export class EmployeeOrderController {
  @Get()
  testRoute() {
    return 'asd';
  }
}

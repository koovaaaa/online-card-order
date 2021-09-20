import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employee Event')
@Controller('employee-event')
export class EmployeeEventController {
  @Get()
  getAllEvents() {
    return 'asd';
  }
}

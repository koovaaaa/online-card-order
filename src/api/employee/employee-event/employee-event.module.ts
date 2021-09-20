import { Module } from '@nestjs/common';
import { EmployeeEventController } from './employee-event.controller';
import { EmployeeEventService } from './employee-event.service';

@Module({
  controllers: [EmployeeEventController],
  providers: [EmployeeEventService]
})
export class EmployeeEventModule {}

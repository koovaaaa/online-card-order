import { Module } from '@nestjs/common';
import { EmployeeEventModule } from './employee-event/employee-event.module';

@Module({
  imports: [EmployeeEventModule]
})
export class EmployeeModule {}

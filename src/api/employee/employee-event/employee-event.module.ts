import { Module } from '@nestjs/common';
import { EmployeeEventController } from './employee-event.controller';
import { EmployeeEventService } from './employee-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../../entity/event/event.entity';
import { ExceptionService } from '../../../helper/services/exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EmployeeEventController],
  providers: [EmployeeEventService, ExceptionService],
})
export class EmployeeEventModule {}

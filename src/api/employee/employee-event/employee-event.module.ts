import { Module } from '@nestjs/common';
import { EmployeeEventController } from './employee-event.controller';
import { EmployeeEventService } from './employee-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../../entity/event/event.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { PaginationService } from '../../../helper/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EmployeeEventController],
  providers: [EmployeeEventService, ExceptionService, PaginationService],
})
export class EmployeeEventModule {}

import { Module } from '@nestjs/common';
import { UserOrderController } from './user-order.controller';
import { UserOrderService } from './user-order.service';
import { ExceptionService } from '../../../helper/services/exception.service';

@Module({
  controllers: [UserOrderController],
  providers: [UserOrderService, ExceptionService],
})
export class UserOrderModule {}

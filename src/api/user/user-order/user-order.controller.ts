import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { UserOrderService } from './user-order.service';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../../entity/user/user.entity';
import { Order } from '../../../entity/order/order.entity';
import { ChangeValueInterceptor } from '../../../interceptor/change-value.interceptor';

@ApiTags('User Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  @Post('make-order')
  async makeOrder(@GetUser() user: User): Promise<Order> {
    return await this.userOrderService.makeOrder(user);
  }

  @Get('my-orders')
  @UseInterceptors(ChangeValueInterceptor)
  async getMyOrders(@GetUser() user: User) {
    return await this.userOrderService.getMyOrders(user);
  }
}

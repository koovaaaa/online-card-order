import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { UserOrderService } from './user-order.service';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../../entity/user/user.entity';
import { Order } from '../../../entity/order/order.entity';

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
  async getMyOrders(@GetUser() user: User) {
    return await this.userOrderService.getMyOrders(user);
  }
}

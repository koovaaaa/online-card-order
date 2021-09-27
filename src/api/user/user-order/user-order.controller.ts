import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { UserOrderService } from './user-order.service';

@ApiTags('User Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}
}

import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserCartService } from './user-cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../../entity/user/user.entity';
import { Cart } from '../../../entity/cart/cart.entity';
import { AddTicketToCartDto } from './dto/add-ticket-to-cart.dto';
import { EditCartDto } from './dto/edit-cart.dto';

@ApiTags('User Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-cart')
export class UserCartController {
  constructor(private readonly userCartService: UserCartService) {}

  @Get('get-current-cart')
  async getCurrentCart(@GetUser() user: User): Promise<Cart> {
    return await this.userCartService.getCurrentActiveCart(user);
  }

  @Post('add-ticket')
  async addTicketToCart(
    @Body() ticketData: AddTicketToCartDto,
    @GetUser() user: User,
  ): Promise<Cart> {
    return await this.userCartService.addTicketToCart(user, ticketData);
  }

  @Put('edit-cart')
  async editCart(
    @Body() ticketData: EditCartDto,
    @GetUser() user: User,
  ): Promise<Cart> {
    return await this.userCartService.editCart(ticketData, user);
  }
}

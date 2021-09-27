import { Controller } from '@nestjs/common';
import { UserCartService } from './user-cart.service';

@Controller('user-cart')
export class UserCartController {
  constructor(private readonly userCartService: UserCartService) {}
}

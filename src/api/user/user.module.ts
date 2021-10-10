import { Module } from '@nestjs/common';
import { UserEventModule } from './user-event/user-event.module';
import { UserTicketModule } from './user-ticket/user-ticket.module';
import { UserPlaceModule } from './user-place/user-place.module';
import { UserCartModule } from './user-cart/user-cart.module';
import { UserOrderModule } from './user-order/user-order.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [
    UserEventModule,
    UserTicketModule,
    UserPlaceModule,
    UserCartModule,
    UserOrderModule,
    UserProfileModule,
  ],
})
export class UserModule {}

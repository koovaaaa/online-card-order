import { Module } from '@nestjs/common';
import { UserEventModule } from './user-event/user-event.module';
import { UserTicketModule } from './user-ticket/user-ticket.module';
import { UserPlaceModule } from './user-place/user-place.module';

@Module({
  imports: [UserEventModule, UserTicketModule, UserPlaceModule]
})
export class UserModule {}

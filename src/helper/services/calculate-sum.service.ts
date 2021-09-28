import { Injectable } from '@nestjs/common';
import { Cart } from '../../entity/cart/cart.entity';
import { User } from '../../entity/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user/user.repository';

@Injectable()
export class CalculateSumService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}
  async calculateSum(cart: Cart, user: User, isCart: boolean): Promise<string> {
    let sum = 0;
    const userDb = await this.userRepository.findOneOrFail(user.userId, {
      relations: ['country'],
    });

    for (const cartTicket of cart.cartTickets) {
      sum += cartTicket.quantity * cartTicket.ticket.ticketPrice;
    }

    if (isCart) {
      return (
        (sum * userDb.country.baseForConversionToBAM).toFixed(2).toString() +
        ' ' +
        userDb.country.currency
      );
    }

    return sum.toString();
  }
}

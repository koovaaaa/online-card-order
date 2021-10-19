import { ConflictException, Injectable } from '@nestjs/common';
import { ExceptionService } from '../../../helper/services/exception.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../entity/order/order.entity';
import { OrderRepository } from '../../../repository/order/order.repository';
import { User } from '../../../entity/user/user.entity';
import { Cart } from '../../../entity/cart/cart.entity';
import { CartRepository } from '../../../repository/cart/cart.repository';
import { UserCartService } from '../user-cart/user-cart.service';
import { CalculateSumService } from '../../../helper/services/calculate-sum.service';
import { MailService } from '../../../mail/mail.service';

@Injectable()
export class UserOrderService {
  constructor(
    private readonly exceptionService: ExceptionService,
    //@InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
    private readonly userCartService: UserCartService,
    private readonly calculateSumService: CalculateSumService,
    private readonly mailService: MailService,
  ) {}

  async makeOrder(user: User): Promise<Order> {
    try {
      const { cart } = await this.userCartService.getCurrentActiveCart(user);

      const order = await this.orderRepository.findOne({
        where: { cart: cart },
      });
      await this.checkIfOrderExist(order);
      await this.checkIfCartEmpty(cart.cartTickets.length);

      let newOrder = new Order();
      newOrder.cart = cart;

      const sum = await this.calculateSumService.calculateSum(
        cart,
        user,
        false,
      );
      newOrder.orderPrice = parseFloat(sum);

      newOrder = await this.orderRepository.save(newOrder);
      await this.cartRepository.update(cart.cartId, {
        order: newOrder,
      });

      await this.mailService.sendMailForReceivedOrder(
        user.email,
        user.name,
        user.surname,
      );

      return newOrder;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getMyOrders(user: User) {
    try {
      return await this.orderRepository.getMyOrders(user);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  checkIfOrderExist(order: Order) {
    if (order) throw new ConflictException('Narudzba vec postoji!');
  }

  checkIfCartEmpty(counter: number) {
    if (counter === 0) throw new ConflictException('Korpa je prazna');
  }
}

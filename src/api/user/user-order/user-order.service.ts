import { ConflictException, Injectable } from '@nestjs/common';
import { ExceptionService } from '../../../helper/services/exception.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../entity/order/order.entity';
import { OrderRepository } from '../../../repository/order/order.repository';
import { User } from '../../../entity/user/user.entity';
import { Cart } from '../../../entity/cart/cart.entity';
import { CartRepository } from '../../../repository/cart/cart.repository';
import { UserCartService } from '../user-cart/user-cart.service';

@Injectable()
export class UserOrderService {
  constructor(
    private readonly exceptionService: ExceptionService,
    //@InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
    private readonly userCartService: UserCartService,
  ) {}

  async makeOrder(user: User): Promise<Order> {
    try {
      const activeCart = await this.userCartService.getCurrentActiveCart(user);
      const order = await this.orderRepository.findOne({
        where: { cart: activeCart },
      });
      await this.checkIfOrderExist(order);
      await this.checkIfCartEmpty(activeCart.cartTickets.length);

      let newOrder = new Order();
      newOrder.cart = activeCart;

      newOrder = await this.orderRepository.save(newOrder);
      await this.cartRepository.update(activeCart.cartId, {
        order: newOrder,
      });

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

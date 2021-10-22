import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../../entity/cart/cart.entity';
import { CartRepository } from '../../../repository/cart/cart.repository';
import { CartTicket } from '../../../entity/cart-ticket/cart-ticket.entity';
import { CartTicketRepository } from '../../../repository/cart-ticket/cart-ticket.repository';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { User } from '../../../entity/user/user.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { AddTicketToCartDto } from './dto/add-ticket-to-cart.dto';
import { EditCartDto } from './dto/edit-cart.dto';
import { TicketRepository } from '../../../repository/ticket/ticketRepository';
import { CalculateSumService } from '../../../helper/services/calculate-sum.service';

@Injectable()
export class UserCartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartTicket)
    private readonly cartTicketRepository: CartTicketRepository,
    @InjectRepository(Ticket)
    private readonly ticketRepository: TicketRepository,
    private readonly exceptionService: ExceptionService,
    private readonly calculateSumService: CalculateSumService,
  ) {}

  async getCurrentActiveCart(
    user: User,
  ): Promise<{ cart: Cart; totalPrice: string }> {
    try {
      const carts = await this.cartRepository.find({
        where: { createdBy: user },
        relations: [
          'order',
          'cartTickets',
          'cartTickets.ticket',
          'cartTickets.ticket.event',
        ],
        order: { createdAt: 'DESC' },
        take: 1,
      });

      if (carts.length === 0) return null;
      const cart = carts[0];
      if (cart.order != null) return null;

      const sum = await this.calculateSumService.calculateSum(cart, user, true);

      return { cart, totalPrice: sum };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async addTicketToCart(
    user: User,
    ticketData: AddTicketToCartDto,
  ): Promise<{ cart: Cart; totalPrice: string }> {
    try {
      let currentCartWithPrice = await this.getCurrentActiveCart(user);
      if (!(currentCartWithPrice && currentCartWithPrice.cart)) {
        currentCartWithPrice = { cart: null, totalPrice: '' };
        currentCartWithPrice.cart = await this.createNewCart(user);
      }

      let cartTicket = await this.findExistCartTicket(
        currentCartWithPrice.cart,
        ticketData.ticket,
      );

      if (!cartTicket) {
        cartTicket = new CartTicket(ticketData);
        cartTicket.cart = currentCartWithPrice.cart;
      } else {
        cartTicket.quantity += ticketData.quantity;
      }

      const ticket = await this.ticketRepository.findOneOrFail({
        where: { ticketId: ticketData.ticket },
      });

      await this.checkIfNumberOfAvailableTicketEnough(
        ticket.ticketCount,
        cartTicket.quantity,
      );

      await this.cartTicketRepository.save(cartTicket);

      return await this.getCartById(currentCartWithPrice.cart.cartId, user);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async createNewCart(user: User) {
    try {
      const newCart = new Cart();
      newCart.createdBy = user;
      return await this.cartRepository.save(newCart);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getCartById(id: number, user: User) {
    try {
      const cart = await this.cartRepository.findOneOrFail(id, {
        relations: [
          'cartTickets',
          'cartTickets.ticket',
          'cartTickets.ticket.event',
        ],
      });

      const sum = await this.calculateSumService.calculateSum(cart, user, true);

      return { cart, totalPrice: sum };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async findExistCartTicket(
    cart: Cart,
    ticket: Ticket,
  ): Promise<CartTicket | null> {
    try {
      return await this.cartTicketRepository.findOneOrFail({
        cart,
        ticket,
      });
    } catch {
      return null;
    }
  }

  async editCart(
    ticketData: EditCartDto,
    user: User,
  ): Promise<{ cart: Cart; totalPrice: string }> {
    try {
      const { cart } = await this.getCurrentActiveCart(user);
      const cartTicket = await this.findExistCartTicket(
        cart,
        ticketData.ticket,
      );
      if (cartTicket) {
        cartTicket.quantity = ticketData.quantity;

        if (cartTicket.quantity === 0)
          await this.cartTicketRepository.delete(cartTicket.cartTicketId);
        else await this.cartTicketRepository.save(cartTicket);
      }

      return await this.getCartById(cart.cartId, user);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async checkIfNumberOfAvailableTicketEnough(
    numberOfTicket: number,
    orderedTicket: number,
  ) {
    if (orderedTicket > numberOfTicket) {
      throw new ConflictException('Trazeni broj karata nije dostupan!');
    }
  }
}

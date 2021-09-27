import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserCartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartTicket)
    private readonly cartTicketRepository: CartTicketRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async getCurrentActiveCart(user: User): Promise<Cart> {
    try {
      const carts = await this.cartRepository.find({
        where: { createdBy: user },
        relations: ['order', 'cartTickets', 'cartTickets.ticket'],
        order: { createdAt: 'DESC' },
        take: 1,
      });

      if (carts.length === 0) return null;
      const cart = carts[0];
      if (cart.order != null) return null;

      return cart;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async addTicketToCart(
    user: User,
    ticketData: AddTicketToCartDto,
  ): Promise<Cart> {
    try {
      let cart = await this.getCurrentActiveCart(user);
      if (!cart) cart = await this.createNewCart(user);

      let cartTicket = await this.findExistCartTicket(cart, ticketData.ticket);

      if (!cartTicket) {
        cartTicket = new CartTicket(ticketData);
        cartTicket.cart = cart;
      } else {
        cartTicket.quantity += ticketData.quantity;
      }

      await this.cartTicketRepository.save(cartTicket);

      return await this.getCartById(cart.cartId);
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

  async getCartById(id: number) {
    try {
      return await this.cartRepository.findOneOrFail(id, {
        relations: ['cartTickets', 'cartTickets.ticket'],
      });
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

  async editCart(ticketData: EditCartDto, user: User): Promise<Cart> {
    try {
      const cart = await this.getCurrentActiveCart(user);
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

      return await this.getCartById(cart.cartId);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}

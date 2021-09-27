import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../../entity/order/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}

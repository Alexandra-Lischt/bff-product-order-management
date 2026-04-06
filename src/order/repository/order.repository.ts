import { EntityManager } from 'typeorm';
import { Order } from '../entity/order.entity';

export abstract class IOrderRepository {
  abstract findAll(): Promise<Order[]>;
  abstract create(order: Order, manager: EntityManager): Promise<Order>;
}

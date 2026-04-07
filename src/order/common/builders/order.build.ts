import { Order } from '../../entity/order.entity';
import { User } from '../../../user/entity/user.entity';
import { OrderItem } from '../../entity/order-items.entity';

export class OrderBuilder {
  private order: Order;

  constructor() {
    this.order = new Order();
  }

  withUser(user: User): OrderBuilder {
    this.order.user = user;
    return this;
  }

  withItems(items: OrderItem[]): OrderBuilder {
    this.order.items = items;
    return this;
  }

  withTotalPrice(totalPrice: number): OrderBuilder {
    this.order.totalPrice = totalPrice;
    return this;
  }

  withStatus(status: string): OrderBuilder {
    this.order.status = status;
    return this;
  }

  build(): Order {
    if (!this.order.user) {
      throw new Error('User is required');
    }
    if (!this.order.items || this.order.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }
    return this.order;
  }
}

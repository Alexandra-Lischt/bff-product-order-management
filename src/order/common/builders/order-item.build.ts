import { OrderItem } from '../../entity/order-items.entity';
import { Product } from '../../../product/entity/product.entity';

export class OrderItemBuilder {
  private orderItem: OrderItem;

  constructor() {
    this.orderItem = new OrderItem();
  }

  withProduct(product: Product): OrderItemBuilder {
    this.orderItem.product = product;
    return this;
  }

  withQuantity(quantity: number): OrderItemBuilder {
    this.orderItem.quantity = quantity;
    return this;
  }

  withPriceAtPurchase(price: number): OrderItemBuilder {
    this.orderItem.priceAtPurchase = price;
    return this;
  }

  build(): OrderItem {
    if (!this.orderItem.product) {
      throw new Error('Product is required');
    }
    if (!this.orderItem.quantity || this.orderItem.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    return this.orderItem;
  }
}

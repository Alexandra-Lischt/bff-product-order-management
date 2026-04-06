import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IOrderRepository } from './repository/order.repository';
import { OrderResponseDto } from './dto/order-response.dto';
import { User } from '../user/entity/user.entity';
import { Product } from '../product/entity/product.entity';
import { OrderItem } from './entity/order-items.entity';
import { Order } from './entity/order.entity';
import { OrderMapper } from './common/order.mapper';

@Injectable()
export class OrderService {
  constructor(
    @Inject(IOrderRepository)
    private repository: IOrderRepository,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<OrderResponseDto[]> {
    const orders: Order[] = await this.repository.findAll();
    return OrderMapper.toResponseList(orders);
  }

  async create(
    userId: string,
    itemsData: { productId: string; quantity: number }[],
  ): Promise<OrderResponseDto> {
    // A transação DEVE começar aqui no Service para garantir o estoque
    return await this.dataSource.transaction(async (manager) => {
      // 1. Buscas e Validações (User e Products) usando o 'manager'
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      let totalOrderPrice = 0;
      const orderItems: OrderItem[] = [];

      for (const item of itemsData) {
        const product = await manager.findOne(Product, {
          where: { id: item.productId },
        });
        if (!product)
          throw new NotFoundException(`Product ${item.productId} not found`);

        if (product.stockQuantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for ${product.name}`,
          );
        }

        // 2. Atualiza estoque no banco
        product.stockQuantity -= item.quantity;
        await manager.save(product);

        // 3. Monta o item do pedido
        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.quantity = item.quantity;
        orderItem.priceAtPurchase = product.price;

        totalOrderPrice += Number(product.price) * item.quantity;
        orderItems.push(orderItem);
      }

      // 4. Monta a Entidade Order
      const order = new Order();
      order.user = user;
      order.items = orderItems;
      order.totalPrice = totalOrderPrice;
      order.status = 'PAID';

      // 5. CHAMA O REPOSITÓRIO PASSANDO O MANAGER
      // O repositório fará o salvamento e o mapeamento manual para DTO
      const savedOrder = await this.repository.create(order, manager);
      return OrderMapper.toResponse(savedOrder);
    });
  }
}

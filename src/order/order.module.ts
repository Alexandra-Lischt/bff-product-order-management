import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { IOrderRepository } from './repository/order.repository';
import { OrderTypeOrmRepository } from './repository/order-typeorm.repository';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-items.entity';
import { Product } from '../product/entity/product.entity';
import { User } from '../user/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, User]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: IOrderRepository,
      useClass: OrderTypeOrmRepository,
    },
  ],
})
export class OrderModule {}

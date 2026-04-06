import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IProductRepository } from './repository/product.repository';
import { ProductTypeOrmRepository } from './repository/product-typeorm.repository';
import { AuthModule } from '../auth/auth.module';
import { Product } from './entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: IProductRepository,
      useClass: ProductTypeOrmRepository,
    },
  ],
})
export class ProductModule {}

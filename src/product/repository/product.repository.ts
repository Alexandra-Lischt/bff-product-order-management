import { ProductResponseDto } from '../dto/product-response.dto';
import { Product } from '../entity/product.entity';

export abstract class IProductRepository {
  abstract findAll(): Promise<ProductResponseDto[]>;
  abstract findById(id: string): Promise<ProductResponseDto | null>;
  abstract create(product: Product): Promise<ProductResponseDto>;
  abstract update(id: string, product: Product): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

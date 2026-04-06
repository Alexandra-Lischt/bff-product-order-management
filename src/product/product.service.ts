import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductResponseDto } from './dto/product-response.dto';
import { IProductRepository } from './repository/product.repository';
import { ProductMapper } from './common/product.mapper';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly repository: IProductRepository,
  ) {}

  async findAll(): Promise<ProductResponseDto[]> {
    return await this.repository.findAll();
  }

  async create(product: Product): Promise<ProductResponseDto> {
    const newProduct = await this.repository.create(product);
    return ProductMapper.toResponse(newProduct);
  }

  async update(id: string, product: Product): Promise<void> {
    const existingProduct = await this.repository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found. `);
    }
    await this.repository.update(id, product);
  }

  async delete(id: string): Promise<void> {
    const existingProduct = await this.repository.findById(id);

    if (!existingProduct) {
      throw new BadRequestException(`Product with ID ${id} not found.`);
    }
    await this.repository.delete(id);
  }
}

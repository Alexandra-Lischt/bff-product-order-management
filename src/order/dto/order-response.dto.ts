import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../product/dto/product-response.dto';
import { Type } from 'class-transformer';
export class OrderResponseDto {
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  id!: string;

  @ApiProperty({ example: 100.8 })
  totalPrice!: number;

  @ApiProperty({ example: 'PENDING' })
  status!: string;

  @ApiProperty({ type: () => ProductResponseDto, isArray: true })
  @Type(() => ProductResponseDto)
  products!: ProductResponseDto[];

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  createdAt!: Date;
}

import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    example: 'product-uuid',
  })
  id!: string;

  @ApiProperty({ example: 'Keyboard' })
  name!: string;

  @ApiProperty({ example: 'Peripherals' })
  category!: string;

  @ApiProperty({ example: 'Keyboard Logitech' })
  description!: string;

  @ApiProperty({ example: 39.8 })
  price!: number;

  @ApiProperty({ example: 5 })
  stockQuantity!: number;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  updatedAt!: Date;
}

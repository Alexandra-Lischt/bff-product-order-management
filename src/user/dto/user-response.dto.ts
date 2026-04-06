import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  id!: string;

  @ApiProperty({ example: 'John' })
  name!: string;

  @ApiProperty({ example: 'email@email.com' })
  email!: string;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  createdAt!: Date;
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get orders. ' })
  @ApiOkResponse({ type: OrderResponseDto, isArray: true })
  async findAll(): Promise<OrderResponseDto[]> {
    return this.orderService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create order. ' })
  @ApiCreatedResponse({ type: OrderResponseDto })
  async create(
    @Body() order: CreateOrderDto,
    @Request() req: { user: { sub: string } },
  ): Promise<OrderResponseDto> {
    const userId = req.user.sub;
    return this.orderService.create(userId, order.items);
  }
}

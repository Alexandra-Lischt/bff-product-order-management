import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { IOrderRepository } from './order.repository';
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderTypeOrmRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ormRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.ormRepository.find({
      relations: ['items', 'items.product'],
    });
  }

  async create(order: Order, manager: EntityManager): Promise<Order> {
    const repository = manager.getRepository(Order);
    return await repository.save(order);
  }
}

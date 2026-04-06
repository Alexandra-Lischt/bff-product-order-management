import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entity/order.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}

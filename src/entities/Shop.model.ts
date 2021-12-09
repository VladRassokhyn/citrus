import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.model';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_1c: string;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column('text')
  region: string;

  @OneToMany(() => User, (user) => user.shop)
  @JoinTable()
  users: User[];
}

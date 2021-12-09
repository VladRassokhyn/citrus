import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Shop } from './Shop.model';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @ManyToOne(() => Shop, (shop) => shop.users)
  @JoinTable()
  shop: Shop;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

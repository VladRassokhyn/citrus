import { User } from './User.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  passed: boolean;

  @Column()
  creatorId: number;

  @Column()
  passerId: number;

  @Column()
  managerId: number;

  @Column()
  mark: number;

  @Column()
  maxMark: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Category, (category) => category.checklist)
  @JoinTable()
  categories: Category[];
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Checklist, (checklist) => checklist.categories, {
    onDelete: 'CASCADE',
  })
  checklist: Checklist;

  @OneToMany(() => Field, (field) => field.category)
  @JoinTable()
  fields: Field[];
}

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  checked: boolean;

  @ManyToOne(() => Category, (category) => category.fields, {
    onDelete: 'CASCADE',
  })
  category: Category;
}

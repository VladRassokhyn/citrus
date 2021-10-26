import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  passed: boolean;

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

  @ManyToOne(() => Checklist, (checklist) => checklist.categories)
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

  @ManyToOne(() => Category, (category) => category.fields)
  category: Category;
}

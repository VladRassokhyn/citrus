import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  importance: string;

  @Column()
  creatorId: number;

  @Column()
  executorId: number;

  @Column()
  finished: boolean;

  @Column()
  deadline: string;

  @Column()
  createdAt: string;

  @Column()
  category: string;

  @OneToMany(() => TodoComment, (todoComment) => todoComment.todo, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  comments: TodoComment[];
}

@Entity()
export class TodoComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  comment: string;

  @Column()
  creatorId: number;

  @Column()
  createdAt: string;

  @ManyToOne(() => Todo, (todo) => todo.comments, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  todo: Todo;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Salesman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tt: string;
}

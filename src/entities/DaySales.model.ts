import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DaySales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tt: string;

  @Column()
  day: string;

  @Column()
  to: number;

  @Column()
  cm: number;

  @Column()
  cz: number;

  @Column()
  ca: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sales: string;

  @Column()
  day: string;

  @Column()
  tt: string;

  @Column('text')
  mounth: string;

  @Column('text')
  year: string;
}

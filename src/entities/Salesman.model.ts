import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Salesman {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastname: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

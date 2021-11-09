import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Planes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tt: string;

  @Column()
  cm: number;

  @Column()
  cz: number;

  @Column()
  ca: number;

  @Column()
  to_cm: string;

  @Column()
  to_cz: string;
}

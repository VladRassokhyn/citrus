import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InfoMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => InfoSlide, (infoSlide) => infoSlide.infoMenu)
  @JoinTable()
  slides: InfoSlide[];
}

@Entity()
export class InfoSlide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => InfoMenu, (infoMenu) => infoMenu.slides)
  @JoinTable()
  infoMenu: InfoMenu;

  @OneToMany(() => InfoCategory, (infoCategory) => infoCategory.infoSlide)
  infoCategories: InfoCategory[];
}

@Entity()
export class InfoCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @ManyToOne(() => InfoSlide, (infoSlide) => infoSlide.infoCategories)
  @JoinTable()
  infoSlide: InfoMenu;

  @OneToMany(() => InfoField, (infoField) => infoField.infoCategory)
  @JoinTable()
  infoFields: InfoField[];
}

@Entity()
export class InfoField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => InfoCategory, (infoCategory) => infoCategory.infoFields)
  @JoinTable()
  infoCategory: InfoCategory;
}

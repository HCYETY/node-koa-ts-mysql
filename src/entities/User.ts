import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { schema } from "../database/mysqlDB";

@Entity({ database: schema })
export default class User {
  @PrimaryGeneratedColumn()
  key: number = 0;

  @Column()
  account: string = '';

  @Column()
  password: string = '';

  @Column()
  email: string = '';

  @Column()
  captcha: number = 0;

  // @Column("date", { default: null })
  // current_captcha: Date;
  @Column("bigint")
  current_captcha: number = 0;
}

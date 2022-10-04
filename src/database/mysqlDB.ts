import { createConnection, DatabaseType, ConnectionOptions } from "typeorm";
import * as Entities from '../entities/User';

export const schema = '';

export interface dbConfigProps {
  type: DatabaseType,
  host: string;
  port: number,
  username: string;
  password: string;
  database: string;
}

const dbConfig: ConnectionOptions = {
  type: "mysql",
  host: "",
  port: 3306,
  username: "",
  password: "",
  database: schema,
  charset: "utf8_general_ci",
  logging: false, // 是否有日志
  synchronize: false, // 是否自动建表
  entities: [__dirname + '/src/entity/*{.ts,.js}'], // entity/model存放位置
  timezone: 'z', // 以本地时区时间为主
}

const otherConfig = {
  entities: Object.values(Entities),
  // synchronize: true,  // 自动创建数据表
  // entities: Object.values([Entities.Api, Entities.Project, Entities.User, Entities.DataBase, Entities._Table])
}

export class MysqlDB {
  static async start() {
    await createConnection(Object.assign({},
      dbConfig,
      otherConfig
    )).then(() => {
      console.log('\x1B[32m%s\x1B[0m', `Successfully connected to the ${dbConfig.database} database (*^▽^*)`);
    }).catch(err => {
      console.log('\x1B[31m%s\x1B[0m', 'Database connection failed o(╥﹏╥)o');
      console.log(err);
    })
  }
}

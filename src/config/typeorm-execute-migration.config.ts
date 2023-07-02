import * as config from 'config';
import { DataSource } from 'typeorm';
import { DbConfig } from './db-config.interface';

const dbConfig: DbConfig = config.get('db');

export default () => {
  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || dbConfig.host,
    port:
      (process.env.DB_PORT as unknown as number) ||
      (dbConfig.port as unknown as number),
    username: process.env.DB_USER || dbConfig.username,
    password: process.env.DB_PASS || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
    logging: false,
    synchronize: false,
  });
};

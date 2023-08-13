import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DbConfig } from './db-config.interface';

const dbConfig: DbConfig = config.get('db');

export default () =>
  <TypeOrmModuleOptions>{
    type: process.env.DB_TYPE || dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: parseInt(process.env.DB_PORT, 10) || dbConfig.port,
    username: process.env.DB_USER || dbConfig.username,
    password: process.env.DB_PASS || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
    synchronize: false,
    logging: false,
    cli: {
      migrationsDir: `${__dirname}/../migrations`,
    },
  };

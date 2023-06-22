import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DbConfig } from './interfaces/db-config.interface';

// const dbConfig: DbConfig = config.get('db');

export default () =>
  <TypeOrmModuleOptions>{
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
    synchronize: true,
    logging: false,
    cli: {
      migrationsDir: `${__dirname}/../migrations`,
    },
  };

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DbConfig } from './interfaces/db-config.interface';

const dbConfig: DbConfig = config.get('db');

export default () =>
  <TypeOrmModuleOptions>{
    type: 'postgres',
    host: process.env.DB_HOST_TEST,
    port: parseInt(process.env.DB_PORT_TEST, 10), // inside app-network needs to use default container port
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
    dropSchema: true, // drop schema makes database clean every connection
    migrationsRun: true,
    synchronize: false,
    keepConnectionAlive: true,
    logging: false,
    cli: {
      migrationsDir: `${__dirname}/../migrations`,
    },
  };

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DbConfig } from '~/config/db-config.interface';

const dbConfig: DbConfig = config.get('db');

export default () =>
  <TypeOrmModuleOptions>{
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
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

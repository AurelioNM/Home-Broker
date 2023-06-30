import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DbConfig } from './interfaces/db-config.interface';

const dbConfig: DbConfig = config.get('db');

export default () =>
  <TypeOrmModuleOptions>{
    type: 'postgres',
    host: process.env.DB_HOST || dbConfig.host,
    port: parseInt(process.env.DB_PORT, 10) || dbConfig.port,
    username: process.env.DB_USER || dbConfig.username,
    password: process.env.DB_PASS || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../migrations/*.{js,ts}`],
    synchronize: /true/i.test(process.env.TYPEORM_SYNC) || dbConfig.synchronize,
    logging: false,
    cli: {
      migrationsDir: `${__dirname}/../migrations`,
    },
  };
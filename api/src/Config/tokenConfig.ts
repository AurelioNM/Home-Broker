import { CacheStore, CacheStoreFactory } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { getSecondsFromExpireString } from '~/Common/get-seconds-from-expire-string';

interface tokenConfig {
  port: string;
  host: string;
  ttl: number;
  store: string | CacheStoreFactory | CacheStore;
  isGlobal: boolean;
  db: number;
}

export const tokenConfiguration = registerAs('tokenConfig', () => {
  const configService = new ConfigService();
  const isTest = process.env.NODE_ENV === 'test';
  const expireString = process.env.JWT_SECRET_EXPIRES_IN ?? '15m';

  return <tokenConfig>{
    store: redisStore,
    host: isTest
      ? configService.get('REDIS_TEST_HOST')
      : process.env.REDIS_HOST,
    port: isTest
      ? configService.get('REDIS_TEST_PORT')
      : process.env.REDIS_PORT,
    password: !isTest ? configService.get<string>('REDIS_PASSWORD') : undefined,
    ttl: getSecondsFromExpireString(expireString),
    isGlobal: true,
    db: !isTest
      ? Number(process.env.TOKEN_DATABASE)
      : Number(configService.get('TOKEN_TEST_DATABASE')),
  };
});

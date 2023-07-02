import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      maxParamLength: 1000,
    }),
    {
      rawBody: true,
      logger:
        process.env.NODE_ENV === 'production'
          ? ['log', 'error', 'debug']
          : ['log', 'error', 'warn', 'debug', 'verbose'],
    },
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app
    .listen(3003)
    .then(() => {
      Logger.log(`API listen on 3003`);
    })
    .catch((error: any) => Logger.error(error));
}
bootstrap();

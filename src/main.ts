import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    { logger: ['log', 'error', 'warn', 'debug', 'verbose'] },
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(3000)
    .then(() => {
      Logger.log(`API listen on 3003`)
    })
    .catch((error: any) => Logger.error(error));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from '~/common-util/all-exceptions-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const port = process.env.PORT;
  console.log(port);

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

  if (process.env.NODE_ENV !== 'production') {
    const pathSwagger = process.env.SWAGGER_BASE_URL;

    const projectName = 'Cacau';
    const config = new DocumentBuilder()
      .setTitle(projectName)
      .setDescription(`API for ${projectName}`)
      .setVersion('1.0')
      .addTag(projectName)
      // .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(pathSwagger, app, document);
  }

  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
    allowedHeaders: [
      'Set-Cookie',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'x-user-id',
      'Accept-Encoding',
      'Accept-Language',
      'Cache-Control',
      'X-App',
      'X-Forwarded-For',
      'X-Forwarded-Proto',
      'User-Agent',
      'Cookie',
      'Baggage',
      'Sentry-Trace',
    ],
  };
  app.enableCors(corsOptions);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app
    .listen(parseInt(port.toString(), 10), '0.0.0.0')
    .then(() => Logger.log(`API Listen on ${port}`))
    .catch((error: any) => Logger.error(error));
}
bootstrap();

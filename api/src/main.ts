import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from '~/Domains/common-util/all-exceptions-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { TransformInterceptor } from './Domains/common-util/transform.interceptor';

async function bootstrap() {
  const port = process.env.PORT;

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
    const apiDocumentationCredentials = {
      name: process.env.SWAGGER_AUTH_LOGIN,
      pass: process.env.SWAGGER_AUTH_PASSWORD,
    };

    const pathSwagger = process.env.SWAGGER_BASE_URL;

    app.use(pathSwagger, (req, res, next) => {
      function parseAuthHeader(input: string): { name: string; pass: string } {
        const [, encodedPart] = input.split(' ');

        const buff = Buffer.from(encodedPart, 'base64');
        const text = buff.toString('ascii');
        const [name, pass] = text.split(':');

        return { name, pass };
      }

      function unauthorizedResponse(): void {
        if (app.getHttpAdapter().getType() === 'fastify') {
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic');
        } else {
          res.status(401);
          res.set('WWW-Authenticate', 'Basic');
        }

        next();
      }

      if (!req.headers.authorization) {
        return unauthorizedResponse();
      }

      const credentials = parseAuthHeader(req.headers.authorization);

      if (
        credentials?.name !== apiDocumentationCredentials.name ||
        credentials?.pass !== apiDocumentationCredentials.pass
      ) {
        return unauthorizedResponse();
      }

      next();
    });

    const projectName = 'Bit Scraper';
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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app
    .listen(parseInt(port.toString(), 10), '0.0.0.0')
    .then(() => Logger.log(`API Listen on ${port}`))
    .catch((error: any) => Logger.error(error));
}
bootstrap();

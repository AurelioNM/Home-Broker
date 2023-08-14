import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: exception.stack,
          };

    response.status(httpStatus).send({
      statusCode: httpStatus,
      body: {
        status: httpStatus === 500 ? 'fail' : 'error',
        errors: body.message,
      },
    });
  }
}

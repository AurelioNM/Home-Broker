import {
  ClassConstructor,
  instanceToInstance,
  plainToClass,
} from 'class-transformer';
import { Options } from 'nodemailer/lib/dkim';

export class Response {
  static factory<T, R>(
    ResponseDto: ClassConstructor<T>,
    plainResponseData: R,
    options?: Options,
  ): T {
    const updatedResponseData = plainToClass<T, R>(
      ResponseDto,
      plainResponseData,
      {
        ignoreDecorators: true,
      },
    );

    if (options) {
      return instanceToInstance(updatedResponseData, {
        ...options,
        excludeExtraneousValues: true,
      });
    }
    return instanceToInstance(updatedResponseData, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
    });
  }
}

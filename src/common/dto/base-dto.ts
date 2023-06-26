import { Exclude, classToClass, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Options } from 'nodemailer/lib/dkim';

export abstract class BaseDto {
  id?: string;

  createddate?: Date;

  @Exclude()
  alternativeid?: number;

  @Exclude()
  updateddate?: Date;

  @Exclude()
  deleteddate?: Date;

  public static factory<T, R>(
    ResponseDto: ClassType<T>,
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
      return classToClass(updatedResponseData, {
        ...options,
        excludeExtraneousValues: true,
      });
    }
    return classToClass(updatedResponseData, {
      excludeExtraneousValues: true,
    });
  }
}

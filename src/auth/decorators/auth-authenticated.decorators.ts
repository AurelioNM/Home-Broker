import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export function AuthAuthenticated(): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard('jwt')));
}

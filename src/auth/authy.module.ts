import { Module } from '@nestjs/common';
import { AuthCacheTokenService } from './services/auth-cache-token.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [JwtStrategy, AuthCacheTokenService],
})
export class AuthModule {}

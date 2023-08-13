import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { AuthCacheTokenService } from '../services/auth-cache-token.service';
import { JwtPayload } from './jwt-payload.interface';
import * as config from 'config';
import { UserInfoByToken } from '../interfaces/user-info-by-token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwtExtractor;

  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private cacheTokenService: AuthCacheTokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.JWT_SECRET'),
      passReqToCallback: true,
    });

    this.jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
  }

  async validate(
    req: FastifyRequest,
    payload: JwtPayload,
  ): Promise<UserInfoByToken> {
    const { email, id } = payload;

    this.logger.debug('email :', email);

    const providedToken = this.jwtExtractor(req);

    await this.cacheTokenService.validateUserToken(id, providedToken);

    const data: UserInfoByToken = {
      id,
      email,
    };
    return data;
  }
}

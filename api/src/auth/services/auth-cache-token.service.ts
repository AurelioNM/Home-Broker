import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
import { Cache } from 'cache-manager';
import { AuthCacheTokenKeyPrefixesEnum } from '../enum/auth-cache-token-key-prefixes.enum';
import * as config from 'config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthCacheTokenService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  encodeToken(jwtToken: string): string {
    const secretWord =
      process.env.CACHE_TOKEN_SECRET || config.get('jwt.CACHE_TOKEN_SECRET');
    return createHash('sha256')
      .update(`${secretWord}${jwtToken}`)
      .digest('hex');
  }

  async validateUserToken(userId: string, jwtToken: string): Promise<void> {
    const encodedToken = await this.getEncodedToken(userId);

    if (!encodedToken) throw new UnauthorizedException();

    const encodedProvidedToken = this.encodeToken(jwtToken);

    const isValid = encodedToken === encodedProvidedToken;

    if (!isValid) {
      const encodedSwitchToken = await this.getEncodedSwitchToken(userId);
      const isSwitchValid = encodedSwitchToken === encodedProvidedToken;

      if (!isSwitchValid) throw new UnauthorizedException();
    }
  }

  async getEncodedToken(userId: string): Promise<string> {
    return this.cacheManager.get(
      AuthCacheTokenKeyPrefixesEnum.Token.concat(userId),
    );
  }

  async getEncodedSwitchToken(userId: string): Promise<string> {
    return this.cacheManager.get(
      AuthCacheTokenKeyPrefixesEnum.SwitchToken.concat(userId),
    );
  }

  async setParamsInCache(userId: string, jwtToken: string): Promise<void> {
    const tokenEncode = this.encodeToken(jwtToken);

    await this.cacheManager.store.mset(
      AuthCacheTokenKeyPrefixesEnum.Token.concat(userId),
      tokenEncode,
      AuthCacheTokenKeyPrefixesEnum.SwitchToken.concat(userId),
      tokenEncode,
    );
  }
}

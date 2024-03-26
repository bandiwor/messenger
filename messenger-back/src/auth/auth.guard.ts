import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import CryptoService from 'src/crypto/crypto.service';
import { IS_PUBLIC_KEY } from './auth.public';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authorization: string | undefined = (
      request.headers.authorization || ''
    )
      .split(' ')
      .at(-1);

    console.log(authorization);

    if (!authorization) {
      throw new UnauthorizedException();
    }

    try {
      if (!(await this.cryptoService.verifyAccessJwt(authorization))) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}

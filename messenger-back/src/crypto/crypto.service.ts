import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export type JwtPayload = { id: string; login: string };

@Injectable()
export default class CryptoService {
  constructor(private readonly jwtService: JwtService) {}

  async hashString(value: string): Promise<string> {
    return hash(value, 10);
  }

  async compareHash(value: string, hashedValue: string) {
    return compare(value, hashedValue);
  }

  async signAccessJwt({ id, ...props }: JwtPayload) {
    return this.jwtService.signAsync(
      {
        sub: id,
        ...props,
      },
      {
        expiresIn: '60s',
      },
    );
  }

  async verifyAccessJwt(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token);
  }

  async signRefreshJwt({ id, ...props }: JwtPayload) {
    return this.jwtService.signAsync(
      {
        sub: id,
        ...props,
      },
      {
        expiresIn: '60d',
      },
    );
  }

  async verifyRefreshJwt(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token);
  }
}

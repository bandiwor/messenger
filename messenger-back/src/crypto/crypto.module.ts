import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './crypto.constants';
import CryptoService from './crypto.service';

@Module({
  imports: [JwtModule.register({ global: true, secret: secret })],
  providers: [CryptoService],
  exports: [CryptoService],
})
export default class CryptoModule {}

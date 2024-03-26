import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import PrismaModule from '../prisma/prisma.module';
import CryptoModule from '../crypto/crypto.module';

@Module({
  imports: [PrismaModule, CryptoModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}

import { Module } from '@nestjs/common';
import PrismaModule from '../prisma/prisma.module';
import ChatsService from './chats.service';

@Module({
  imports: [PrismaModule],
  providers: [ChatsService],
})
export default class ChatsModule {}

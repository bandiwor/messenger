import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import ChatsListDto from './dto/chats-list.dto';
import LoadChatDto from './dto/load-chat.dto';

@Injectable()
export default class ChatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async chatsList(dto: ChatsListDto, sub: string) {
    const user = await this.prismaService.profile.findUnique({
      where: {
        id: sub,
      },
      select: {
        chats: {
          include: {
            messages: {
              take: 1,
              orderBy: {
                id: 'desc',
              },
            },
            users: {
              take: 1,
              where: {
                NOT: {
                  id: sub,
                },
              },
            },
          },
          skip: dto.skip ?? 0,
          take: dto.take ?? 50,
        },
      },
    });

    return {
      chats: user.chats,
    };
  }

  async loadChat(dto: LoadChatDto, sub: string) {
    const chat = await this.prismaService.chat.findUnique({
      where: {
        id: dto.chatId,
        users: {
          some: {
            id: sub,
          },
        },
      },
      include: {
        messages: true,
        users: true,
      },
    });

    return {
      chat,
    };
  }
}

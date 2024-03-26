import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import AuthGuard from '../auth/auth.guard';
import ChatsService from './chats.service';
import ChatsListDto from './dto/chats-list.dto';
import JwtUser from '../decorators/JwtUser';

@UseGuards(AuthGuard)
@Controller('chats')
export default class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('list')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async chatsListGet(@Query() dto: ChatsListDto, @JwtUser() sub: string) {
    return this.chatsService.chatsList(dto, sub);
  }

  @Post('list')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async chatsListPost(@Body() dto: ChatsListDto, @JwtUser() sub: string) {
    return this.chatsService.chatsList(dto, sub);
  }
}

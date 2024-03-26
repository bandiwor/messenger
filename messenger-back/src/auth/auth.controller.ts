import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import AuthService from './auth.service';
import CreateProfileDto from './dto/create-profile.dto';
import AuthGuard from './auth.guard';
import { Public } from './auth.public';
import DeleteAccountDto from './dto/delete-account.dto';
import RefreshDto from './dto/refresh.dto';

@UseGuards(AuthGuard)
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async loginGet(@Query() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async loginPost(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Get('register')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async registerGet(@Query() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('register')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async registerPost(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Get('create-profile')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createProfileGet(@Query() dto: CreateProfileDto) {
    return this.authService.createProfile(dto);
  }

  @Public()
  @Post('create-profile')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createProfilePost(@Body() dto: CreateProfileDto) {
    return this.authService.createProfile(dto);
  }

  @Public()
  @Get('refresh')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async refreshTokenGet(@Query() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
  @Public()
  @Post('refresh')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async refreshTokenPost(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }

  @Get('verify')
  @HttpCode(200)
  async verify() {
    return true;
  }

  @Delete('delete-account')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async deleteAccount(@Body() dto: DeleteAccountDto) {
    return this.authService.deleteAccount(dto);
  }
}

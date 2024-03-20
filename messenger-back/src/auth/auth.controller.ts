import {Body, Controller, Get, HttpCode, Post, Query, UsePipes, ValidationPipe} from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import RegisterDto from "./dto/register.dto";
import AuthService from "./auth.service";
import CreateAccountDto from "./dto/create-account.dto";


@Controller('auth')
export default class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('login')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async loginGet(@Query() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('login')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async loginPost(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('register')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async registerGet(@Query() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('register')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async registerPost(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Get('create-profile')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async createProfileGet(@Query() dto: CreateAccountDto) {
        return this.authService.createProfile(dto);
    }

    @Post('create-profile')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async createProfilePost(@Body() dto: CreateAccountDto) {
        return this.authService.createProfile(dto);
    }
}
import {Injectable, UnauthorizedException, ConflictException} from "@nestjs/common";
import PrismaService from "../prisma/prisma.service";
import CryptoService, {JwtPayload} from "../crypto/crypto.service";
import LoginDto from "./dto/login.dto";
import RegisterDto from "./dto/register.dto";
import CreateAccountDto from "./dto/create-account.dto";


@Injectable()
export default class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly cryptoService: CryptoService) {
    }

    async login(dto: LoginDto) {
        const existsUser = await this.prismaService.account.findUnique({
            where: {
                login: dto.login
            },
        })

        if (!existsUser) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        if (!await this.cryptoService.compareHash(dto.password, existsUser.passwordHash)) {
            throw new UnauthorizedException('Неверный пароль');
        }

        if (!existsUser.profileCreated) {
            return {
                ok: false,
                profileCreated: false
            }
        }

        const jwtPayload: JwtPayload = {id: existsUser.id, login: existsUser.login};

        return {
            ok: true,
            profileCreated: true,
            accessToken: this.cryptoService.signAccessJwt(jwtPayload),
            refreshToken: this.cryptoService.signRefreshJwt(jwtPayload),
        }
    }

    async register(dto: RegisterDto) {
        const existsUser = await this.prismaService.account.findUnique({
            where: {
                login: dto.login
            },
        })

        if (existsUser) {
            throw new ConflictException('Аккаунт уже зарегистрирован');
        }

        const passwordHash = await this.cryptoService.hashString(dto.password);

        await this.prismaService.account.create({
            data: {
                login: dto.login,
                passwordHash,
            }
        });

        return {
            ok: true
        }
    }

    async createProfile(dto: CreateAccountDto) {
        const existsUser = await this.prismaService.account.findUnique({
            where: {
                login: dto.login
            }
        })

        if (!existsUser) {
            throw new UnauthorizedException('Аккаунт не найден');
        }

        if (!await this.cryptoService.compareHash(dto.password, existsUser.passwordHash)) {
            throw new UnauthorizedException('Неверный пароль');
        }

        if (existsUser.profileCreated) {
            throw new ConflictException('Профиль уже создан');
        }

        await this.prismaService.profile.create({
            data: {
                account: {
                    connect: {
                        id: existsUser.id
                    }
                },
                firstName: dto.firstName,
                lastName: dto.lastName,
                aboutSelf: dto.aboutSelf,
            }
        })

        return {
            ok: true
        }
    }
}
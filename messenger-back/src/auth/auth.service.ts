import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import CryptoService, { JwtPayload } from '../crypto/crypto.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import CreateProfileDto from './dto/create-profile.dto';
import DeleteAccountDto from './dto/delete-account.dto';
import RefreshDto from './dto/refresh.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(dto: LoginDto) {
    const existsUser = await this.prismaService.account.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (!existsUser) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    if (
      !(await this.cryptoService.compareHash(
        dto.password,
        existsUser.passwordHash,
      ))
    ) {
      throw new UnauthorizedException('Неверный пароль');
    }

    if (!existsUser.profileCreated) {
      return {
        ok: false,
        profileCreated: false,
      };
    }

    const jwtPayload: JwtPayload = {
      id: existsUser.id,
      login: existsUser.login,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.cryptoService.signAccessJwt(jwtPayload),
      this.cryptoService.signRefreshJwt(jwtPayload),
    ]);

    await this.prismaService.account.update({
      where: {
        id: existsUser.id,
      },
      data: {
        refreshToken,
      },
    });

    return {
      ok: true,
      profileCreated: true,
      accessToken,
      refreshToken,
    };
  }

  async refresh(dto: RefreshDto) {
    let jwtPayload: Awaited<
      ReturnType<typeof this.cryptoService.verifyRefreshJwt>
    >;

    try {
      jwtPayload = await this.cryptoService.verifyRefreshJwt(dto.oldRefresh);
    } catch {
      throw new BadRequestException('Invalid refresh jwt');
    }

    const existsUser = await this.prismaService.account.findUnique({
      where: {
        id: jwtPayload.id,
        login: jwtPayload.login,
      },
    });

    if (!existsUser) {
      throw new BadRequestException('User not found');
    }

    if (existsUser.refreshToken !== dto.oldRefresh) {
      throw new BadRequestException('Invalid refresh jwt');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.cryptoService.signAccessJwt({
        id: existsUser.id,
        login: existsUser.login,
      }),
      this.cryptoService.signRefreshJwt({
        id: existsUser.id,
        login: existsUser.login,
      }),
    ]);

    await this.prismaService.account.update({
      where: {
        id: existsUser.id,
      },
      data: {
        refreshToken,
      },
    });

    return {
      ok: true,
      accessToken,
      refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    const existsUser = await this.prismaService.account.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (existsUser) {
      throw new ConflictException('Аккаунт уже зарегистрирован');
    }

    const passwordHash = await this.cryptoService.hashString(dto.password);

    await this.prismaService.account.create({
      data: {
        login: dto.login,
        passwordHash,
      },
    });

    return {
      ok: true,
    };
  }

  async createProfile(dto: CreateProfileDto) {
    const existsUser = await this.prismaService.account.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (!existsUser) {
      throw new UnauthorizedException('Аккаунт не найден');
    }

    if (
      !(await this.cryptoService.compareHash(
        dto.password,
        existsUser.passwordHash,
      ))
    ) {
      throw new UnauthorizedException('Неверный пароль');
    }

    if (existsUser.profileCreated) {
      throw new ConflictException('Профиль уже создан');
    }

    await this.prismaService.$transaction([
      this.prismaService.profile.create({
        data: {
          account: {
            connect: {
              id: existsUser.id,
            },
          },
          firstName: dto.firstName,
          lastName: dto.lastName,
          aboutSelf: dto.aboutSelf,
        },
      }),
      this.prismaService.account.update({
        where: {
          login: dto.login,
        },
        data: {
          profileCreated: true,
        },
      }),
    ]);

    return {
      ok: true,
    };
  }

  async deleteAccount(dto: DeleteAccountDto) {
    const existsUser = await this.prismaService.account.findUnique({
      where: {
        login: dto.login,
      },
      include: {
        profile: true,
      },
    });

    if (!existsUser) {
      throw new BadRequestException('Аккаунт не найден');
    }

    if (existsUser.refreshToken !== dto.refreshToken) {
      throw new BadRequestException('Неверный refresh-jwt');
    }

    if (
      !(await this.cryptoService.compareHash(
        dto.password,
        existsUser.passwordHash,
      ))
    ) {
      throw new UnauthorizedException('Неверный пароль');
    }

    if (existsUser.profileCreated) {
      await this.prismaService.profile.delete({
        where: {
          id: existsUser.profile.id,
        },
      });
    }

    await this.prismaService.account.delete({
      where: {
        id: existsUser.id,
      },
    });

    return {
      ok: true,
    };
  }
}

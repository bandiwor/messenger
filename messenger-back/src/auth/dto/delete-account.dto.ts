import { IsString } from 'class-validator';

export default class DeleteAccountDto {
  @IsString()
  login: string;

  @IsString()
  refreshToken: string;

  @IsString()
  password: string;
}

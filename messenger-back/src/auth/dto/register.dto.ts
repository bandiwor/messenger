import { IsString, Length, Matches } from 'class-validator';

export default class RegisterDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9-.]+$/, {
    message: 'Логин может включать латинские буквы, цифры, точку, и дефис',
  })
  @Length(4, 16, {
    message: 'Длина логина должна быть от 4 до 16 символов',
  })
  login: string;

  @IsString()
  @Length(6, 128, {
    message: 'Длина пароль должна быть от 6 до 128 символов',
  })
  password: string;
}

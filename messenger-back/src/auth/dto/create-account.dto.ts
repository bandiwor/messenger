import {IsOptional, IsString, Length, Matches, MaxLength} from "class-validator";

export default class CreateAccountDto {
    @IsString()
    login: string

    @IsString()
    password: string

    @IsString()
    @Length(2, 16, {
        message: 'Длина имени должна быть от 2 до 16 символов'
    })
    @Matches(/^[а-яА-Яa-zA-Z]+$/, {
        message: 'Имя должно может включать буквы русского и/или латинского алфавита'
    })
    firstName: string

    @IsString()
    @Length(2, 16, {
        message: 'Длина фамилии должна быть от 2 до 16 символов'
    })
    @Matches(/^[а-яА-Яa-zA-Z]+$/, {
        message: 'Фамилия должна может включать буквы русского и/или латинского алфавита'
    })
    lastName: string

    @IsOptional()
    @IsString()
    @MaxLength(64, {
        message: 'Максимальная длина "о себе" - 64 символа'
    })
    aboutSelf?: string
}
import {IsString} from "class-validator";

export default class LoginDto {
    @IsString()
    login: string

    @IsString()
    password: string
}
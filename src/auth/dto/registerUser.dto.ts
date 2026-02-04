import {IsEmail, isEmail, IsString, isString} from "class-validator"

export class RegisterDto{
    @IsString()
    fName: string;

    @IsString()
    lName: string;

    @IsEmail()
    email: string;

@IsString()
    password: string;
}
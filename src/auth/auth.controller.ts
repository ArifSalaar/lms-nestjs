import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth') // prefix , 
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
   async register(@Body() userRegisterDto: RegisterDto) {
        const createdUser =await this.authService.register(userRegisterDto);
        return createdUser;
    }
}

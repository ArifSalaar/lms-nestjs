import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') // prefix , 
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }


    @Post('register')
    async register(@Body() userRegisterDto: RegisterDto) {
        const createdUser = await this.authService.register(userRegisterDto);
        return createdUser;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req: any) { 
        const userId = req.user.sub;
        const user = await this.userService.getUserById(userId);
        console.log("User is", user);
        return user;
    }
}

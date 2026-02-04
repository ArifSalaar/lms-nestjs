import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
// import { from } from 'rxjs';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(userRegisterDto: RegisterDto) {

        const saltRounds = 10;
        const hash = await bcrypt.hash(userRegisterDto.password, saltRounds);

        const user = await this.userService.createUser({ ...userRegisterDto, password: hash });

        const payload = { sub: user.userId };
        const token = await this.jwtService.signAsync(payload)

        return { access_token: token };
    }


    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            access_token: this.jwtService.sign({
                sub: user._id,
                email: user.email,
                role: user.role,
            }),
        };
    }

}

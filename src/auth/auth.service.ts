import { Injectable } from '@nestjs/common';
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
// console.log(token)
        return { access_token: token };


    }
}

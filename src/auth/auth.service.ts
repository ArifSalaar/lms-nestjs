import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
// import { from } from 'rxjs';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    async register(userRegisterDto: RegisterDto) {

        const saltRounds = 10;
        const hash = await bcrypt.hash(userRegisterDto.password, saltRounds);

        const user = await this.userService.createUser({ ...userRegisterDto, password: hash });
        return { user };


    }
}

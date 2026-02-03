import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UserService {

    

    constructor(
  @InjectModel(User.name)
  private readonly userModel: Model<UserDocument>, // ✅ correct
) {}


    async createUser(userRegisterDto: RegisterDto){

        return await this.userModel.create({
            fName: userRegisterDto.fName,
            lName: userRegisterDto.lName,
            email: userRegisterDto.email,
            password: userRegisterDto.password
        })
        
    }
}

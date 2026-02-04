import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UserService {



    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>, // ✅ correct
    ) { }


    async createUser(userRegisterDto: RegisterDto) {
        try {
            const user = await this.userModel.create({
                fName: userRegisterDto.fName,
                lName: userRegisterDto.lName,
                email: userRegisterDto.email,
                password: userRegisterDto.password
            })

            return {
                message: "User registered successfully",
                userId: user._id
            }
        }
        catch (err: unknown) {
            console.error("Error creating User", err);

            const e = err as {code?: number}

            const DUPLICATE_KEY_CODE = 11000;

            if(e.code === DUPLICATE_KEY_CODE){
                
                throw new ConflictException('Email is already taken')
            }
            throw err
        }
    }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}


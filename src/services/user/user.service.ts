import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user';
import { User, UserDocument } from 'src/schemas/user';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    console.log('UsersService run');
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async sendUser(data): Promise<User> {
    const psw = await encodePassword(data.psw);
    const userData = new this.userModel({ ...data, psw });
    return userData.save();
  }

  async checkAuthUser(login: string, psw: string): Promise<User> {
    console.log(`here's checkAuthUser`);
    // const usersArr = await this.userModel.find({ login: login, psw: psw });
    const user = await this.userModel.findOne({ login: login });
    const isMatch = await comparePasswords(psw, user.psw);
    if (!user) {
      console.log('checkAuthUser --- user not found');
      return null;
    }
    if (!isMatch) {
      console.log('checkAuthUser --- passwords do not match');
      return null;
    }
    return user;
    // return usersArr.length === 0 ? null : usersArr;
  }

  async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({ login: login });
  }

  async login(user: UserDto) {
    console.log(`here's login`);
    const payload = { login: user.login, psw: user.psw };
    const userFromDB = await this.userModel.find({ login: user.login });
    return {
      id: userFromDB[0]._id,
      access_token: this.jwtService.sign(payload),
    };
  }
}

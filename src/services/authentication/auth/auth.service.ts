import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../user/user.service'

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'login', passwordField: 'psw' });
  }

  async validate(login: string, psw: string): Promise<any> {
    const user = await this.userService.checkAuthUser(login, psw);
    console.log('user', user);
    console.log('login', login);
    console.log('psw', psw);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errorText: 'Пользователь не найден в базе',
          errorTextDetails: 'Авторизация AuthService доп.инфо from DB',
        },
        HttpStatus.CONFLICT,
      );
    }
    return true;
  }
}
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/dto/user';
import { User } from 'src/schemas/user';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id): Promise<User> {
    return this.userService.getUserById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  sednUser(@Body() data: UserDto): Promise<User> {
    return this.userService.checkRegUser(data.login).then((queryRes) => {
      console.log('data reg', queryRes);
      if (queryRes.length === 0) {
        return this.userService.sendUser(data);
      } else {
        console.log('err - user is exists');
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            errorText: 'Пользователь уже зарегистрирован ',
            errorTextDetails: 'Регистрация доп.инфо from DB',
          },
          HttpStatus.CONFLICT,
        );
      }
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post(':login')
  authUser(@Body() data: UserDto, @Param('login') login): any {
    return this.userService.login(data);
  }
}

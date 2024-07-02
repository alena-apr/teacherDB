import { IUser } from '../interfaces/user';

export class UserDto implements IUser {
  id: string;
  login: string;
  psw: string;
  email: string;
}

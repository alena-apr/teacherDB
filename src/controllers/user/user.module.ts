import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from 'src/services/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/constants';
import { AuthService } from 'src/services/authentication/auth/auth.service';
import { JwtStrategyService } from 'src/services/authentication/jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategyService],
})
export class UserModule {}

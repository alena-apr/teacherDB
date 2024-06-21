import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controllers/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GrammarModule } from './controllers/grammar/grammar.module';

@Module({
  imports: [
    UserModule,
    GrammarModule,
    MongooseModule.forRoot('mongodb://localhost:27017/teacherDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

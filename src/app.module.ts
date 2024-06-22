import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controllers/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GrammarModule } from './controllers/grammar/grammar.module';
import { AnswerGrammarModule } from './controllers/answer-grammar/answer-grammar.module';

@Module({
  imports: [
    UserModule,
    GrammarModule,
    AnswerGrammarModule,
    MongooseModule.forRoot('mongodb://localhost:27017/teacherDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

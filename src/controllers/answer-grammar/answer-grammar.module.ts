import { Module } from '@nestjs/common';
import { AnswerGrammarController } from './answer-grammar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerGrammar, AnswerGrammarSchema } from 'src/schemas/answer-grammar';
import { AnswerGrammarService } from 'src/services/answer-grammar/answer-grammar.service';
import { GrammarModule } from '../grammar/grammar.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnswerGrammar.name, schema: AnswerGrammarSchema },
    ]),
    GrammarModule,
  ],
  controllers: [AnswerGrammarController],
  providers: [AnswerGrammarService],
})
export class AnswerGrammarModule {}

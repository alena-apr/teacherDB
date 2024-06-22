import { Module } from '@nestjs/common';
import { GrammarController } from './grammar.controller';
import { GrammarService } from '../../services/grammar/grammar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Grammar, GrammarSchema } from 'src/schemas/grammar';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grammar.name, schema: GrammarSchema }]),
  ],
  controllers: [GrammarController],
  providers: [GrammarService],
  exports: [GrammarService],
})
export class GrammarModule {}

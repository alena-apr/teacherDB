import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswerGrammarDto } from 'src/dto/answer-grammar';
import { IAnswerForDB } from 'src/interfaces/answer';
import { AnswerGrammarService } from 'src/services/answer-grammar/answer-grammar.service';

@Controller('answer-grammar')
export class AnswerGrammarController {
  constructor(private aswerGrammarService: AnswerGrammarService) {}

  @Get()
  getAllAnswers(): Promise<IAnswerForDB[]> {
    return this.aswerGrammarService.getAllAnswers();
  }

  @Get(':id')
  getOneAnswerById(@Param('id') id: string): Promise<IAnswerForDB> {
    return this.aswerGrammarService.getAnswerById(id);
  }

  @Get('answers-for-admin/:id')
  getAnswersForAdminByUser(@Param('id') id: string): Promise<IAnswerForDB[]> {
    return this.aswerGrammarService.getAnswersForAdminByUser(id);
  }

  @Get('answers-by-user/:id')
  getAnswersByUser(@Param('id') id: string): Promise<IAnswerForDB[]> {
    return this.aswerGrammarService.getAnswerByUser(id);
  }

  @Post()
  sendAnswer(@Body() data: AnswerGrammarDto): Promise<IAnswerForDB> {
    return this.aswerGrammarService.sendAnswer(data);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswerGrammarDto } from 'src/dto/answer-grammar';
import { IAnswerForDB } from 'src/interfaces/answer';
import { AnswerGrammarService } from 'src/services/answer-grammar/answer-grammar.service';

@Controller('answer-grammar')
export class AnswerGrammarController {
    constructor(private aswerGrammarService: AnswerGrammarService) { }
    
    @Get()
    getAllAnswers(): Promise<IAnswerForDB[]> {
        return this.aswerGrammarService.getAllAnswers();
    }

    @Get(':id')
    getOneAnswerById(@Param('id') id): Promise<IAnswerForDB> {
        return this.aswerGrammarService.getAnswerById(id);
    }

    @Post()
    sendAnswer(@Body() data: AnswerGrammarDto): Promise<IAnswerForDB> {
        return this.aswerGrammarService.sendAnswer(data);
    }
    

}

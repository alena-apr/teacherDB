import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrammarDto } from 'src/dto/grammar';
import { IExercise } from 'src/interfaces/grammar';
import { GrammarService } from 'src/services/grammar/grammar.service';

@Controller('grammar')
export class GrammarController {
  constructor(private grammarService: GrammarService) {}

  @Get()
  getAllGrammar(): Promise<IExercise[]> {
    return this.grammarService.getAllGrammar();
  }

  @Get('exercises')
  getAllGrammarWOAnswers(): Promise<IExercise[]> {
    return this.grammarService.getAllGrammarWOAnswers();
  }

  @Get(':prompt')
  getGrammarByName(@Param('prompt') prompt): Promise<IExercise[]> {
    return this.grammarService.getGrammarByName(prompt);
  }

  @Get(':id')
  getOneGrammarById(@Param('id') id): Promise<IExercise> {
    return this.grammarService.getGrammarById(id);
  }

  @Get('exercise/:id')
  getOneGrammarWOAnswers(@Param('id') id): Promise<IExercise> {
    return this.grammarService.getGrammarByIdWOAnswers(id);
  }

  @Post()
  sendGrammarExc(@Body() data: GrammarDto): Promise<IExercise> {
    return this.grammarService.sendGrammar(data);
  }

  @Delete(':id')
  deleteExerciseById(@Param('id') id): Promise<IExercise> {
    return this.grammarService.deleteGrammarById(id);
  }
}

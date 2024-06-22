import { Test, TestingModule } from '@nestjs/testing';
import { AnswerGrammarController } from './answer-grammar.controller';

describe('AnswerGrammarController', () => {
  let controller: AnswerGrammarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerGrammarController],
    }).compile();

    controller = module.get<AnswerGrammarController>(AnswerGrammarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

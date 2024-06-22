import { Test, TestingModule } from '@nestjs/testing';
import { AnswerGrammarService } from './answer-grammar.service';

describe('AnswerGrammarService', () => {
  let service: AnswerGrammarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerGrammarService],
    }).compile();

    service = module.get<AnswerGrammarService>(AnswerGrammarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

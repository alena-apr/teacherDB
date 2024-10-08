import { IAnswerForDB } from 'src/interfaces/answer';
import { IAnswer, IFormatedAnswer, IText } from 'src/interfaces/grammar';

export class AnswerGrammarDto implements IAnswerForDB {
  userId: string;
  exerciseId: string;
  type: string;
  title: string;
  difficulty: number;
  realAnswers: IAnswer[] | [];
  text: IText[];
  studentAnswers: IFormatedAnswer[];
}

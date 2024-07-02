import {
  IAnswer,
  IExercise,
  IFormatedAnswer,
  IText,
} from 'src/interfaces/grammar';

export class GrammarDto implements IExercise {
  type: string;
  title: string;
  difficulty: number;
  realAnswers: IAnswer[];
  text: IText[];
  studentAnswers: IFormatedAnswer[];
}

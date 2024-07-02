import { IExercise } from './grammar';

export interface IAnswerForDB extends IExercise {
  userId: string;
  exerciseId: string;
}

export interface IExercise {
  type: string;
  title: string;
  difficulty: number;
  realAnswers: IAnswer[] | [];
  text: IText[];
  studentAnswers: IFormatedAnswer[];
}

export interface IAnswer {
  id: number;
  answer: string;
}

export interface IText {
  id: number;
  text: string;
  transformedText: string[];
}

export interface IRawAnswer {
  id: number;
  answer?: string;
}

export interface IFormatedAnswer {
  id: number;
  answer?: string;
  isCorrect: boolean;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IAnswer,
  IExercise,
  IFormatedAnswer,
  IText,
} from 'src/interfaces/grammar';

export type GrammarDocument = HydratedDocument<Grammar>;

@Schema()
export class Grammar implements IExercise {
  @Prop() type: string;
  @Prop() title: string;
  @Prop() difficulty: number;
  @Prop() realAnswers: IAnswer[];
  @Prop() text: IText[];
  @Prop() studentAnswers: IFormatedAnswer[];
}

export const GrammarSchema = SchemaFactory.createForClass(Grammar);

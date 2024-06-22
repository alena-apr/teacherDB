import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAnswerForDB } from 'src/interfaces/answer';
import { IAnswer, IFormatedAnswer, IText } from 'src/interfaces/grammar';

export type AnswerGrammarDocument = HydratedDocument<AnswerGrammar>;

@Schema()
export class AnswerGrammar implements IAnswerForDB {
    @Prop() userId: string;
    @Prop() exerciseId: string;
    @Prop() type: string;
    @Prop() title: string;
    @Prop() difficulty: number;
    @Prop() realAnswer: IAnswer[];
    @Prop() text: IText[];
    @Prop() studentAnswer: IFormatedAnswer[];
}

export const AnswerGrammarSchema = SchemaFactory.createForClass(AnswerGrammar);

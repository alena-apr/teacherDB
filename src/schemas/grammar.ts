import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IGrammar, IPhrase } from 'src/interfaces/grammar';

export type GrammarDocument = HydratedDocument<Grammar>;

@Schema()
export class Grammar implements IGrammar {
    @Prop() id: string;
    @Prop() type: string;
    @Prop() text: IPhrase[];
    @Prop() answer: IPhrase[];
}

export const GrammarSchema = SchemaFactory.createForClass(Grammar);
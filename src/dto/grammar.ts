import { IGrammar, IPhrase } from "src/interfaces/grammar";

export class GrammarDto implements IGrammar {
    id: string;
    type: string;
    text: IPhrase[];
    answer: IPhrase[];
}
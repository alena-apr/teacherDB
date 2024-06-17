export interface IPhrase {
    id: number;
    phrase: string;
    answer: string;
}

export interface IGrammar {
    id: string;
    type: string;
    text: IPhrase[];
    answer: IPhrase[];
}
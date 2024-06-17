import { IGrammar, IPhrase } from "src/interfaces/grammar";

export class GrammarDto implements IGrammar {
    answer: IPhrase[];
    id: string;
    type: string;
    text: IPhrase[];
}

// const obj = {
//     id: '333',
//     // type: 'input',
//     text: 'sdsds sdfsdfsdfsdfsd **** sdsdsd1',
//     answer: 'asdas',
//     trasformText: ['dsdsd', 'sdsdsd1']
// }


// id 1 Listen INPUT music
// id 2 Listen INPUT music
// id 3 Listen ***  music

// id 1 to
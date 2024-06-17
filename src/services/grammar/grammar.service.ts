import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGrammar } from 'src/interfaces/grammar';
import { Grammar, GrammarDocument } from 'src/schemas/grammar';

@Injectable()
export class GrammarService {

        constructor(
        @InjectModel(Grammar.name) private grammarModel: Model<GrammarDocument>,
    ) {
        console.log('GrammarService run');
    }

    async getAllGrammar(): Promise<IGrammar[]> {
        return this.grammarModel.find();
    }

    async getGrammarById(id:string): Promise<IGrammar> {
        return this.grammarModel.findById(id);
    }

    async sendGrammar(data): Promise<IGrammar> {
        const ExData = new this.grammarModel({...data});
        return ExData.save();

    }
}

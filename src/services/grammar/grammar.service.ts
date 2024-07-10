import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExercise } from 'src/interfaces/grammar';
import { Grammar, GrammarDocument } from 'src/schemas/grammar';

@Injectable()
export class GrammarService {
  constructor(
    @InjectModel(Grammar.name) private grammarModel: Model<GrammarDocument>,
  ) {
    console.log('GrammarService runs');
  }

  async getAllGrammar(): Promise<IExercise[]> {
    return this.grammarModel.find();
  }

  async getAllGrammarWOAnswers(): Promise<IExercise[]> {
    const allGrammar: IExercise[] = await this.grammarModel.find();
    const allGrammarWOAnswers: IExercise[] = allGrammar.map((el: IExercise) => {
      el.realAnswers = [];
      return el;
    });
    return allGrammarWOAnswers;
  }

  async getGrammarById(id: string): Promise<IExercise> {
    return this.grammarModel.findById(id);
  }

  async getGrammarByIdWOAnswers(id: string): Promise<IExercise> {
    const data = await this.grammarModel.findById(id);
    data.realAnswers = [];
    // console.log(data);
    return data;
  }

  async getGrammarByName(prompt: string): Promise<IExercise[]> {
    const grammarByName = await this.grammarModel.find({
      title: { $regex: prompt, $options: 'i' },
    });
    const grammarByNameWOAnswers = grammarByName.map((el) => {
      el.realAnswers = [];
      return el;
    });
    return grammarByNameWOAnswers;
  }

  async sendGrammar(data: IExercise): Promise<IExercise> {
    // data.text
    const exerciseData = new this.grammarModel({ ...data });
    return exerciseData.save();
  }

  async deleteGrammarById(id: string): Promise<IExercise> {
    return this.grammarModel.findByIdAndDelete(id);
    // return `Exercise ${id} DELETED`
  }
}

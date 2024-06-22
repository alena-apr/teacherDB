import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAnswerForDB } from 'src/interfaces/answer';
import { AnswerGrammar } from 'src/schemas/answer-grammar';
import { GrammarService } from '../grammar/grammar.service';
import { IFormatedAnswer, IRawAnswer } from 'src/interfaces/grammar';

@Injectable()
export class AnswerGrammarService {
    constructor(
        @InjectModel(AnswerGrammar.name) private answerGrammarModel: Model<AnswerGrammar>,
        private grammarService: GrammarService, 
    ) {
        console.log('AnswerGrammarService runs')
    }

    async getAllAnswers(): Promise<IAnswerForDB[]> {
        return this.answerGrammarModel.find()
    }

    async getAnswerById(id: string): Promise<IAnswerForDB> {
        return this.answerGrammarModel.findById(id); 
    }

    async sendAnswer(data: IAnswerForDB): Promise<IAnswerForDB> {
        const answerData = new this.answerGrammarModel({ ...data });
        const answerExerciseId = answerData.exerciseId;
        const exercise = await this.grammarService.getGrammarById(answerExerciseId);
        answerData.studentAnswer = this.checkAnswers(answerData.studentAnswer, exercise.realAnswer);
        return answerData.save();
    }


  checkAnswers(studentAnswers: IFormatedAnswer[], realAnswers: IRawAnswer[]) {
    console.log('HERE IS THE CHECK ANSWERS');
    const checkedAnswers = studentAnswers.map((studentAnswer) => {
      const check = realAnswers.find(
        (answer) => answer.id === studentAnswer.id
      );
      if (
        studentAnswer.answer?.toLowerCase() !== check?.answer.toLowerCase()
      ) {
        return { ...studentAnswer, isCorrect: false };
      }
      return { ...studentAnswer, isCorrect: true };
    });
    return checkedAnswers;
  }
}

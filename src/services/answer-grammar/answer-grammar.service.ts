import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAnswerForDB } from 'src/interfaces/answer';
import { AnswerGrammar } from 'src/schemas/answer-grammar';
import { GrammarService } from '../grammar/grammar.service';
import { IAnswer, IFormatedAnswer } from 'src/interfaces/grammar';

@Injectable()
export class AnswerGrammarService {
  constructor(
    @InjectModel(AnswerGrammar.name)
    private answerGrammarModel: Model<AnswerGrammar>,
    private grammarService: GrammarService,
  ) {
    console.log('AnswerGrammarService runs');
  }

  async getAllAnswers(): Promise<IAnswerForDB[]> {
    return this.answerGrammarModel.find();
  }

  async getAnswerById(id: string): Promise<IAnswerForDB> {
    return this.answerGrammarModel.findById(id);
  }

  async sendAnswer(data: IAnswerForDB): Promise<IAnswerForDB> {
    const answerData = new this.answerGrammarModel({ ...data });
    const answerExerciseId = answerData.exerciseId;
    // console.log('answerExerciseId', answerExerciseId)
    const exercise = await this.grammarService.getGrammarById(answerExerciseId);
    // console.log('exercise', exercise)
    // console.log('answerData', answerData)
    // console.log('answerData.studentAnswers', answerData.studentAnswers)
    answerData.studentAnswers = this.checkAnswers(
      answerData.studentAnswers,
      exercise.realAnswers,
    );
    // console.log('exercise.realAnswers', exercise.realAnswers)
    // console.log('answerData.studentAnswers', answerData.studentAnswers)
    return answerData.save();
  }

  async getAnswersForAdminByUser(id: string): Promise<any> {
    const allAnswers = await this.getAllAnswers();
    // const allAnswersByUser = allAnswers.filter((el) => el.userId === id);
    const allAnswersByUser = allAnswers.filter((el) => el.userId === id);
    // .map(el => this.attachRealAnswers(el, el.exerciseId));
    // const exercisesIdSet = this.makeExercisesIdSet(allAnswersByUser);
    // console.log('ID SET', exercisesIdSet);
    // const exercisesByUser: IExercise[] = await this.getInitialExercises(exercisesIdSet);
    // console.log('from main function', exercisesByUser);
    // const allAnswersByUserWAnswers = this.attachRealAnswers(allAnswersByUser, exercisesByUser)

    // return allAnswersByUserWAnswers;

    // const bobo = allAnswersByUser.map( (answer)  => {
    //   const answersWAnswers =  this.attachRealAnswers(answer, answer.exerciseId)
    //   // console.log('answer from main func', answer)
    //   return answersWAnswers
    // })

    // const treCivette = this.attach2(allAnswersByUser)

    // const answersByUserWAnswers =  treCivette;
    // allAnswersByUser.map

    // allAnswersByUser.forEach(el => this.attachRealAnswers(el, el.exerciseId))

    // console.log("ALL ANSW WITH ANSW", allAnswersByUser)

    // console.log('answerByuserWAnswers', answersByUserWAnswers)

    // return answersByUserWAnswers

    const result = [];

    for (const el of allAnswersByUser) {
      result.push(await this.attachRealAnswers(el, el.exerciseId));
    }
    return result;
  }

  checkAnswers(studentAnswers: IFormatedAnswer[], realAnswers: IAnswer[]) {
    console.log('HERE IS THE CHECK ANSWERS');
    const checkedAnswers = studentAnswers.map((studentAnswer) => {
      const check = realAnswers.find(
        (answer) => answer.id === studentAnswer.id,
      );
      if (studentAnswer.answer?.toLowerCase() !== check?.answer.toLowerCase()) {
        return { ...studentAnswer, isCorrect: false };
      }
      return { ...studentAnswer, isCorrect: true };
    });
    return checkedAnswers;
  }

  makeExercisesIdSet(allUserAnswers: IAnswerForDB[]) {
    const exerciseIdSet = new Set<string>();
    allUserAnswers.forEach((el) => exerciseIdSet.add(el.exerciseId));
    return exerciseIdSet;
  }

  async getInitialExercises(exerciseIdSet: Set<string>) {
    const exerciseIdArray = Array.from(exerciseIdSet);
    const promiseArray = exerciseIdArray.map((el) =>
      this.grammarService.getGrammarById(el),
    );
    const exercisesById = await Promise.all(promiseArray).then((res) => {
      return res;
    });
    return exercisesById;
  }

  // attachRealAnswers(allAnswersByUser: IAnswerForDB[], exercisesByUser: any) {
  //   const exercisesByUserWAnswers = allAnswersByUser.map((answer) => {
  //     const exerciseWAnswers = exercisesByUser.find((exercise) => {
  //       exercise._id === answer.exerciseId
  //     });
  //     console.log('EX W ANSWERS', exerciseWAnswers)
  //     answer.realAnswers = exerciseWAnswers.realAnswers;
  //   })
  //   return exercisesByUserWAnswers;
  // }
  async attachRealAnswers(answerByUser: IAnswerForDB, exerciseId: string) {
    const exerciseById = await this.grammarService.getGrammarById(exerciseId);
    answerByUser.realAnswers = exerciseById.realAnswers;
    // console.log(answerByUser);
    return answerByUser;

    // const necessaryExercises = await this.getInitialExercises(exerciseId);
    // const smth =
  }

  // attach2(answerByUser: IAnswerForDB[]) {
  //   const coco: IAnswerForDB = answerByUser.map(el => {
  //     this.attachRealAnswers(el, el.exerciseId)
  //     return el
  //   })
  //   return coco
  // }

  // async attach3(answersByUser: IAnswerForDB[]) {
  //   const result = [];

  //   for (const el of answersByUser) {
  //     result.push(await this.attachRealAnswers(el, el.exerciseId))
  //   }

  //   return result;
  // }
}

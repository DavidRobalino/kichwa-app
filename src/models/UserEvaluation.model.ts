import { Evaluation } from './Evaluation.model';
import { CreateAnswerValues, StudentAnswer } from './StudentAnswer.model';

export class UserEvaluation {
  id: number;
  evaluationId: number;
  startTime: Date;
  endTime: Date;
  score: number;
  // relations
  studentAnswers: StudentAnswer[];
  evaluation?: Evaluation;

  constructor(data: any) {
    this.id = data.id;
    this.evaluationId = data.evaluationId;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.score = data.score;
    // relations
    this.studentAnswers = data.studentAnswers || [];
    this.evaluation = data.evaluation;
  }
}

export type CreateUserEvaluationValues = {
  startTime: Date;
  endTime: Date;
  answers: CreateAnswerValues[];
};

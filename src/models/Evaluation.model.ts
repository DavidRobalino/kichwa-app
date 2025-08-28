import { Lesson } from './Lesson.model';
import { CreateQuestionValues, Question } from './Question.model';
import { UserEvaluation } from './UserEvaluation.model';

export class Evaluation {
  id: number;
  lessonId: number;
  createdAt: Date;
  updatedAt: Date;
  // relations
  questions: Question[];
  lesson?: Lesson;
  // user relations
  userEvaluations: UserEvaluation[];

  constructor(data: any) {
    this.id = data.id;
    this.lessonId = data.lessonId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    // relations
    this.questions = data.questions || [];
    this.lesson = data.lesson;
    // user relations
    this.userEvaluations = data.userEvaluations || [];
  }
}

export type CreateEvaluationValues = {
  questions: CreateQuestionValues[];
};

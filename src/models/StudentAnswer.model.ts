import { QuestionType } from './Question.model';

export class StudentAnswer {
  id: number;
  studentEvaluationId: number;
  questionId: number;
  questionText: string;
  isCorrect: boolean;
  type: QuestionType;
  options: { text: string; isChoose: boolean; isRight: boolean }[];

  constructor(data: any) {
    this.id = data.id;
    this.studentEvaluationId = data.studentEvaluationId;
    this.questionId = data.questionId;
    this.isCorrect = data.isCorrect;
    this.type = data.type;
    this.questionText = data.questionText;
    this.options = data.options || [];
  }
}

export type CreateAnswerValues = {
  questionId: number;
  questionText: string;
  type: QuestionType;
  options: { text: string; isChoose: boolean }[];
};

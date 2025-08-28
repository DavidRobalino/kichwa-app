export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  COMPLETE = 'complete',
  TRUE_FALSE = 'true_false',
}

interface IOptions {
  text: string;
  isRight: boolean;
}

export class Question {
  id: number;
  evaluationId: number;
  title: string;
  type: QuestionType;
  options: IOptions[];

  constructor(data: any) {
    this.id = data.id;
    this.evaluationId = data.evaluationId;
    this.title = data.title;
    this.type = data.type;
    this.options = data.options;
  }
}

export type CreateQuestionValues = {
  id?: number;
  title: string;
  type: QuestionType;
  options: { text: string; isRight: boolean }[];
};

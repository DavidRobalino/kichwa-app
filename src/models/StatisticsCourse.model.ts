export interface IJoinedStudentNote {
  userId: number;
  lessonId: number;
  firstName: number;
  lastName: number;
  highestScore: number;
}

export interface IEvaluationScore {
  lessonId: number;
  scoreGte14: number;
  scoreLt14: number;
  noEvaluation: number;
}

export interface IAnswerHitAndFail {
  lessonId: number;
  questionId: number;
  hits: number;
  failures: number;
}

export class StatisticsCourse {
  joinedStudents: IJoinedStudentNote[];
  evaluationScores: IEvaluationScore;
  answersHitsFailures: IAnswerHitAndFail[];

  constructor(data: any) {
    this.joinedStudents = data.joinedStudents;
    this.evaluationScores = data.evaluationScores;
    this.answersHitsFailures = data.answersHitsFailures;
  }
}

export class StudentEvaluation {
  userId: number;
  courseId: number;
  evaluationId: number;
  title: string;
  maxScore: number;
  attempts: number;
  lastAttemptId: number;

  constructor(data: any) {
    this.userId = data.userId;
    this.courseId = data.courseId;
    this.evaluationId = data.evaluationId;
    this.title = data.title;
    this.maxScore = data.maxScore;
    this.attempts = data.attempts;
    this.lastAttemptId = data.lastAttemptId;
  }
}

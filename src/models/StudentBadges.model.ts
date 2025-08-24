export class StudentBadges {
  userId: number;
  lessons: number;
  evaluations: number;
  evaluationsInRange: number;
  evaluationsPerfectScore: number;
  constructor(data: any) {
    this.userId = data.userId;
    this.lessons = data.lessons;
    this.evaluations = data.evaluations;
    this.evaluationsInRange = data.evaluationsInRange;
    this.evaluationsPerfectScore = data.evaluationsPerfectScore;
  }
}

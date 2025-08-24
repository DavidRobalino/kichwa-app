export class StudentProgress {
  userId: number;
  resources: number;
  lessons: number;
  glossaries: number;
  evaluations: number;
  constructor(data: any) {
    this.userId = data.userId;
    this.resources = data.resources;
    this.lessons = data.lessons;
    this.glossaries = data.glossaries;
    this.evaluations = data.evaluations;
  }
}

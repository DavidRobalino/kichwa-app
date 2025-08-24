export class UserLesson {
  id: number;
  isUnlocked: boolean;
  completedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.isUnlocked = data.isUnlocked;
    this.completedAt = data.completedAt;
  }
}

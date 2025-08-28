export class StudentWeeklyLogs {
  userId: number;
  sundayCount: number;
  mondayCount: number;
  tuesdayCount: number;
  wednesdayCount: number;
  thursdayCount: number;
  fridayCount: number;
  saturdayCount: number;
  constructor(data: any) {
    this.userId = data.userId;
    this.sundayCount = data.sundayCount;
    this.mondayCount = data.mondayCount;
    this.tuesdayCount = data.tuesdayCount;
    this.wednesdayCount = data.wednesdayCount;
    this.thursdayCount = data.thursdayCount;
    this.fridayCount = data.fridayCount;
    this.saturdayCount = data.saturdayCount;
  }
}

export class Course {
  id: number;
  name: string;
  picture: string;
  teacherName: string | null;
  teacherId: number | null;
  courseCode: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.picture = data.picture;
    this.teacherName = data.teacherName;
    this.teacherId = data.teacherId;
    this.courseCode = data.courseCode;
  }
}

export type CourseValues = {
  name: string;
  withDefaultLessons?: boolean;
};

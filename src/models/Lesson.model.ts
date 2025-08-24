import { Evaluation } from './Evaluation.model';
import { Glossary } from './Glossary.model';
import { Resource } from './Resource.model';
import { UserInteraction } from './UserInteraction.model';
import { UserLesson } from './UserLesson.model';

export class Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  picture: string;
  order: number;
  isDraft: boolean;
  isUnlocked: boolean;
  // relations
  evaluations: Evaluation[];
  resources: Resource[];
  glossaries: Glossary[];
  // student relations
  userLessons: UserLesson[];
  userInteractions: UserInteraction[];

  constructor(data: any) {
    this.id = data.id;
    this.courseId = data.courseId;
    this.title = data.title;
    this.description = data.description;
    this.picture = data.picture;
    this.order = data.order;
    this.isDraft = data.isDraft;
    this.isUnlocked = data.isUnlocked;
    // relations
    this.resources = data.resources || [];
    this.evaluations = data.evaluations || [];
    this.glossaries = data.glossaries || [];
    // student relations
    this.userLessons = data.userLessons || [];
    this.userInteractions = data.userInteractions || [];
  }
}

export type CreateLessonValues = {
  title: string;
  description: string;
  picture: string;
};

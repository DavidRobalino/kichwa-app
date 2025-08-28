export class Glossary {
  id: number;
  lessonId: number;
  title: string;
  content: IGlossaryContent[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.lessonId = data.lessonId;
    this.title = data.title;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export interface IGlossaryContent {
  kichwa: string;
  spanish: string;
}

export type CreateGlossaryValues = {
  title: string;
  content: IGlossaryContent[];
};

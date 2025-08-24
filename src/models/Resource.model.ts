export class Resource {
  id: number;
  lessonId: number;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.lessonId = data.lessonId;
    this.name = data.name;
    this.url = data.url;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export type ResourceValues = {
  name: string;
};

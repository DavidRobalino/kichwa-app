export enum ActionType {
  VIEW_LESSON = 'view_lesson',
  DOWNLOAD_RESOURCE = 'download_resource',
  VIEW_GLOSSARY = 'view_glossary',
  COMPLETE_EVALUATION = 'complete_evaluation',
}

export class UserInteraction {
  id: number;
  lessonId: number;
  resourceId: number;
  glossaryId: number;
  evaluationId: number;
  type: ActionType;
  actionTimestamp: Date;

  constructor(data: any) {
    this.id = data.id;
    this.lessonId = data.lessonId;
    this.resourceId = data.resourceId;
    this.glossaryId = data.glossaryId;
    this.evaluationId = data.evaluationId;
    this.type = data.type;
    this.actionTimestamp = data.actionTimestamp;
  }
}

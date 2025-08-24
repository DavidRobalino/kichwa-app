import { Account } from './Account.model';
import { UserEvaluation } from './UserEvaluation.model';
import { UserInteraction } from './UserInteraction.model';

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  account?: Account;
  userInteractions: UserInteraction[];
  userEvaluations: UserEvaluation[];

  constructor(data: any) {
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.avatar = data.avatar;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.account = data.account;
    this.account = data.account ? new Account(data.account) : undefined;
    this.userInteractions = data.userInteractions || [];
    this.userEvaluations = data.userEvaluations || [];
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export type UserValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isTeacher: boolean;
};

export type UpdateUserValues = {
  dni: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
};

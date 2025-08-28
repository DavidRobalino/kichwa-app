import { User } from './User.model';

export class Account {
  email: string;
  isActive: boolean;
  user?: User;

  constructor({ email, isActive, user }: any) {
    this.email = email;
    this.isActive = isActive;
    this.user = user ? new User(user) : undefined;
  }
}

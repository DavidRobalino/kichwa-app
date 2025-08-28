export class Profile {
  userId: number;
  email: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;

  constructor(data: any) {
    this.userId = data.userId;
    this.email = data.email;
    this.isActive = data.isActive;
    this.roles = data.roles;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.avatar = data.avatar;
  }
}

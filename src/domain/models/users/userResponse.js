import { User } from './user';

export class UserResponse {
  constructor({ message, token, user }) {
    this.message = message;
    this.token = token;
    this.user = new User(user);
  }
}

import { User } from "./user.model";

export default class UserResponse {
  returnCode: number;
  message: string;
  user: User;

  constructor(returnCode: number, message: string, user: User) {
    this.returnCode = returnCode;
    this.message = message;
    this.user = user;
  }
}

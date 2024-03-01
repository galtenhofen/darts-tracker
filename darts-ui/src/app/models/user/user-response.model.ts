import { User } from "./user.model";

export default class UserResponse {
  returnCode: number;
  message: string;
  users: User[];

  constructor(returnCode: number, message: string, users: User[]) {
    this.returnCode = returnCode;
    this.message = message;
    this.users = users;
  }
}

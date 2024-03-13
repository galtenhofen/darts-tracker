import { User } from "./user.model";

export default class UsersResponse {
  returnCode: number;
  message: string;
  users: User[];

  constructor(returnCode: number, message: string, users: User[]) {
    this.returnCode = returnCode;
    this.message = message;
    this.users = users;
  }
}

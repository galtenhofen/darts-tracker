import { User } from "./user/user.model";

export interface Team {
    teamId: number;
    teamName: string;
    users: User[];
  }
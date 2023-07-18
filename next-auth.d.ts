import { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    questions: string[];
  }

  interface Session {
    user: User;
  }
}
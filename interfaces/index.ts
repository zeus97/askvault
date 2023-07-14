import { User, Session } from 'next-auth'

export interface IUser{
    id?:string,
    name:string,
    email:string,
    image:string,
    questions:string[]
};

export interface SessionInterface extends Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    };
  };
  
export interface Question{
    creator:string,
    question:string,
    answers:string[]
};
export interface IUser{
    id:string,
    name:string,
    email:string,
    image:string,
    questions:string[]
};

  
export interface IQuestion{
    creator:{
      id:string,
      name:string,
      image:string
    },
    question:string,
    answers:IAnswer[]
};

export interface IAnswer{
  id:string,
  name:string,
  image:string,
  answer:string
};
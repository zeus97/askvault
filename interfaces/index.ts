export interface IUser{
    id:string,
    name:string,
    email:string,
    image:string,
    questions:string[]
};

export interface ICreator{
  id:string,
  name:string,
  image:string
};

  
export interface IQuestion{
    id:string,
    creator:ICreator,
    question:string,
    answers:IAnswer[]
};

export interface IAnswer{
  id:string,
  questionID:string,
  name:string,
  image:string,
  answer:string
};
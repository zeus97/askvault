export interface IUser{
    id:string,
    name:string,
    email:string,
    image:string,
    questions:string[]
};

  
export interface Question{
    creator:{
      id:string,
      name:string,
      image:string
    },
    question:string,
    answers:Answer[]
};

export interface Answer{
  id:string,
  name:string,
  image:string,
  answer:string
};
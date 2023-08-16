import { IAnswer, ICreator } from "@/interfaces";



export class Question{
    creator: ICreator;
    question:string;
    answers:IAnswer[];
    
    constructor(creator:ICreator,question:string,answers:IAnswer[]){
        this.creator = creator;
        this.question = question;
        this.answers = answers; 
    }
};
import { IQuestion } from "@/interfaces";
import Question from "@/models/question";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){

    const {searchParams} = new URL(req.url);
    const questionID = searchParams.get("id");

    if(questionID){
        try{
            await connectToDB();
            
            const response = await Question.findById(questionID);
            const question:IQuestion ={
                id:response._id.toString(),
                creator:response.creator,
                question:response.question,
                answers:response.answers
            };
            
    
            return new Response(JSON.stringify(question),{status:200});
    
        }catch(error){
            console.log("Error obtaining question by ID",error);
            return new Response("Error obtaining question by ID",{status:404})
        }
    }else{
        try{
            await connectToDB();
            const response = await Question.find({});
            
    
            const questions:IQuestion[] = response.map((q)=>{
                return {
                    id:q._id.toString(),
                    creator:q.creator,
                    question:q.question,
                    answers:q.answers
                }
            })
    
            return new Response(JSON.stringify(questions),{status:200});
    
        }catch(error){
            console.log("Error obtaining questions",error);
            return new Response("Error obtaining questions",{status:404})
        }

    }

}
import { authOptions } from "@/lib/session";
import Question from "@/models/question";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    const session = await getServerSession(authOptions);

    if(session){
        try{
            const body = await req.json();
            const { id, questionID, answer } = body;
            if(id && questionID && answer){
                const question = await Question.findById(questionID);
                const questionAnswers:any[] = question.answers;
                if(questionAnswers.some((e)=> e.id === id)){
                console.log("You already answer this question");
                return new Response("You already answer this question",{status:400})
                }
                if(answer.length > 5 && answer.length <= 250){
                    await Question.findOneAndUpdate({"_id":questionID},{$push:{"answers":body}});
                    console.log("Answer created");
                    return new Response("Answer created",{status:200})    
                }
                
            }else{
                console.log("Data missing");
                return new Response("Data missing",{status:400})
            }



        }catch(error){
            console.log("Error trying to create the answer:",error)
        }

    }else{
        console.log("Not authorized");
        return new Response("Not authorized",{status:400})
    }
};
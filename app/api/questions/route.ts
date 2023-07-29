import { IQuestion } from "@/interfaces";
import Question from "@/models/question";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){

    try{
        await connectToDB();
        const response = await Question.find({});
        

        const questions:any = response.map((q)=>{
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
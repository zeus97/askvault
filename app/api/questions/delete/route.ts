import { authOptions } from "@/lib/session";
import Question from "@/models/question";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,res:NextResponse){
    const session = await getServerSession(authOptions);
    

    if (session){
        const {searchParams} = new URL(req.url);
        const questionID = searchParams.get("id");
        const userID = session.user._id.toString();
        if(questionID && userID){
            try{
                const questionToDelete = await Question.findById(questionID);
                let creator = questionToDelete.creator.id;
                if(creator === userID){
                    await Question.findByIdAndDelete(questionID);
                    return new Response(JSON.stringify({message:"Question deleted"}),{status:200})
                }else{
                    console.log("Not authorized to delete this question");
                    return new Response("Not authorized to delete this question",{status:404}) 
                }
    
            }catch(error){
                console.log("Error deleting the question in DB",error)
            }

        }else{
            console.log('Query ID is missing');
            return new Response("Query ID is missing",{status:404})
        }

    }else{
        console.log('Not authorized');
        return new Response("Not authorized",{status:404})
    }
}
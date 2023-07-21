import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/session";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { IUser } from "@/interfaces";
import Question from "@/models/question";



export async function GET(req:NextRequest,res:NextResponse){
    const session = await getServerSession(authOptions);

    if(session){

        const userID = session.user._id.toString();
        const {searchParams} = new URL(req.url);
        const paramID = searchParams.get("id");

        if(paramID){
            
            if(userID === paramID){
                
                try{
                    await connectToDB();
    
                    const userInfo = await User.findById(userID);
                    const questionsID = userInfo.questions;
                    
                    const questions = await Question.find({
                        "_id":{
                            $in:questionsID
                        }
                    })
                    
                    return new Response(JSON.stringify(questions),{status:200})
                }catch(error){
                    console.log(error);
              return new Response(JSON.stringify({message:'Error obtaining data'}),{status:400})
                }
    
            }else{
                return new Response(JSON.stringify({message:'Invalid ID'}),{status:400})
            }
        }else{

            return new Response(JSON.stringify({message:'ID param is missing'}),{status:400})
        }

        

    }else{
        return new Response(JSON.stringify({message:'Not authorized'}),{status:400})
    }

}
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";
import { IQuestion } from '@/interfaces';
import { NextRequest } from 'next/server';
import { connectToDB } from '@/utils/database';
import Question from '@/models/question';
import User from '@/models/user';

export async function POST (req:NextRequest){
    const session = await getServerSession(authOptions);

    
    
    if (session) {
      //Signed in
      const body:IQuestion = await req.json();

      const {creator, question} = body;
      const {id, name, image} = creator;

      if(id && name && image && question){

        try{

          await connectToDB();
  
          const questionGenerated = await Question.create(body);
          let idq = questionGenerated._id.toString() ;

          await User.findOneAndUpdate({"_id":id},{$push:{"questions":idq}})
  
          return new Response(JSON.stringify(
            {message:'Question created',
            questionID:idq}),{status:200})

        }catch(error){
          console.log(error);
          return new Response(JSON.stringify({message:'Error creating the question'}),{status:400})
        }

    
  
      }else{return new Response(JSON.stringify({message:'Missing info'}),{status:400})}

    } else {
          //Not Signed in
          return new Response(JSON.stringify({message:'Not authorized'}),{status:400})
        }
}


import { NextApiRequest, NextApiResponse} from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";
import { Question } from '@/interfaces';

export const POST = async (req: NextApiRequest,res: NextApiResponse)=>{
    const session = await getServerSession(req, res, authOptions);

    

    if (session) {
        // Signed in
        const question: Question = req.body;
        console.log(question);
      } else {
        // Not Signed in
        res.status(401).send({message:'Not authorized'});
      }
}
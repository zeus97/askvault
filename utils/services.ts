import axios from 'axios';
import { IQuestion } from "@/interfaces";

export const createQuestion = async (question:IQuestion)=>{
    try{
        const res = await axios.post('/api/profile/create',question,{headers:{'Content-Type':'application/json'}});
        
        return res.data;

    }catch(error){
        console.log(`[Error creating question]:${error}`)
    }
}
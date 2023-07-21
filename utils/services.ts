import axios from 'axios';
import { IQuestion } from "@/interfaces";

export const createQuestion = async (question:IQuestion)=>{
    try{
        const res = await axios.post('/api/profile/create',question,{headers:{'Content-Type':'application/json'}});
        
        return res;

    }catch(error){
        console.log(`[Error creating question]:${error}`)
    }
};

export const getProfileQuestions = async (id:string)=>{
try{
    const res = await axios.get(`/api/profile?id=${id}`);

    return res;
}catch(error){
    console.log(`[Error obtaining profile data]:${error}`)
}
};
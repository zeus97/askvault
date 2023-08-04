import axios from 'axios';
import { IQuestion } from "@/interfaces";

export const createQuestion = async (question:any)=>{
    try{
        const res = await axios.post('/api/profile/create',question,{headers:{'Content-Type':'application/json'}});
        
        return res;

    }catch(error){
        console.log(`[Error creating question]:${error}`)
    }
};

export const getAllQuestions = async ()=>{
    try{
        const res = await axios.get("/api/questions")

        return res;

    }catch(error){
        console.log(`[Error obtaining questions]:${error}`)
    }
}

export const getProfileQuestions = async (id:string)=>{
try{
    const res = await axios.get(`/api/profile?id=${id}`);

    return res;
}catch(error){
    console.log(`[Error obtaining profile data]:${error}`)
}
};

export const deleteQuestionByID = async (id:string)=>{
    try{
        const res = await axios.delete(`/api/questions/delete?id=${id}`);

        return res;
        
    }catch(error){
        console.log(`[Error deleting question ]:${error}`)
    }
};

export const getQuestionByID = async (id:string)=>{
    try{
        const res = await axios.get(`/api/questions?id=${id}`);

        return res;
        
    }catch(error){
        console.log(`[Error obtaining question by ID ]:${error}`)
    }
};

export const createAnswer = async (answer:any)=>{
    try{
        const res = await axios.post('/api/answer',answer,{headers:{'Content-Type':'application/json'}});
        
        return res;

    }catch(error){
        console.log(`[Error creating answer]:${error}`)
    }
}
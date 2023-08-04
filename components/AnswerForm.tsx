"use client"
import React, { useState } from 'react';
import { useSession } from "next-auth/react"
import '@/styles/AnswerForm.scss';
import { createAnswer } from '@/utils/services';


interface Props{
    id:string
}

function AnswerForm({id}:Props) {
    const {data} = useSession();
    const userInfo = data?.user;
    
    const [dataForm, setDataForm] = useState<string>('');
    const [countWords, setCountWords] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorCreatingQuestion, setErrorCreatingQuestion] = useState<boolean>(false);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    
    


    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        setDataForm(e.target.value);
        const words = e.target.value.length;
        setCountWords(words);
        if(words < 5){
            setErrorMessage('The answer is too short.');
        }else if(words >= 100){
            setErrorMessage('The answer is too long.');
        }else{setErrorMessage('');}
        
        
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setErrorMessage('');
        setErrorCreatingQuestion(false);
        const words = dataForm.length;
        
        if(words < 5){
            return;
        }
        if(words >= 100){
            return;
        }
        if(userInfo){
            
            const answer = {
                id:userInfo._id.toString(),
                questionID: id,
                name:userInfo.name,
                image:userInfo.image,
                answer:dataForm,
            };
            setLoadingButton(true);
            const response = await createAnswer(answer);
            setLoadingButton(false);
            if(response && response.status === 200){
                setDataForm("");
                alert("Answer created")
            
            }else{
            setErrorCreatingQuestion(true);
            }
           
         }

    }

  return (
    <form className='answer-form'
    onSubmit={handleSubmit}>
        <textarea id='answer-area'
         placeholder='Answer this question.'
         onChange={handleChange}
         value={dataForm}>
         </textarea>
         <div className='answer-form-info'>
            <span className='error-msg'>
                {errorMessage}
            </span>
            <span className='counter-words'
            style={countWords >= 100 ? {color:'#f00000'} : undefined}>
                {`${countWords}/100`}
            </span>
         </div>
        {countWords > 5 && countWords < 100 &&
        <button type='submit'
        className='btn btn-primary'>
            {loadingButton ?
            <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            :
            "Created"}
        </button>}
        {errorCreatingQuestion && <p style={{color:"#f00000"}}> Something went wrong, try later.</p>}
    </form>
  )
}

export default AnswerForm
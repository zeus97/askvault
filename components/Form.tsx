"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import '@/styles/Form.scss';
import { createQuestion } from '@/utils/services';
import { ICreator } from '@/interfaces';
import { Question } from '@/utils/classes';






function Form() {

    const {data} = useSession();
    const userInfo = data?.user;

    const navigate = useRouter();

    
    const [dataForm, setDataForm] = useState<string>('');
    const [countWords, setCountWords] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorCreatingQuestion, setErrorCreatingQuestion] = useState<boolean>(false);
    
    


    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        setDataForm(e.target.value);
        const words = e.target.value.length;
        setCountWords(words);
        if(words < 5){
            setErrorMessage('The question is too short.');
        }else if(words >= 100){
            setErrorMessage('The question is too long.');
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
            const questionCreator:ICreator = {
                id:userInfo._id.toString(),
                name:userInfo.name || 'Anonymous',
                image:userInfo.image || '/user-default.svg'
              }

            const question = new Question(questionCreator,dataForm,[])
           
            setIsLoading(true);
           const response = await createQuestion(question);
           setIsLoading(false);
           if(response && response.status === 200){
            let idQuestion = response.data.questionID
            navigate.push(`/question?id=${idQuestion}`)
           }else{
            setErrorCreatingQuestion(true);
           }
           
        }

    }

  return (
    <form className='ask-form'
    onSubmit={handleSubmit}>
        <textarea id='question-area'
         placeholder='example: How do you define success in life?...'
         onChange={handleChange}>
         </textarea>
         <div className='ask-form-info'>
            <span className='error-msg'>
                {errorMessage}
            </span>
            <span className='counter-words'
            style={countWords >= 100 ? {color:'#f00000'} : undefined}>
                {`${countWords}/100`}
            </span>
         </div>
        <button type='submit'
        className='btn btn-primary'>
            {isLoading ?
                <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>
            :
                "Create"

            }
            
        </button>
        {errorCreatingQuestion && <p style={{color:"#f00000"}}> Something went wrong, try later.</p>}
    </form>
  )
}

export default Form
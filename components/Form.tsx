"use client"
import React, { useState } from 'react';
import { useSession } from "next-auth/react"
import '@/styles/Form.scss';
import { IUser, IQuestion } from '@/interfaces';
import { createQuestion } from '@/utils/services';






function Form() {

    const {data} = useSession();
    const userInfo = data?.user;

    
    const [dataForm, setDataForm] = useState<string>('');
    const [countWords, setCountWords] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    
    


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
        const words = dataForm.length;
        if(words < 5){
            return;
        }
        if(words >= 100){
            return;
        }
        if(userInfo){
            
            const question:IQuestion = {
                creator:{
                   id:userInfo._id,
                   name:userInfo.name || 'Anonymous',
                   image:userInfo.image || '/user-default.svg'
                 },
                 question:dataForm,
                 answers:[]
            };
           const info = await createQuestion(question);
           console.log(info)
           
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
            Create
        </button>
    </form>
  )
}

export default Form
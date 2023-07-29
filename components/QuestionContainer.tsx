"use client"
import React, { useState, useEffect } from 'react';
import { IQuestion } from '@/interfaces';
import { getAllQuestions } from '@/utils/services';
import Question from './Question';
import '@/styles/QuestionContainer.scss';

const QuestionContainer = () => {

    const [questions, setQuestions] = useState<IQuestion[]>([]);

    useEffect(()=>{
        getAllQuestions().then((res)=>{setQuestions(res?.data)})
        
    },[])

         



  return (
    <div className='container questions-c'>
        {questions.map((q,i)=>{
            return (
                <Question
                name={q.creator.name}
                picture={q.creator.image}
                question={q.question}
                id={q.id}
                key={i} />
            )
        })}

    </div>
  )
}

export default QuestionContainer
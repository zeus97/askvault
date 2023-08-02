"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import './page.scss'
import { getQuestionByID } from '@/utils/services'
import { IQuestion } from '@/interfaces'
import LoadingPage from '@/components/LoadingPage'

function QuestionPage() {

  const [error, setError] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<IQuestion | null>(null);
  const params = useSearchParams();

  const fetchingQuestion = async (id:string )=>{
    const response = await getQuestionByID(id)
    if(response && response.status === 200){
      setQuestionData(response.data);
    }else{
      setError(true);
    }
  };

  
  useEffect(()=>{
      const id = params.get("id");
      if(id){
        fetchingQuestion(id);
      }

    },[])

    if(error){
      return (
        <h2 style={{marginTop:"70px", textAlign:"center"}}>
          404 Error, question not found
        </h2>
      )
    
    };



  return (
    <section className='question-page'>
      {questionData === null ?
        <LoadingPage />

        :

        <div className='container question-page-c'>
          <div className='question-page-q'>
            <div className='question-page-q-userinfo'>
              <Image src={questionData.creator.image} alt='ads' width={80} height={80}/>
              <p>{questionData.creator.name}</p>
            </div>
            <h2>{questionData.question + "?"}</h2>
          </div>
        </div>
      }
    </section>
  )
}

export default QuestionPage
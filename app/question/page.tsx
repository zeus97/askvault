"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import './page.scss'
import { getQuestionByID } from '@/utils/services'
import { IQuestion } from '@/interfaces'
import LoadingPage from '@/components/LoadingPage'
import AnswerForm from '@/components/AnswerForm'
import Answer from '@/components/Answer'
import { useSession } from 'next-auth/react'

function QuestionPage() {

  const session = useSession();
  const [questionData, setQuestionData] = useState<IQuestion | null>(null);
  const [error, setError] = useState<boolean>(false);
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
              <Image src={questionData.creator.image} alt='ads' width={60} height={60}/>
              <p>{questionData.creator.name}</p>
            </div>
            <h2>{questionData.question + "?"}</h2>
          </div>
          {session.data &&
          <AnswerForm
          id={questionData.id} />
          }

          <div className='answers-c'>
            {questionData.answers.map((a,i)=>{
              return(
                <Answer
                image={a.image}
                name={a.name}
                answer={a.answer}
                key={i} />  
              )
            })
            
            }
          </div>
        </div>
      }
    </section>
  )
}

export default QuestionPage
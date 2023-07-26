"use client";
import { IQuestion } from '@/interfaces';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ProfileQuestion from './ProfileQuestion';
import { useSession } from 'next-auth/react';
import { getProfileQuestions } from '@/utils/services';

function ProfileQuestionContainer() {

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: session} = useSession();

    
    
    useEffect(()=>{
      const getQuestions = async ()=>{
        const userInfo = session?.user
        const userID = userInfo?._id;
        if(userID){
          setIsLoading(true);
          const res = await getProfileQuestions(userID)
          setIsLoading(false);
          
          if (res && res.status === 200){
            setQuestions(res.data);
          }
        }
      }
      getQuestions();
      
      },[])
    

    

  return (
    <>
    {isLoading ?
      <LoadingSpinner />
      :

      <div style={{width:'100%',marginTop:'100px',padding:'5px'}}>
          {questions.length < 1 ?
          <h3>You don't have questions</h3>
          :
          questions.map((q,i)=>{
              return (
                  <ProfileQuestion question={q.question}
                  id={q.id}
                  key={i} />
              )
          })
      }
      </div>
    }
    
    
    </>
  )
}

export default ProfileQuestionContainer
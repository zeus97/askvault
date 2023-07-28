"use client";
import { IQuestion } from '@/interfaces';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ProfileQuestion from './ProfileQuestion';
import { useSession } from 'next-auth/react';
import { deleteQuestionByID, getProfileQuestions } from '@/utils/services';
import ConfirmModal from './ConfirmModal';

function ProfileQuestionContainer() {

    const { data: session} = useSession();

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [questionToDelete, setQuestionToDelete] = useState<string>("");

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
    };
    
    
    useEffect(()=>{
      getQuestions();
      
      },[])
    
      const deleteQuestion = (id:string)=>{
        setQuestionToDelete(id);
        setModal(true);
      };

      const closeModal = ()=>{
        setModal(false);
      };

      const deleteQuestionConfirm = async ()=>{
        const res = await deleteQuestionByID(questionToDelete);
        if(res?.status === 200){
          setModal(false);
          alert(res.data.message);
          getQuestions();

        }else{
          alert("Something went wrong, try later");
        }
      }
    

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
                  deleteQuestion={deleteQuestion}
                  key={i} />
              )
          })
      }
      </div>
    }
    
      {modal && 
      <ConfirmModal
      closeModal={closeModal}
      deleteQuestionConfirm={deleteQuestionConfirm} />}
    </>
  )
}

export default ProfileQuestionContainer
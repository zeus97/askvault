"use client";
import { IQuestion } from '@/interfaces';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ProfileQuestion from './ProfileQuestion';
import { useSession } from 'next-auth/react';
import { deleteQuestionByID, getProfileQuestions } from '@/utils/services';
import ConfirmModal from './ConfirmModal';
import Pagination from './Pagination';
import "@/styles/ProfileQuestionContainer.scss";

function ProfileQuestionContainer() {

    const { data: session} = useSession();

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
    const [isLoadingDeleteButton, setIsLoadingDeleteButton] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [questionToDelete, setQuestionToDelete] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getQuestions = async ()=>{
      const userInfo = session?.user
      const userID = userInfo?._id;
      if(userID){
        setIsLoadingQuestions(true);
        const res = await getProfileQuestions(userID)
        setIsLoadingQuestions(false);
        
        if (res && res.status === 200){
          setQuestions(res.data);
        }
      }
    };
    
    
    useEffect(()=>{
      getQuestions();
      
      },[])

    //Modal
    const deleteQuestion = (id:string)=>{
      setQuestionToDelete(id);
      setModal(true);
    };

    const closeModal = ()=>{
      setModal(false);
    };

    const deleteQuestionConfirm = async ()=>{
      setIsLoadingDeleteButton(true);
      const res = await deleteQuestionByID(questionToDelete);
      setIsLoadingDeleteButton(false);
      if(res?.status === 200){
        setModal(false);
        alert(res.data.message);
        getQuestions();

      }else{
        alert("Something went wrong, try later");
      }
    }

    //Pagination
    const itemsLength = questions.length;
    const maxItems: number = 10;
    const paginationLength = Math.ceil(itemsLength / maxItems)
    const maxRange = (currentPage * maxItems ) - 1;
    const minRange = (maxRange - maxItems ) + 1;
    const questionsInPage = questions.slice(minRange,maxRange + 1);

    const previousPage = ()=>{
      if(currentPage > 1){
          setCurrentPage((page)=>page - 1);
      }
    };

    const nextPage = ()=>{
      if(currentPage < paginationLength){
          setCurrentPage((page)=>page + 1);
      }
    };

    const setPage = (page:number)=>{
      setCurrentPage(page);
    };

    

  return (
    <>
    {isLoadingQuestions ?
      <LoadingSpinner />
      :

      <div className='profile-questions-c'>
          {questions.length < 1 ?
          <h3>You don't have questions</h3>
          :
          <div className='profile-questions'>
            {
              questionsInPage.map((q,i)=>{
                  return (
                      <ProfileQuestion question={q.question}
                      id={q.id}
                      deleteQuestion={deleteQuestion}
                      key={i} />
                  )
              })

            }
            <Pagination
            currentPage={currentPage}
            paginationLength={paginationLength}
            nextPage={nextPage}
            previousPage={previousPage}
            setPage={setPage} />
          </div>
      }
      </div>
    }
    
      {modal && 
      <ConfirmModal
      isLoading={isLoadingDeleteButton}
      closeModal={closeModal}
      deleteQuestionConfirm={deleteQuestionConfirm} />}
    </>
  )
}

export default ProfileQuestionContainer
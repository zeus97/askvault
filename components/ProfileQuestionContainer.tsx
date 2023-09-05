"use client";
import { IQuestion } from '@/interfaces';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ProfileQuestion from './ProfileQuestion';
import { useSession } from 'next-auth/react';
import { deleteQuestionByID, getProfileQuestions } from '@/utils/services';
import ConfirmModal from './ConfirmModal';
import "@/styles/ProfileQuestionContainer.scss";
import PaginationComponent from './PaginationComponent';

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
        setCurrentPage(1);

      }else{
        alert("Something went wrong, try later");
      }
    }

    //Pagination
    let PageSize = 10;
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const questionsInPage = questions.slice(firstPageIndex, lastPageIndex);


    

  return (
    <>
    {isLoadingQuestions ?
      <LoadingSpinner />
      :

      <div className='profile-questions-c'>
          {questions.length < 1 ?
          <h3 className='text-center'>You don&#39;t have questions</h3>
          :
          <div className='profile-questions'>
            <div>
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
            </div>
            
            <PaginationComponent
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={questions.length}
            siblingCount={1}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)} />
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
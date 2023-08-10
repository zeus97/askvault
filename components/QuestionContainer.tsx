"use client"
import React, { useState, useEffect } from 'react';
import { IQuestion } from '@/interfaces';
import { getAllQuestions } from '@/utils/services';
import Question from './Question';
import '@/styles/QuestionContainer.scss';
import PaginationComponent from './PaginationComponent';

const QuestionContainer = () => {

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    useEffect(()=>{
        getAllQuestions().then((res)=>{setQuestions(res?.data)})
        
    },[])

    //Pagination
    
    let PageSize = 7;
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const questionsInPage = questions.slice(firstPageIndex, lastPageIndex);


         



  return (
    <div className='container questions-c'>
        <div>
            {questionsInPage.map((q,i)=>{
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

        <PaginationComponent
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={questions.length}
            siblingCount={1}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)} />

    </div>
  )
}

export default QuestionContainer
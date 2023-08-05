"use client"
import React, { useState, useEffect } from 'react';
import { IQuestion } from '@/interfaces';
import { getAllQuestions } from '@/utils/services';
import Question from './Question';
import '@/styles/QuestionContainer.scss';
import Pagination from './Pagination';

const QuestionContainer = () => {

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    useEffect(()=>{
        getAllQuestions().then((res)=>{setQuestions(res?.data)})
        
    },[])

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
    <div className='container questions-c'>
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
        <Pagination
        paginationLength={paginationLength}
        currentPage={currentPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPage={setPage} />

    </div>
  )
}

export default QuestionContainer
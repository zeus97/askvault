import React from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/ProfileQuestion.scss';

interface Props{
    question: string,
    id:string,
    deleteQuestion: (id:string) => void
}

function ProfileQuestion({question,id,deleteQuestion}:Props) {

    const navigate = useRouter();

  return (
    <div className='profile-question'>
        <p onClick={()=>{navigate.push(`/question?id=${id}`)}}>{question}</p>
        <i className="bi bi-trash"
        onClick={()=>{deleteQuestion(id)}}></i>
    </div>
  )
}

export default ProfileQuestion
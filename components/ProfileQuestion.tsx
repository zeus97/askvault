import React from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/ProfileQuestion.scss';

interface Props{
    question: string,
    id:string
}

function ProfileQuestion({question,id}:Props) {

    const navigate = useRouter();

  return (
    <div className='profile-question'>
        <p onClick={()=>{navigate.push(`/question?id=${id}`)}}>{question}</p>
        <i className="bi bi-trash"
        onClick={()=>{confirm('Do you want to delete the question?')}}></i>
    </div>
  )
}

export default ProfileQuestion
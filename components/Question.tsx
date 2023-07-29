import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import "@/styles/Question.scss"

interface Props{
    picture:string,
    name:string,
    question:string,
    id:string
};


function Question({picture,name,question,id}:Props) {

    const router = useRouter(); 

  return (
    <div className='question-box'>
        <div className='question-info'>
            <Image src={picture} alt={name} width={30} height={30} />
            <p className='question-name'>{name}</p>
        </div>
        <p className='question'
        onClick={()=>{router.push(`/question?id=${id}`)}}>{question}</p>
    </div>
  )
}

export default Question
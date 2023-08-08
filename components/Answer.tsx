import React from 'react'
import Image from "next/image"
import "@/styles/Answer.scss"

interface Props{
    image:string,
    name:string,
    answer:string
}

function Answer({image,name,answer}:Props) {
  return (
    <div className='answer-box'>
        <div className='answer-info'>
          <Image src={image} alt={name} width={30} height={30}/>
          <p>{name}</p>
        </div>
        <p className='answer'>{answer}</p>
    </div>
  )
}

export default Answer
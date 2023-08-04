import React from 'react'
import Image from "next/image"

interface Props{
    image:string,
    name:string,
    answer:string
}

function Answer({image,name,answer}:Props) {
  return (
    <div>
        <div>
        <Image src={image} alt={name} width={30} height={30}/>
        <p>{name}</p>
        </div>
        <p>{answer}</p>
    </div>
  )
}

export default Answer
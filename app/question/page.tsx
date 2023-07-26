"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'

function QuestionPage() {

    const params = useSearchParams();
    const id = params.get("id");

  return (
    <section>
        question page..
    </section>
  )
}

export default QuestionPage
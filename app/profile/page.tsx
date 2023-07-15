"use client"
import React from 'react'
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
//components
import LoadingPage from '@/components/LoadingPage';
import Nav from '@/components/Nav';

function Profile() {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <LoadingPage />
      }

    if (status === "unauthenticated") {
        return router.push('/')
      } 

  return (
    <section>
        <Nav />
        <h1 style={{marginTop:'100px'}}>Profile Page</h1>
    </section>
  )
}

export default Profile
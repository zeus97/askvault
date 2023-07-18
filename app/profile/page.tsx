"use client"
import React, { useState } from 'react'
import './page.scss';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
//components
import LoadingPage from '@/components/LoadingPage';
import Nav from '@/components/Nav';
import Form from '@/components/Form';
import { IUser } from '@/interfaces';


function Profile() {

    const { data: session , status } = useSession();
 
    
    const router = useRouter();

    if (status === "loading") {
        return <LoadingPage />
      }

    if (status === "unauthenticated") {
        return router.push('/')
      }
      
    


  return (
    <section className='profile-page'>
        <Nav />
        <div className='container profile-c'>
          <div className='row profile-row'>
            <div className='col-6 profile-column'>
              <h2>Your questions</h2>
              <div>

              </div>
            </div>
            <div className='col-6 profile-column'>
              <h2>Ask something</h2>
               <Form /> 
            </div>

          </div>
        </div>
    </section>
  )
}

export default Profile
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
import { getProfileQuestions } from '@/utils/services';


function Profile() {

    const { data: session , status } = useSession();
    
    
    const router = useRouter();

    if (status === "loading") {
        return <LoadingPage />
      }

    if (status === "unauthenticated") {
        return router.push('/')
      }

    if(session){
      const getQuestions = async ()=>{
        const userInfo = session.user
        const userID = userInfo._id;
        const res = await getProfileQuestions(userID)
        console.log(res);
      }
      getQuestions();
    }
      
    


  return (
    <section className='profile-page'>
        <Nav />
        <div className='container profile-c'>
          <div className='row profile-row'>
            <div className='col-md-12 col-lg-6 profile-column'>
              <h2>Your questions</h2>
              <div>

              </div>
            </div>
            <div className='col-md-12 col-lg-6  profile-column'>
              <h2>Ask something</h2>
               <Form /> 
            </div>

          </div>
        </div>
    </section>
  )
}

export default Profile
import React from 'react'
import './page.scss'
import Image from 'next/image'


import AuthProviders from '@/components/AuthProviders'

function SignupPage() {
  return (
    <div className='container-fluid signup-page'>
        <div className='row signup-box'>
            <div className='col-6 column-1'>
                <Image src='/signup-icon.svg' alt='signup icon' width={400} height={400}/>
            </div>
            <div className='col-6 column-2'>
                <AuthProviders />
            </div>
        </div>
    </div>
  )
}

export default SignupPage
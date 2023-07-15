import React from 'react'
import './page.scss'
import Image from 'next/image'


import AuthProviders from '@/components/AuthProviders'

function SignupPage() {
  return (
    <div className='container-fluid signup-page'>
        <div className='row signup-box'>
            <div className='col-6  column-1'>
                <Image src='/signup-icon.svg' alt='signup icon' width={400} height={400}/>
            </div>
            <div className='col-md-6 col-sm-12  column-2'>
                <Image src='/logo.svg' alt='AskVault logo' width={80} height={80} />
                <h2 className='signup-title'>Sign In</h2>
                <p className='signup-text'>and ask whatever you want to know.</p>
                <AuthProviders />
            </div>
        </div>
    </div>
  )
}

export default SignupPage
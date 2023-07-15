"use client"
import React  from 'react';
import { signOut, useSession } from 'next-auth/react';
import '@/styles/Nav.scss';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo.svg';


const Nav = ()=> {

 
  const session = useSession();


  return (
    <header>
        <nav>
            <Image src={logo} alt='Askvault logo' width='70' height='70'/>
            {session?.data?.user ?
            <div>
              <Link href='/profile' className='profile-link'>
                My Profile
              </Link>
              <Link href='/'>
                <button type='button'
                className='explore-btn'>
                  Explore
                </button>
              </Link>
              <button type='button'
              className='signout-btn'
              onClick={()=> {signOut()}}>
                Sign Out
              </button>
            </div>
            :
            <div>
                <Link href='/signup'>
                  <button type='button' className='signup-btn'>
                    Sign Up
                  </button> 
                </Link>
            </div>


            }
        </nav>
    </header>
  )
}

export default Nav
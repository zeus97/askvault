"use client"
import React, { useState, useEffect }  from 'react';
import { signOut, useSession } from 'next-auth/react';
import '@/styles/Nav.scss';
import Image from 'next/image';
import Link from 'next/link';


import logo from '@/public/logo.svg';


const Nav = ()=> {

 
  const {data} = useSession();

  const [showList, setShowList] = useState<boolean>(false);
  const [navAnimation, setNavAnimation] = useState<boolean>(false);

  const scrollAnimation = ()=>{
    if(window.scrollY >= 100){
      setNavAnimation(true);
    }else{setNavAnimation(false);}
  };

  const showMobileList = ()=>{
    setShowList((s)=>!s);
  };

  useEffect(()=>{
    window.addEventListener("scroll",scrollAnimation)

    return ()=> window.removeEventListener("scroll",scrollAnimation)
  },[])


  return (
    <header className={navAnimation ? "nav-animation" : undefined}>
        <nav>
            <Link href="/">
              <Image src={logo} alt='Askvault logo' width='70' height='70'/>
            </Link>
            {data?.user ?
            <div className='nav-c'>
              <div className='desktop-nav-list'>
                <Link href='/profile' className='profile-link'>
                  <Image src={data.user.image || "/user-default.svg"}
                  alt='user-image'
                  width={50}
                  height={50}
                  className='user-image'/>
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
              <i className="bi bi-list burger-icon"
              onClick={showMobileList}></i>
              {showList &&
                <div className='mobile-nav-list'>
                  <Link href='/profile'
                  onClick={showMobileList}>
                    My profile
                  </Link>
                  <Link href='/'
                  onClick={showMobileList}>
                    Explore
                  </Link>
                  <p onClick={()=>{signOut()}}>Sign Out</p>
                </div>
              }
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
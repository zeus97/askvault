import React from 'react';
import '@/styles/Footer.scss';
import { ABOUTUS, SOCIALMEDIA, SUPPORT } from '@/utils/constants';
import Link from 'next/link';

function Footer() {

  const date = new Date();
  const year = date.getFullYear(); 

  return (
    <footer className='container-fluid footer'>
      <div className='row row-1'>
        <div className='col-4 footer-col'>
          <p>{ABOUTUS.title}</p>
          {ABOUTUS.links.map((link,i)=>{
            return (
              <Link href={link.url}
               key={i}
               target='_blank'>
                {link.name}
              </Link>
            )
          })}
        </div>
        <div className='col-4 footer-col'>
          <p>{SUPPORT.title}</p>
          {SUPPORT.links.map((link,i)=>{
            return(
              <Link href={link.url}
               key={i}>
                {link.name}
              </Link>
            )
          })

          }
        </div>
        <div className='col-4 footer-col'>
          <p>{SOCIALMEDIA.title}</p>
          {SOCIALMEDIA.links.map((link,i)=>{
            return(
              <Link href={link.url}
               key={i}
               target='_blank'>
                {link.name}
              </Link>
            )
          })

          }
        </div>
      </div>
      <div className='row row-2'>
        <p>Copyright &copy; {year} AskVault Inc. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
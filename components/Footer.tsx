import React from 'react';
import '@/styles/Footer.scss';

function Footer() {

  const date = new Date();
  const year = date.getFullYear(); 

  return (
    <footer className='container-fluid footer'>
      <div className='row row-1'>
        <div className='col-4 footer-col'>
          <p>About Us</p>
          <a href='#'>Developer</a>
          <a>Company</a>
        </div>
        <div className='col-4 footer-col'>
          <p>Support</p>
          <a>Contact</a>
          <a>Usage Policy</a>
        </div>
        <div className='col-4 footer-col'>
          <p>Social Media</p>
          <a>Linkedin</a>
          <a>GitHub</a>
        </div>
      </div>
      <div className='row row-2'>
        <p>Copyright &copy; {year} AskVault Inc. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
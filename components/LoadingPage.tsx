import React from 'react';
import '@/styles/LoadingPage.scss';
import LoadingSpinner from './LoadingSpinner';


function LoadingPage() {

  return (
    <div className='loading-page'>
      <LoadingSpinner />
    </div>
  )
}

export default LoadingPage
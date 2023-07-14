import React from 'react';
import '@/styles/LoadingPage.scss';


function LoadingPage() {

  return (
    <div className='loading-page'>
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </div>
  )
}

export default LoadingPage
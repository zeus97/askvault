import React from 'react';
import '@/styles/LoadingSpinner.scss';

export default function LoadingSpinner() {
  return (
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
  )
}

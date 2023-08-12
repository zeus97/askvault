import React from 'react'
import './page.scss'
import { TERMS } from '@/utils/constants'

function Terms() {
  return (
    <section className='terms-page'>
        <h2 className='terms-title'>{TERMS.title}</h2>
        <div className='container terms-c'>
            {TERMS.term.map((t,i)=>{
                return (
                    <div key={i}>
                        <h3 className='term-name'>{t.name}</h3>
                        <p className='term-text'>{t.text}</p>
                    </div>
                )
            })}
            <p className='terms-agree'>
                By using the Service, you agree to these Terms and acknowledge
                that you have read and understood them.
            </p>

        </div>
    </section>
  )
}

export default Terms
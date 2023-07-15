"use client"
import React, { useState, useEffect} from 'react';
import { getProviders, signIn} from 'next-auth/react';
import Image from 'next/image';

import '@/styles/AuthProviders.scss';
import LoadingSpinner from './LoadingSpinner';

type Provider = {
    id:string,
    name:string,
    type:string,
    signinUrl:string,
    callbackUrl:string,
    signinUrlParams?:Record<string,string> | null
};

type Providers = Record<string,Provider>;

const AuthProviders = ()=> {

    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(()=>{
        const fetchProviders = async ()=>{
            const res = await getProviders();
            setProviders(res);
        }

        fetchProviders();
    },[])

    if(providers){
        return (
            <div>
                {Object.values(providers).map(
                    (provider:Provider,i)=>(
                        <div key={i}
                        className='signup-social'
                        onClick={()=>signIn(provider?.id,{callbackUrl:'/'})}>
                            <Image src={`./${provider.id}-icon.svg`}
                             alt={provider?.id} 
                             width={40}
                             height={40} />
                            <p>{`Sign in with ${provider?.id}`}</p>
                        </div>
                    )
                )
                
                }
                
                
            </div>
        )
    }else{
        return (
            <LoadingSpinner />
        )
    }

  
}

export default AuthProviders
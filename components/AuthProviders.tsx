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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        const fetchProviders = async ()=>{
            const res = await getProviders();
            setProviders(res);
        }

        fetchProviders();
    },[])

    const handleProvider = (provider:string)=>{
        setIsLoading(true);
        signIn(provider,{callbackUrl:'/'});
    };

    if(providers){
        return (
            <div>
                {Object.values(providers).map(
                    (provider:Provider,i)=>(
                        <div key={i}
                        className='signup-social'
                        onClick={()=>handleProvider(provider.id)}>
                            <Image src={`./${provider.id}-icon.svg`}
                             alt={provider?.id} 
                             width={40}
                             height={40} />
                            {isLoading ?
                            <div className='text-center w-100'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                            :
                            <p>{`Sign in with ${provider?.id}`}</p>}
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
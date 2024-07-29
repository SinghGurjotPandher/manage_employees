'use client'

import { error } from "console";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import React, { useState } from 'react';

export default function LoginPage() {

    const [errorMessage, setErrorMessage] = useState('');


    let router = useRouter();

    let handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginInfo = new FormData(e.currentTarget);
        let response = await signIn('credentials',{
            email: loginInfo.get('email'),
            password: loginInfo.get('password'),
            redirect: false
        });

        if (response?.error) {
            setErrorMessage('Incorrect email or password. Please try again.')
            console.log('ERROR WHILE LOGGING IN')
        }
        else {
            setErrorMessage('')
            router.push('/home')
        }
    }

    return (
        <section className="flex place-items-center h-screen">
            <div className='container mx-auto flex flex-col gap-10 max-w-lg bg-cyan-100 rounded p-20'>

                <h1 className='flex justify-center font-bold text-2xl'> Login </h1>

                {errorMessage != '' && <h1 className="text-red-500 font-semibold">{errorMessage}</h1> }

                <form className="flex flex-col" onSubmit={handleLogin}>                
                    <label>
                        Email <span className="text-red-500">*</span>
                        <input required type='email' name='email' className="field"/>
                    </label>

                    <label>
                        Password <span className="text-red-500">*</span>
                        <input required type='password' name='password' className="field"/>
                    </label>

                    <button className='button p-3 text-lg mt-5'>
                        Login
                    </button>
                </form>
            </div>
        </section>
    )
}
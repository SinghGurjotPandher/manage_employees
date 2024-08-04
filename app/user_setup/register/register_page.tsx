'use client'

import { FormEvent } from "react";
import RoleInformation from "./department_roles";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";


function Demographics() {
    return (
        <div className="flex flex-col">
            <label>
                Name <span className="text-red-500">*</span>
                <input required type='text' name='name' className="field"/>
            </label>

            <label>
                Date of Birth <span className="text-red-500">*</span>
                <input required type='date' name='date_of_birth' className="field"/>
            </label>

            <label>
                Phone Number <span className="text-red-500">*</span>
                <input required type='tel' name='phone_number' className="field" placeholder="000-000-0000" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
            </label>

            <label>
                Gender
                <input type='text' name='gender' className="field"/>
            </label>

            <label>
                Pronouns
                <input type='text' name='pronouns' className="field"/>
            </label>
        </div>
    )
}


function SetupLoginInformation() {
    return (
        <div className="flex flex-col">
            <label>
                Email <span className="text-red-500">*</span>
                <input required type='email' name='email' className="field" placeholder="xxxxx@gmail.com"/>
            </label>

            <label>
                Password <span className="text-red-500">*</span>
                <input required type='password' name='password' className="field"/>
            </label>
        </div>
    )
}


export default function RegisterPage() {
    let router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');


    let handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let userRegData = new FormData(e.currentTarget);
        let response = await fetch ('/api/register_user', {
            method: 'POST',
            body: JSON.stringify({
                name: userRegData.get('name'),
                date_of_birth: userRegData.get('date_of_birth'),
                phone_number: userRegData.get('phone_number'),
                gender: userRegData.get('gender'),
                pronouns: userRegData.get('pronouns'),
                department: userRegData.get('department'),
                role: userRegData.get('role'),
                email: userRegData.get('email'),
                password: userRegData.get('password')
            })
        })

        let result = await response.json();

        if (result.error != undefined) {
            console.log(result.error)
            setErrorMessage(`DATABASE ERROR: ${result.error.detail}`);
        }
        else {
            setErrorMessage('');
            router.push(`/user_setup/register/successful`);
        }
    };

    return (
        <section className="flex place-items-center h-screen">
            <div className='container mx-auto flex flex-col gap-10 max-w-lg bg-cyan-100 rounded p-20'>

                <h1 className='flex justify-center font-bold text-2xl'> Register a New User </h1>

                <form className="flex flex-col" onSubmit={handleRegistration}>
                    <h3 className='small_heading'> Demographics </h3>
                    <Demographics />

                    <h3 className='small_heading mt-3'> Role Information </h3>
                    <RoleInformation />

                    <h3 className='small_heading mt-3'> Setup Login Information </h3>
                    <SetupLoginInformation />

                    <p className="text-red-500 font-semibold"> {errorMessage} </p>

                    <button className='button p-3 text-lg mt-5'>
                        Register
                    </button>
                </form>
            </div>
        </section>
    )
}
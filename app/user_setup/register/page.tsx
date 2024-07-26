import { FormEvent } from "react";
import RoleInformation from "./department_roles";
import React, { useState } from 'react';


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
    return (
        <section className="flex place-items-center h-screen">
            <div className='container mx-auto flex flex-col gap-10 max-w-lg bg-cyan-100 rounded p-20'>

                <h1 className='flex justify-center font-bold text-2xl'> Register a New User </h1>

                <form className="flex flex-col">
                    <h3 className='small_heading'> Demographics </h3>
                    <Demographics />

                    <h3 className='small_heading mt-3'> Role Information </h3>
                    <RoleInformation />

                    <h3 className='small_heading mt-3'> Setup Login Information </h3>
                    <SetupLoginInformation />

                    <button className='button p-3 text-lg'>
                        Register
                    </button>
                </form>
            </div>
        </section>
    )
}
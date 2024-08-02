'use client'
import { signOut } from "next-auth/react";

export default function Logout({formatting} : {formatting: string}) {
    return (
        <button onClick={ () => {
            signOut();
        }} className={formatting}>
            Logout
        </button>
    )
}
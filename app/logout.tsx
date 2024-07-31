'use client'
import { signOut } from "next-auth/react";


export default function Logout() {
    return (
        <div onClick={ () => {
            signOut();
        }} className="button p-5 text-xl">
            Logout
        </div>
    )
}
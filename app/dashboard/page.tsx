'use client'
import { SessionProvider } from 'next-auth/react';
import { useSession } from "next-auth/react";


function Page()  {
    let session = useSession();
    let user = session?.data?.user;
    console.log(user);

    return (

        <section>
            <h2> ID: {user?.id} </h2>
            <h2> Name: {user?.name} </h2>
            <h2> Email: {user?.email} </h2>
            <h2> Department: {user?.department} </h2>
            <h2> Role: {user?.role} </h2>

        </section>
    )

}

export default function HomePage() {
    return (
        <SessionProvider>
            < Page />
        </SessionProvider>
    )
}
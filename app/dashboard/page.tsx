import PageContent from "./page_content";
import Link from "next/link"
import Logout from "../logout";
import { getServerSession } from "next-auth";
import { sql } from "@vercel/postgres";


function GeneralButtons({ name } : {name: string}) {
    return (
        <div className='flex flex-row justify-between m-3'>
            <div className='flex flex-row m-2'>
                <h1 className='text-4xl font-bold text-green-900'> Welcome {name}! </h1>
            </div>
            <div className='flex flex-row'>
                <Link href='/' className='button_general_loggedin'>
                    Home
                </Link>
                
                <Logout formatting='button_general_loggedin'/>
            </div>
        </div>
    )
}

async function ProfileData() {
    let session = await getServerSession();
    let userData = await sql `
    SELECT * FROM users WHERE email=${session?.user.email};`
    return userData.rows[0];
}


export default async function DashboardPage() {
    let session = await getServerSession();
    let name = session?.user.name ?? '';

    let profile_data = await ProfileData();

    return (
        <section className="flex flex-col">
            <GeneralButtons name={name}/>
            <PageContent 
                profile_data={profile_data}/>
        </section>
    )
}
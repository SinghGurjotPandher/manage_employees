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
    SELECT * FROM users 
    WHERE email=${session?.user.email};`
    return userData.rows[0];
}

async function InspectionData(email: string) {
    let inspection_data = await sql `
    SELECT * FROM inspections
    WHERE assigned_to=${email}
    ORDER BY created_at DESC;`
    return inspection_data;
}


export default async function DashboardPage() {
    let session = await getServerSession();
    let name = session?.user.name ?? '';

    let profile_data = await ProfileData();
    let inspection_data = await InspectionData(profile_data.email);

    return (
        <section className="flex flex-col">
            <GeneralButtons name={name}/>
            <PageContent 
                profile_data={profile_data}
                inspection_data={inspection_data}/>
        </section>
    )
}
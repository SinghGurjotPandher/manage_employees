//import { User } from "@/app/api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";
import { User, auth } from "../../auth";
import Inspections from "./inspections_page"
import { QueryResult, sql } from "@vercel/postgres";
import Link from "next/link";

async function InspectionData( user : User) {
    let department = user?.department;
    let role = user?.role;
    let email = user?.email;

    let inspection_data;
    if (department === 'Quality Assurance' && 
        (role === 'Supervisor' || role === 'Manager')) {
        inspection_data = await sql `
        SELECT * FROM inspections
        ORDER BY deadline ASC;`
    }
    else {
        inspection_data = await sql `
        SELECT * FROM inspections
        WHERE assigned_to=${email}
        ORDER BY deadline ASC;`
    }
    return inspection_data;
}


async function UserEmails() {
    let userEmails = await sql `
    SELECT email 
    FROM users`
    return userEmails;
}



export default async function InspectionsPage() {
    let user = await auth();
    let email : string = user?.email ?? ''; 
    let inspection_data = await InspectionData(user as User);
    let user_emails = await UserEmails();
    return (
        <div>
            <h1 className='heading'> Inspections </h1>
            <hr className='mb-4'/>

            { user?.department === 'Quality Assurance' && (
                user?.role === 'Supervisor' || user?.role === 'Manager'
            )
            && 
            <Link href='/dashboard/inspections/create_new' className="green-button w-fit">
                + Create a New Inspection
            </Link> }
            <Inspections inspection_data={inspection_data} email={email} user_emails={user_emails}/>
        </div>
    )
}
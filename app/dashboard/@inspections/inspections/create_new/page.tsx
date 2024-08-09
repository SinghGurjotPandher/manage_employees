import InspectionForm from "../create_inspection_form";
import { sql } from "@vercel/postgres";


async function UserEmails() {
    let userEmails = await sql `
    SELECT email 
    FROM users`
    return userEmails;
}


export default async function CreateInspection() {
    let user_emails = await UserEmails();
    return (
        <section className='m-2'>
            <h1 className='heading'> Create a New Inspection </h1>
            <hr className='mb-4'/>
            <InspectionForm user_emails={user_emails}/>
        </section>
    )
}

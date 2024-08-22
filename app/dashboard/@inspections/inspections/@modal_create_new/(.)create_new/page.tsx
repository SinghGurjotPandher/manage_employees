import { sql } from "@vercel/postgres";
import InspectionDialog from "./inspection_dialog";


async function UserEmails() {
    let userEmails = await sql `
    SELECT email 
    FROM users WHERE department_name = 'Quality Assurance'`
    return userEmails;
}

export default async function CreateInspection() {

    let user_emails = await UserEmails(); // fix -- try to use UserEmails from ../page

    return (
        <InspectionDialog user_emails={user_emails}/>
    )
}
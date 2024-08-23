import { sql } from "@vercel/postgres";
import ReportIssuesPage from "./report_issues";
import { getServerSession } from "next-auth";
import { auth } from "../../auth";

async function getEmails(email: string) {
    let response = await sql `
    SELECT email FROM users
    WHERE department_name='Operations' and (role='Production Supervisor' or role='Operations Manager')
    and email != ${email}
    `
    return response;
}

export default async function ReportIssues() {
    let userInfo = await auth();
    let emails = await getEmails(userInfo?.email as string);
    return (
        <div>
            <h1 className='heading'> Report Issues </h1>
            <hr className='mb-4'/>

            <ReportIssuesPage emails={emails} />
        </div>
    ) 
}
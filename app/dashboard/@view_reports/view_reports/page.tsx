import { sql } from "@vercel/postgres";
import { auth } from "../../auth";
import ViewReports from "./view_reports_page";

async function getIssues(email: string) {
    let foundIssues = await sql `
    SELECT * FROM issues
    WHERE reporting_to=${email}
    ORDER BY created_at DESC
    `
    return foundIssues;
}

export default async function ViewReportsPage() {
    let userInfo = await auth();
    let issues = await getIssues(userInfo?.email as string);
    return (
        <div>
            <h1 className="heading"> View Reported Issues </h1>
            <hr className="mb-4"/>

            <ViewReports issues={issues}/>
        </div>
    )
}
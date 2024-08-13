import { sql } from "@vercel/postgres"
import PerformancePage from "./performance_page";

async function GetUserPerformanceData() {
    let userPerformanceData = await sql `
    SELECT users.email, users.name, AVG(difference) AS performance_average
    FROM (
        SELECT assigned_to, updated_at - created_at AS difference
        FROM inspections
        WHERE status = 'Completed'
    ) AS subquery
    INNER JOIN users ON subquery.assigned_to = users.email
    GROUP BY users.email, users.name;
    `
    return userPerformanceData;
}

export default async function Performance() {
    let userPerformanceData = await GetUserPerformanceData();
    return (
        <section className="m-2">
            <h1 className='heading'> Performance </h1>
            <hr className='mb-4'/>

            <PerformancePage userPerformanceData={userPerformanceData}/>

        </section>
    )
}
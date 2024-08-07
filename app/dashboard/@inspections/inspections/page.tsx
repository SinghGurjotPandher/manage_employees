import { getServerSession } from "next-auth";
import Inspections from "./inspections_page"
import { sql } from "@vercel/postgres";

async function InspectionData(email: string) {
    let inspection_data = await sql `
    SELECT * FROM inspections
    WHERE assigned_to=${email}
    ORDER BY created_at DESC;`
    return inspection_data;
}


export default async function InspectionsPage() {
    let session = await getServerSession();
    let email : string = session?.user.email ?? ''; 
    let inspection_data = await InspectionData(email);
    return (
        <Inspections inspection_data={inspection_data} email={email}/>
    )
}
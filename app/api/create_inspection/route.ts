import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    console.log('GOT HERE AT LEAST')
    try {

        let createInspection = await request.json();

        let title = createInspection.title;
        let checklist = createInspection.checklist;
        let issues = createInspection.issues;
        let assigned_to = createInspection.assigned_to;
        let location = createInspection.location;
        let deadline_date = createInspection.deadline_date;
        let deadline_time = createInspection.deadline_time;
        let deadline = `${deadline_date} ${deadline_time}`

        await sql `
        INSERT INTO inspections(title, created_at, checklist, assigned_to, updated_at, location, issues, status, deadline)
        VALUES(${title},NOW(),${checklist},${assigned_to},NOW(),${location},${issues},'Not Started',${deadline})
        `
        console.log('DATA IS IN')
        revalidatePath(`/dashboard/inspections`);
    }
    catch (e) {
        console.log(e)
        console.log('ERROR DETECTED')
        return NextResponse.json({error: e});
    }
    console.log('SUCCESS')
    return NextResponse.json({message: 'Inspection created successfully.'})
}
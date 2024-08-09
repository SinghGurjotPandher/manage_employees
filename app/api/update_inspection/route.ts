import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";


export async function POST(request : Request) {
    try {
        let updatedInspection = await request.json();
        let id = updatedInspection.id;
        let location = updatedInspection.location;
        let observations = updatedInspection.observations;
        let corrective_action = updatedInspection.corrective_action;
        let status = updatedInspection.status;
        let email = updatedInspection.email;

        let checklist = updatedInspection.checklist;
        let issues = updatedInspection.issues;
        let assigned_to = updatedInspection.assigned_to;
        let deadline_date = updatedInspection.deadline_date;
        let deadline_time = updatedInspection.deadline_time;
        let deadline = `${deadline_date} ${deadline_time}`;
        await sql `
        UPDATE inspections
        SET 
            location=${location},
            observations=${observations},
            corrective_action=${corrective_action},
            status=${status},
            inspector=${email},
            updated_at=NOW(),
            checklist=${checklist},
            issues=${issues},
            assigned_to=${assigned_to},
            deadline=${deadline}
        WHERE id=${id};
        `
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({error: e})
    }
    return NextResponse.json({message: 'Changes to the inspection saved successfully.'})
}
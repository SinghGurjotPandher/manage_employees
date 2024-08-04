import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
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
        await sql `
        UPDATE inspections
        SET 
            location=${location},
            observations=${observations},
            corrective_action=${corrective_action},
            status=${status},
            inspector=${email},
            updated_at=NOW()
        WHERE id=${id};
        `
        revalidatePath('/dashboard');
    }
    catch (e) {
        return NextResponse.json({error: e})
    }
    return NextResponse.json({message: 'Changes to the inspection saved successfully.'})
}
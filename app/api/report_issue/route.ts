import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        let issue_data = await request.json();

        let name = issue_data.name;
        let description = issue_data.description;
        let reporting_to = issue_data.reporting_to;

        await sql `
        INSERT into issues (name, description, reporting_to, created_at)
        VALUES(${name}, ${description}, ${reporting_to}, NOW());
        `
    }

    catch (e) {
        console.log('ERROR')
        console.log(e)
        return NextResponse.json({error: e})
    }

    return NextResponse.json({success: 'Issue reported successfully.'})
}
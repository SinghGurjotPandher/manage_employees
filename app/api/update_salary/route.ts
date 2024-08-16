import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        let updatedSalary = await request.json();
        let role = updatedSalary.role;
        let salary = updatedSalary.salary;

        await sql `
        UPDATE users
        SET hourly_salary=${salary}
        WHERE role=${role};
        `
    }
    catch (e) {
        console.log(e);
        console.log('ERROR while updating salary.')
        return NextResponse.json({error: e})
    }

    return NextResponse.json({message: 'Changes to the salary successfully saved.'})
}
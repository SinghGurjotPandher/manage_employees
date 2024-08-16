import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Emails are not allowed to have "-" because that is being used as a way to split info
// within e.g. role-pandherg@gmail.com


export async function POST(request: Request) {
    try {
        let updatedUserInfo = await request.json();
        for (let infoName in updatedUserInfo) {
            let typeEmail = infoName.split('-')
            let type = typeEmail[0];
            let value = updatedUserInfo[infoName];
            let email = typeEmail[1];

            if (type === 'role') {
                await sql `
                UPDATE users
                SET role=${value}
                WHERE email=${email}
                `
            }
            else if (type === 'hourly_salary') {
                await sql `
                UPDATE users
                SET hourly_salary=${value}
                WHERE email=${email}
                `
            }
            else {
                throw('Unexpected table name while updating salary/role.')
            }
        }
    }
    catch (e) {
        console.log('ERROR while updating user role/salary')
        console.log(e);
        return NextResponse.json({error: e})
    }

    return NextResponse.json({message: "Changes to the user's salary and/or role successfully saved"})

}
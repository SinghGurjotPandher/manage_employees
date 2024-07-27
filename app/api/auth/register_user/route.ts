import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        let userRegData = await request.json();

        let name = userRegData.name;
        let date_of_birth = userRegData.date_of_birth;
        let phone_number = userRegData.phone_number;
        let gender = userRegData.gender;
        let pronouns = userRegData.pronouns;
        let department = userRegData.department;
        let role = userRegData.role;
        let email = userRegData.email;
        let password_hashed = await hash(userRegData.password, 10);

        await sql `
        INSERT INTO users(role, department_name, name, date_of_birth, gender, pronouns, email, password)
        VALUES(${role},${department},${name},${date_of_birth},${gender},${pronouns},${email},${password_hashed});`

    } catch (e) {
        return NextResponse.json({error: e});
    }

    return NextResponse.json({message: 'User successfully registered in the database.'})
}
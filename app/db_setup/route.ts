import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


async function SetupUsersTable() {
    await sql `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        role TEXT NOT NULL,
        department_name TEXT NOT NULL,
        name TEXT NOT NULL,
        date_of_birth DATE NOT NULL,
        phone_number TEXT NOT NULL,
        hourly_salary DECIMAL NOT NULL DEFAULT 0 CHECK (hourly_salary >= 0),
        gender TEXT,
        pronouns TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );`
}

export async function GET() {
    try {
        await SetupUsersTable();

        return NextResponse.json( { message: 'Database setted up successfully'  }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json( { error }, { status: 500 });
    }
}
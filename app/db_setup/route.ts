import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


async function SetupUsersTable() {
    await sql `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        role TEXT NOT NULL,
        name TEXT NOT NULL,
        date_of_birth TEXT NOT NULL,
        gender TEXT,
        email TEXT NOT NULL,
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
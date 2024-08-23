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

async function SetupInspectionsTable() {
    await sql `
    CREATE TABLE IF NOT EXISTS inspections (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL,
        checklist TEXT,
        assigned_to TEXT NOT NULL,
        inspector TEXT,
        updated_at TIMESTAMP,
        location TEXT,
        observations TEXT,
        issues TEXT,
        corrective_action TEXT,
        status TEXT NOT NULL,
        deadline TIMESTAMP NOT NULL,
        FOREIGN KEY (assigned_to) REFERENCES users(email),
        FOREIGN KEY (inspector) REFERENCES users(email)
    );`;
}

async function SetupMachineTable() {
    await sql `
    CREATE TABLE IF NOT EXISTS machines (
        id SERIAL PRIMARY KEY,
        name TEXT,
        model_number BIGINT,
        location TEXT,
        serial_num BIGINT,
        maintenance_schedule_first TEXT,
        maintenance_schedule_second INTEGER,
        maintenance_schedule_third TEXT,
        department TEXT,
        status TEXT 
    );
    `;
}

async function SetupIssuesTable() {
    await sql `
    CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        name TEXT,
        description TEXT,
        reporting_to TEXT,
        created_at TIMESTAMP, 
        FOREIGN KEY (reporting_to) REFERENCES users(email)
    )
    `
}

export async function GET() {
    try {
        await SetupUsersTable();
        await SetupInspectionsTable();
        await SetupMachineTable();
        await SetupIssuesTable();

        return NextResponse.json( { message: 'Database setted up successfully'  }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json( { error }, { status: 500 });
    }
}
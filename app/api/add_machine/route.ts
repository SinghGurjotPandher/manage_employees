import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        let machineData = await request.json();

        let name = machineData.name;
        let model_num = machineData.model_num == '' ? 0 : machineData.model_num;
        let location = machineData.location;
        let serial_num = machineData.serial_num == '' ? 0 : machineData.serial_num;
        let machSchFirstField = machineData.machSchFirstField;
        let machSchSecondField = machineData.machSchSecondField == '' ? 0 : machineData.machSchSecondField;
        let machSchThirdField = machineData.machSchThirdField;
        let department = machineData.department;
        let status = machineData.status;

        await sql `
        INSERT INTO machines(name, model_number, location, serial_num, maintenance_schedule_first
, maintenance_schedule_second, maintenance_schedule_third, department, status)
        VALUES(${name}, ${model_num}, ${location}, ${serial_num}, ${machSchFirstField}, ${machSchSecondField}, 
${machSchThirdField}, ${department}, ${status} );
        `
    }

    catch (e) {
        console.log('ERROR')
        console.log(e)
        return NextResponse.json({error: e});
    }


    return NextResponse.json({message: 'Machine added successfully.'});
}
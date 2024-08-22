import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        
        let machineData = await request.json();

        let id = machineData.id;
        let model_num = machineData.model_num;
        let location = machineData.location;
        let serial_num = machineData.serial_num;
        let machSchFirstField = machineData.machSchFirstField;
        let machSchSecondField = machineData.machSchSecondField;
        let machSchThirdField = machineData.machSchThirdField;
        let department = machineData.department;
        let status = machineData.status;

        await sql `
        UPDATE machines
        SET 
            model_number=${model_num},
            location=${location},
            serial_num=${serial_num},
            maintenance_schedule_first=${machSchFirstField},
            maintenance_schedule_second=${machSchSecondField},
            maintenance_schedule_third=${machSchThirdField},
            department=${department},
            status=${status}
        WHERE id=${id}
        `
    }

    catch (e) {
        console.log(e)
        return NextResponse.json({error: e})
    }

    return NextResponse.json({message: 'Machine updated successfully.'})
}
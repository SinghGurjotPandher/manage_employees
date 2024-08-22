import { sql } from "@vercel/postgres";
import AddNewMachineDialog from "./add_new_machine_dialog";


async function GetDepartmentNames() {
    let response = await sql `
    SELECT DISTINCT department_name 
    FROM users
    
    `
}


export default function InterceptingAddNewMachine() {
    return (
        <div>
            <AddNewMachineDialog/>
        </div>
    )
}
import Link from "next/link";
import ShowMachines from "./show_machine";
import { sql } from "@vercel/postgres";
import { machine } from "os";


async function GetMachineDetails() {
    let response = await sql `
    SELECT * FROM machines
    ORDER BY name ASC
    `;
    return response;
}

export default async function ManageInventory() {
    let machineData = await GetMachineDetails();
    return (
        <div>
            <h1 className="heading"> Manage Inventory </h1>
            <hr className='mb-4'/>

            <Link href='/dashboard/manage_inventory/add_new_machine' className="green-button w-fit">
                Add a New Machine
            </Link>

            <ShowMachines machineData={machineData}/>

        </div>
    )
}
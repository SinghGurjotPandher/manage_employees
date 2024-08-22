import { sql } from "@vercel/postgres";
import AddNewMachineForm from "../add_new_machine_form";

export default async function AddNewMachine() {

    return (
        <section>
            <h1 className='heading'> Create a New Inspection </h1>
            <hr className='mb-4'/>
            <AddNewMachineForm />
        </section>
    )
}
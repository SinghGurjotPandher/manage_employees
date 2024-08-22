import Dialog from "@/app/dashboard/dialog";
import AddNewMachineForm from "../../add_new_machine_form";
import { sql } from "@vercel/postgres";

export default function AddNewMachineDialog() {

    async function Contents() {

        return (
            <div>
                <h1 className='heading'> Add a New Machine </h1>
    
                <hr className='mb-4'/>

                <AddNewMachineForm />

            </div>
        )
    }
    
    return (
        <Dialog contents={<Contents />}/>
    )
}
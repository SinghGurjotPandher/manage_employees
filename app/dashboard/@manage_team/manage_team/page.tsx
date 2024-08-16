import { sql } from "@vercel/postgres";
import { auth } from "../../auth";
import ManageTeamPage from "./manage_team";


async function DepartmentTeam(department : string) {
    let result = await sql `
    SELECT * FROM users
    WHERE department_name=${department}
    ORDER BY name ASC;`
    return result;
}


export default async function ManageTeam() {
    let user = await auth();
    let department = user?.department ?? '';
    let department_users = await DepartmentTeam(department);

    return (
        <section className="m-2">
            <h1 className='heading'> Manage Team </h1>
            <hr className='mb-4'/>

            <ManageTeamPage department_users={department_users} departmentName={department}/>
        </section>
    )
}
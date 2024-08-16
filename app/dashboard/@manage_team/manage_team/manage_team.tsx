'use client'
import { getDeptRoles, jsonDepartmentRoles } from "@/app/dept_roles";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { useRouter } from "next/navigation";
import { off } from "process";
import { FormEvent, useRef, useState } from "react";
import { json } from "stream/consumers";
// manager should be allowed to create new inspections -- fix that :)
// fix ordering of many things -- like just do ORDER BY ASC by name
// add documentation

function UpdateDepartmentUsersInformation({department_users, departmentRoles, departmentName} : 
    {department_users: QueryResult<QueryResultRow>, departmentRoles: jsonDepartmentRoles, departmentName: string}) {

    let router = useRouter();

    const [msg, changeMsg] = useState('');
    const [msgFormat, changeFormat] = useState('');


    let handleUserInfoUpdate = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let newUserInfo = new FormData(e.currentTarget);
        
        let json_obj : {[key: string] : string} = {}
        for (let department_user in department_users.rows) {
            let userEmail = department_users.rows[department_user].email;
            json_obj['role-' + userEmail] = newUserInfo.get('role-' + userEmail) as string;
            json_obj['hourly_salary-' + userEmail] = newUserInfo.get('hourly_salary-' + userEmail) as string;
        }
        
        let response = await fetch('/api/update_role_salary', {
            method: 'POST',
            body: JSON.stringify(json_obj)
        })

        let result = await response.json();

        if (result.error != undefined) {
            changeMsg(result.error);
            changeFormat('error_msg')
        }
        else {
            changeMsg('User(s) role/salary updated successfully.');
            changeFormat('success_msg')
            router.refresh();
        }
    };

    return (
        <form className="sub_section_light_green flex-col" onSubmit={handleUserInfoUpdate}>
            <div>
                <button className="green-button w-fit"> Update Team Information </button>
                <h1 className={msgFormat + ' ml-2'}> {msg}</h1>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone Number </th>
                        <th> Role </th>
                        <th> Hourly Salary </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        department_users.rows.map((department_user) => (
                            <tr key={department_user.email}>
                                <td> 
                                    {department_user.name}
                                </td>
                                <td> 
                                    { department_user.email } 
                                </td>
                                <td> 
                                    { department_user.phone_number }
                                </td>
                                <td>
                                <select className="green-field" name={'role-' + department_user.email}
                                    defaultValue={department_user.role}>
                                    {Object.entries(departmentRoles).map(([department, roles]) => (
                                        department === department_user.department_name &&
                                        roles.map((role : string) => (
                                            <option key={role}> 
                                                {role} 
                                            </option> 
                                        ))
                                    ))}
                                </select>
                                </td>
                                <td> 
                                    $
                                    <input name={ 'hourly_salary-' + department_user.email } type='text' className="green-field" 
                                        defaultValue={ department_user.hourly_salary }/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </form>
    )
}

function UpdateDepartmentRoleSalaries({departmentRoles, departmentName} : {departmentRoles: jsonDepartmentRoles, departmentName: string}) {

    const [msg, changeMsg] = useState('');
    const [msgFormat, changeFormat] = useState('');

    let router = useRouter();
    let handleSalaryUpdate = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let salary_data = new FormData(e.currentTarget);

        let response = await fetch('/api/update_salary', {
            method: 'POST',
            body: JSON.stringify({
                role: salary_data.get('role'),
                salary: salary_data.get('salary')
            })
        });

        let result = await response.json();

        if (result.error != undefined) {
            changeMsg(result.error);
            changeFormat('error_msg');
        }
        else {
            changeMsg('Salary updated successfully.');
            changeFormat('success_msg');
            router.refresh();
        }
    };

    let ref = useRef<HTMLFormElement>(null);

    return (
        <form className="sub_section_light_green items-center" ref={ref}
            onSubmit={ async (e) => {
                await handleSalaryUpdate(e);
                ref.current?.reset();
            }}
        >
            <label>
                <span className="font-semibold"> Role </span>
                <select className="green-field" name='role'>
                    {Object.entries(departmentRoles).map(([department, roles]) => (
                        department === departmentName &&
                        roles.map((role : string) => (
                            <option key={role}> 
                                {role} 
                            </option> 
                        ))
                    ))}
                </select>
            </label>
            <label>
                <span className="font-semibold"> Salary ($) </span>
                <input name='salary' className='green-field' type='number' step='any' defaultValue='0'/>
            </label>

            <button className="green-button"> Update Salary </button>
            
            {<h1 className={msgFormat}> {msg}</h1>}
        </form>
    )
}

export default function ManageTeamPage({department_users, departmentName} : {department_users: QueryResult<QueryResultRow>, departmentName: string}) {
    let departmentRoles = getDeptRoles();
    return (
        <div>
            <UpdateDepartmentRoleSalaries departmentRoles={departmentRoles} departmentName={departmentName}/>
            <UpdateDepartmentUsersInformation department_users={department_users} departmentRoles={departmentRoles} departmentName={departmentName}/>
        </div>
    )
}
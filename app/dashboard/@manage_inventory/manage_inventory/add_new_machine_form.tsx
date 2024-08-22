'use client'

import { getDeptRoles } from "@/app/dept_roles";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddNewMachineForm() {

    let router = useRouter();

    const [currentMsg, changeMsg] = useState('');
    const [formatMsg, changeMsgFormat] = useState('');


    let handleMachineAddition = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let machineData = new FormData(e.currentTarget);
        let response = await fetch('/api/add_machine', {
            method: 'POST',
            body: JSON.stringify({
                name: machineData.get('name'),
                model_num: machineData.get('model_num'),
                location: machineData.get('location'),
                serial_num: machineData.get('serial_num'),
                machSchFirstField: machineData.get('machSchFirstField'),
                machSchSecondField: machineData.get('machSchSecondField'),
                machSchThirdField: machineData.get('machSchThirdField'),
                department: machineData.get('department'),
                status: machineData.get('status')
            })
        })

        let result = await response.json();

        if (result.error != undefined) {
            changeMsg(`ERROR: ${result.error.detail}`)
            changeMsgFormat('error_msg')
        }
        else {
            router.refresh();
            changeMsg(`Machine added successfully.`)
            changeMsgFormat('success_msg')
        }

    };

    let deptRoles = getDeptRoles();
    return (
        <div>
            <form onSubmit={handleMachineAddition}>
                <table>
                    <tbody>
                        <tr>
                            <td className="font-semibold"> Machine Name </td>
                            <td> 
                                <input type='text' name='name' className="gray_table_field"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Model Number </td>
                            <td>
                                <input type='number' name='model_num' className="gray_table_field"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Location </td>
                            <td>
                                <input type='text' name='location' className="gray_table_field"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Serial Number </td>
                            <td>
                                <input type='number' name='serial_num' className="gray_table_field"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Maintenance Schedule </td>
                            <td>
                                <select className="gray_table_field" name='machSchFirstField'>
                                    <option> </option>
                                    <option> Once </option>
                                    <option> Twice </option>
                                    <option> Daily </option>
                                    <option> Every </option>
                                </select>

                                <input type='number' name='machSchSecondField' className="gray_table_field w-1/6"/>

                                <select className="gray_table_field" name='machSchThirdField'>
                                    <option> </option>
                                    <option> week(s) </option>
                                    <option> day(s) </option>
                                    <option> year(s) </option>
                                    <option> month(s) </option>
                                </select>


                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Assigned Department </td>
                            <td> 
                                <select className="gray_table_field" name='department'>
                                    {
                                        Object.entries(deptRoles).map(([department, roles]) => (
                                            <option key='department'> {department} </option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Status </td>
                            <td> 
                                <select className="gray_table_field" name='status'>
                                    <option> Operational </option>
                                    <option> Under Maintenance </option>
                                    <option> Out of Service </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <h2 className={formatMsg}> {currentMsg} </h2>

                <button className="green-button"> Add Machine </button>
            </form>
        </div>
    )
}
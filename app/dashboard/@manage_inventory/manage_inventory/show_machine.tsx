'use client'
import { getDeptRoles } from "@/app/dept_roles";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


function NothingSelected() {
    return (
        <div className="flex justify-center">
            <h1 className="subtle_msg"> No machine currently selected to view. </h1>
        </div>
    )
}

export default function ShowMachines({machineData} : {machineData: QueryResult<QueryResultRow>}) {

    let router = useRouter();

    const [showMachine, changeMachine] = useState<QueryResultRow | null>(null);
    const [showMessage, changeMessage] = useState('');
    const [msgFormat, changeMsgFormat] = useState('');
    const [showMessageID, changeMessageID] = useState('');


    let deptRoles = getDeptRoles();

    let handleMachineUpdate = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let newData = new FormData(e.currentTarget);

        let response = await fetch ('/api/update_machine', {
            method: 'POST',
            body: JSON.stringify({
                id: newData.get('id'),
                model_num: newData.get('model_num'),
                location: newData.get('location'),
                serial_num: newData.get('serial_num'),
                machSchFirstField: newData.get('machSchFirstField'),
                machSchSecondField: newData.get('machSchSecondField'),
                machSchThirdField: newData.get('machSchThirdField'),
                department: newData.get('department'),
                status: newData.get('status')
            })
        })

        router.refresh();

        let result = await response.json();

        changeMessageID(newData.get('id') as string);
        if (result.error != undefined) {
            console.log('ERROR');
            changeMessage(`ERROR: ${result.error.detail}`);
            changeMsgFormat('error_msg');
        }
        else {
            changeMessage(`Machine updated successfully.`);
            changeMsgFormat('success_msg');
        }

    };

    function MachineData() {
        if (showMachine === null) {
            return <NothingSelected />
        }
        else {
            return (
                <form onSubmit={handleMachineUpdate}>
                    <h1 className="sub_heading"> { showMachine.name } </h1>
                    <hr className='mb-4'/>

                    <input type='hidden' name='id' value={showMachine.id}/>
                    <table>
                        <tbody>
                            <tr>
                                <td className="font-semibold"> Model Number </td>
                                <td className="td_box">
                                    <input name='model_num' type='number' className="field_subtle_boxes" defaultValue={showMachine.model_number}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Location </td>
                                <td className="td_box">
                                    <input name='location' type='text' className="field_subtle_boxes" defaultValue={showMachine.location}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Serial Number </td>
                                <td className="td_box">
                                    <input name='serial_num' type='number' className="field_subtle_boxes" defaultValue={showMachine.serial_num}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Maintenance Schedule (FIX -- should have options) </td>
                                <td className="td_box">
                                    <select className="field_subtle_boxes" name='machSchFirstField' defaultValue={showMachine.maintenance_schedule_first}>
                                        <option key=''> </option>
                                        <option key='once'> Once </option>
                                        <option key='twice'> Twice </option>
                                        <option key='daily'> Daily </option>
                                        <option key='every'> Every </option>
                                    </select>
                                </td>

                                <td className="td_box">
                                    <input name='machSchSecondField' className="field_subtle_boxes" defaultValue={showMachine.maintenance_schedule_second}/>
                                </td>

                                <td className="td_box">
                                    <select className="field_subtle_boxes" name='machSchThirdField' defaultValue={showMachine.maintenance_schedule_third}>
                                        <option key=''> </option>
                                        <option key='week(s)'> week(s) </option>
                                        <option key='day(s)'> day(s) </option>
                                        <option key='year(s)'> year(s) </option>
                                        <option key='month(s)'> month(s) </option>
                                    </select>

                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Department </td>
                                <td className="td_box">
                                    <select name='department' className="field_subtle_boxes" defaultValue={showMachine.department}>
                                        {
                                            Object.entries(deptRoles).map(([department, role]) => (
                                                <option key={department}> {department} </option>
                                            ))
                                        }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Status </td>
                                <td className="td_box">
                                    <select name='status' className="field_subtle_boxes" defaultValue={showMachine.status}>
                                        <option key='operational'> Operational </option>
                                        <option key='under_maintenance' > Under Maintenance </option>
                                        <option key='out_of_service'> Out of Service </option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {
                        showMachine.id.toString() === showMessageID &&
                        <h2 className={msgFormat}> {showMessage} </h2>
                    }
                    <button className="green-button"> Save Changes </button>
                </form>
            )
        }
    }

    return (
        <section className="flex m-4 h-[475px]">
            <div className="left_small_scrolling_area">
                <ul>
                    {
                        machineData.rows.map((machine) => (
                            <li key={machine.id} 
                            onClick={() => {
                                changeMachine(machine);
                            }}
                            className={showMachine === null ? 'simple_list' : ((machine.id === showMachine.id) ? 'simple_list bg-green-300' : 'simple_list')}
                            > {machine.name} </li>
                        ))
                    }
                </ul>
            </div>

            <div className="right_larger_scrolling_area">
                <div> 
                    <MachineData />
                </div>
            </div>
        </section>
    )
}
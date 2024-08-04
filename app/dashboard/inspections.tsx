'use client'
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import React, { FormEvent, useState } from "react";


// try to convert profile, inspections into paths somehow to make sure you are able to protect
// them later... also implement revalidatePath (somewhat implemented in route.ts of update_inspection)


function InspectionOverview( {inspection} : {inspection : QueryResultRow} ) {
    return (
        <div>
            <h2 className="small_sub_heading">
                {inspection.title}
                {inspection.status === 'Not Started' && <button disabled className="not_started"> Not Started </button>}
                {inspection.status === 'In Progress' && <button disabled className="in_progress"> In Progress </button>}
                {inspection.status === 'Completed' && <button disabled className="completed"> Completed </button>}
            </h2>

            <h2 className="small_sub_heading italic text-base">
                (created on {inspection.created_at.toLocaleDateString()} at {inspection.created_at.toLocaleTimeString()})
            </h2>
        </div>
    )
}


function InspectionsList( {inspection_data, email} : {inspection_data : QueryResult<QueryResultRow>, email: string}) {

    let inspections = inspection_data.rows;
    const [showDetails, changeDetailShow] = useState('');
    const [showMessage, changeMessage] = useState('');
    const [showMessageID, changeMessageID] = useState('');
    const [msgFormat, changeMsgFormat] = useState('');


    let handleInspectionChanges = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newInspectionData = new FormData(e.currentTarget);
        let response = await fetch ('/api/update_inspection', {
            method: 'POST',
            body: JSON.stringify ({
                id: newInspectionData.get('id'),
                email: newInspectionData.get('email'),
                location: newInspectionData.get('location'),
                observations: newInspectionData.get('observations'),
                corrective_action: newInspectionData.get('corrective_action'),
                status: newInspectionData.get('status')
            })
        })

        let result = await response.json();
        let id : string = newInspectionData.get('id') as string || '';

        changeMessageID(id);
        if (result.error != undefined) {
            changeMessage(`ERROR: ${result.error.detail}`)
            changeMsgFormat('error_msg');
        }
        else {
            changeMessage('Inspection changes saved successfully.');
            changeMsgFormat('success_msg');
        }
    }

    function ShowDetails({inspection}:{inspection: QueryResultRow}) {
        return (
            <div>
                <form className="flex flex-col m-2" onSubmit={handleInspectionChanges}>

                    <input type='hidden' name='id' value={inspection.id} />
                    <input type='hidden' name='email' value={email} />


                    <table>
                        <tbody>
                            <tr>
                                <td className="font-semibold"> Checklist </td>
                                <td> { inspection.checklist } </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Issues </td>
                                <td> { inspection.issues } </td>
                            </tr>
                            <tr>
                                <td className='font-semibold'> Assigned To </td>
                                <td> { inspection.assigned_to } </td>
                            </tr>
                            <tr>
                                <td className='font-semibold'> Approved By </td>
                                <td> {inspection.approved_by } </td>
                            </tr>
                            <tr>
                                <td className='font-semibold'> Inspector </td>
                                <td> {inspection.inspector} </td>
                            </tr>
                            <tr>
                                <td className='font-semibold'> Location </td>
                                <td> 
                                    <input name='location' type='text' defaultValue={inspection.location} className="gray_table_field"/>
                                </td>
                            </tr>

                            <tr>
                                <td className='font-semibold'> Observations </td>
                                <td> 
                                    <textarea name='observations'
                                        defaultValue={inspection.observations}>
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td className='font-semibold'> Corrective Action </td>
                                <td>
                                    <textarea name='corrective_action'
                                        defaultValue={inspection.corrective_action}>
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td className='font-semibold'> Status </td>
                                <td>
                                    <select className="gray_table_field" name='status'>
                                        <option selected={inspection.status === 'Not Started'}> Not Started </option>
                                        <option selected={inspection.status === 'In Progress'}> In Progress </option>
                                        <option selected={inspection.status === 'Completed'}> Completed </option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 className={msgFormat}> {showMessageID === String(inspection.id)  && showMessage} </h2>
                    
                    <button className="gray-button w-fit">
                        Save Changes
                    </button>

                </form>
            </div>
        )  
    }

    function ViewEditDetail( { inspection } : {inspection : QueryResultRow}) {
        return (
            <div>
                {
                    showDetails !== inspection.title && 
                    <button className="green-button h-1/2" onClick={() => {
                        changeDetailShow(inspection.title)
                        changeMessage('')
                        changeMessageID('')
                    }}>
                        View/Edit Details
                    </button>
                }
                {
                    showDetails === inspection.title && 
                    <button className="green-button h-1/2" onClick={() => {
                        changeDetailShow('')
                        changeMessage('')
                        changeMessageID('')
                    }}>
                        Hide Details
                    </button>
                }
            </div>
        )
    }


    return (
        <ul>
            {inspections.map(inspection => (
                <li>
                    <hr className="m-2"/>
                    <div className="m-2">
                        <div className="flex flex-row justify-between">
                            <InspectionOverview inspection={inspection} />
                            <ViewEditDetail inspection={inspection}/>
                        </div>
                    </div>
                    {
                        showDetails === inspection.title &&
                        <ShowDetails inspection={inspection}/>
                    }
                    <hr className="m-2"/>
                </li>
            ))}
        </ul>
    )
}


export default function Inspections({inspection_data, email} : {inspection_data: QueryResult<QueryResultRow>, email: string}) {
    return (
        <section className='m-2'>
            <h1 className='heading'> Inspections </h1>
            <hr className='mb-4'/>

            <InspectionsList inspection_data={inspection_data} email={email}/>
        </section>
    )
}
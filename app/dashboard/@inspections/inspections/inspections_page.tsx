'use client'
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";


function DisplayInspectionDetails({inspection, user_emails} : {inspection : QueryResultRow, user_emails: QueryResult<QueryResultRow>}) {
    let session = useSession();
    let department = session.data?.user?.department;
    let role = session.data?.user?.role;
    return (
        <table>
            <tbody>
                <tr>
                    <td className="font-semibold"> Checklist </td>
                    <td>
                        <textarea 
                            name='checklist' 
                            defaultValue={ inspection.checklist } 
                            className="gray_table_field disabled:disabled_field"
                            disabled={
                                department != 'Quality Assurance' || 
                                    (department === 'Quality Assurance' && role != 'Supervisor')}
                        >
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td className="font-semibold"> Issues </td>
                    <td>
                        <textarea 
                            name='issues' 
                            defaultValue={ inspection.issues } 
                            className="gray_table_field disabled:disabled_field"
                            disabled={
                                department != 'Quality Assurance' || 
                                    (department === 'Quality Assurance' && role != 'Supervisor')}
                        >
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td className='font-semibold'> Assigned To </td>
                    <td>
                        <select 
                            name='assigned_to' 
                            className="gray_table_field disabled:disabled_field"                         
                            disabled={
                                department != 'Quality Assurance' || 
                                    ( department === 'Quality Assurance' && role != 'Supervisor')}
                        >
                            {user_emails.rows.map((user_email) => (
                                <option key={user_email.email} selected={inspection.assigned_to === user_email.email} > {user_email.email} </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='font-semibold'> Deadline </td>
                    <td>  
                        <input 
                            name='deadline_date' 
                            type='date' 
                            defaultValue={inspection.deadline.toLocaleDateString('en-CA')} 
                            className="gray_table_field disabled:disabled_field"
                            disabled={
                                department != 'Quality Assurance' || 
                                    ( department === 'Quality Assurance' && role != 'Supervisor')}
                        />
                        <span> at </span>
                        <input 
                            name='deadline_time' 
                            type='time' 
                            defaultValue={inspection.deadline.toLocaleTimeString('en-GB')} 
                            className="gray_table_field disabled:disabled_field"
                            disabled={
                                department != 'Quality Assurance' || 
                                ( department === 'Quality Assurance' && role != 'Supervisor')}
                        />
                    </td>
                </tr>
                <tr>
                    <td className='font-semibold'> Approved By </td>
                    <td> 
                        {inspection.approved_by === null &&
                            <h2 className="text-red-500"> Approval Pending... </h2>
                        }
                        {inspection.approved_by}
                    </td>
                </tr>
                <tr>
                    <td className='font-semibold'> Inspector </td>
                    <td> {inspection.inspector} </td>
                </tr>
                <tr>
                    <td className='font-semibold'> Location </td>
                    <td> 
                        <input 
                            name='location' 
                            type='text' 
                            defaultValue={inspection.location} 
                            className="gray_table_field disabled:disabled_field"/>
                    </td>
                </tr>

                <tr>
                    <td className='font-semibold'> Observations </td>
                    <td> 
                        <textarea name='observations' className="gray_table_field disabled:disabled_field"
                            defaultValue={inspection.observations}
                            disabled={department != 'Quality Assurance' || 
                                ( department === 'Quality Assurance' && role != 'Line Inspecter')}
                            >
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td className='font-semibold'> Corrective Action </td>
                    <td>
                        <textarea name='corrective_action' className="gray_table_field disabled:disabled_field"
                            defaultValue={inspection.corrective_action}
                            disabled={
                                department != 'Quality Assurance' || 
                                    ( department === 'Quality Assurance' && role != 'Line Inspecter')}
                            >
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td className='font-semibold'> Status </td>
                    <td>
                        <select className="gray_table_field disabled:disabled_field" name='status'>
                            <option selected={inspection.status === 'Not Started'}> Not Started </option>
                            <option selected={inspection.status === 'In Progress'}> In Progress </option>
                            <option selected={inspection.status === 'Completed'}> Completed </option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}


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
                (due on {inspection.deadline.toLocaleDateString()} at {inspection.deadline.toLocaleTimeString()})
            </h2>
        </div>
    )
}


function InspectionsList( {inspection_data, email, user_emails} : {inspection_data : QueryResult<QueryResultRow>, email: string, user_emails: QueryResult<QueryResultRow>}) {

    let inspections = inspection_data.rows;
    const [showDetails, changeDetailShow] = useState('');
    const [showMessage, changeMessage] = useState('');
    const [showMessageID, changeMessageID] = useState('');
    const [msgFormat, changeMsgFormat] = useState('');

    let router = useRouter();

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
                status: newInspectionData.get('status'),
                checklist: newInspectionData.get('checklist'),
                issues: newInspectionData.get('issues'),
                assigned_to: newInspectionData.get('assigned_to'),
                deadline_date: newInspectionData.get('deadline_date'),
                deadline_time: newInspectionData.get('deadline_time')
            })
        })
        router.refresh();

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
        console.log(inspection);
        return (
            <div>
                <h2 className="small_sub_heading italic text-base m-4">
                    (updated on {inspection.updated_at.toLocaleDateString()} at {inspection.updated_at.toLocaleTimeString()})
                </h2>
                <h2 className="small_sub_heading italic text-base m-4">
                    (created on {inspection.created_at.toLocaleDateString()} at {inspection.created_at.toLocaleTimeString()})
                </h2>

                <form className="flex flex-col m-2" onSubmit={handleInspectionChanges}>

                    <input type='hidden' name='id' value={inspection.id} />
                    <input type='hidden' name='email' value={email} />

                    <DisplayInspectionDetails inspection={inspection} user_emails={user_emails}/>
                    
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
                    showDetails !== inspection.id && 
                    <button className="green-button h-1/2" onClick={() => {
                        changeDetailShow(inspection.id)
                        changeMessage('')
                        changeMessageID('')
                    }}>
                        View/Edit Details
                    </button>
                }
                {
                    showDetails === inspection.id && 
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
                <li key={inspection.id}>
                    <hr className="m-2"/>
                    <div className="m-2">
                        <div className="flex flex-row justify-between">
                            <InspectionOverview inspection={inspection} />
                            <ViewEditDetail inspection={inspection}/>
                        </div>
                    </div>
                    {
                        showDetails === inspection.id &&
                        <ShowDetails inspection={inspection}/>
                    }
                    <hr className="m-2"/>
                </li>
            ))}
        </ul>
    )
}

export default function Inspections({inspection_data, email, user_emails} : {inspection_data: QueryResult<QueryResultRow>, email: string, user_emails: QueryResult<QueryResultRow>}) {
    return (
        <section className='m-2'>
            <h1 className='heading'> Inspections </h1>
            <hr className='mb-4'/>

            <SessionProvider>
                <InspectionsList inspection_data={inspection_data} email={email} user_emails={user_emails}/>
            </SessionProvider>
            
        </section>
    )
}
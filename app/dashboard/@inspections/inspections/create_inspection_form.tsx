'use client'
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function InspectionForm({ user_emails } : {user_emails: QueryResult<QueryResultRow>}) {

    let router = useRouter();
    
    const [currentMsg, changeMsg] = useState('');
    const [formatMsg, changeMsgFormat] = useState('');


    let handleInspectionCreation = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let inspectionData = new FormData(e.currentTarget);
        let response = await fetch ('/api/create_inspection', {
            method: 'POST',
            body: JSON.stringify({
                title: inspectionData.get('title'),
                checklist: inspectionData.get('checklist'),
                issues: inspectionData.get('issues'),
                assigned_to: inspectionData.get('assigned_to'),
                location: inspectionData.get('location'),
                deadline_date: inspectionData.get('deadline_date'),
                deadline_time: inspectionData.get('deadline_time') 
            })
        })

        let result = await response.json();

        if (result.error != undefined) {
            changeMsg(`ERROR: ${result.error.detail}`);
            changeMsgFormat('error_msg');
        }
        else {
            changeMsg(`Inspection created successfully. Redirecting you to Inspections page within 3 seconds...`)
            changeMsgFormat('success_msg');
            await new Promise(resolve => setTimeout(resolve, 3000));
            router.push('/dashboard/inspections')
            router.refresh();
        }
    };
    return (
        <form onSubmit={handleInspectionCreation}>
            <table>
                <tbody>
                    <tr>
                        <td className="font-semibold"> Title <span className="text-red-500">*</span> </td>
                        <td> 
                            <input required type='text' name='title' className="gray_table_field" />
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold"> Checklist </td>
                        <td> 
                            <textarea name='checklist' className="gray_table_field">
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold"> Issues </td>
                        <td>
                            <textarea name='issues' className="gray_table_field">
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold"> Assigned To  <span className="text-red-500">*</span> </td>
                        <td>
                            <select required name='assigned_to' className="gray_table_field">
                                {user_emails.rows.map((user_email) => (
                                    <option key={user_email.email} > {user_email.email} </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold"> Location </td>
                        <td>
                            <input name='location' type='text' className="gray_table_field"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold"> Deadline <span className="text-red-500">*</span> </td>
                        <td>
                            <input required name='deadline_date' type='date' className="gray_table_field"/>
                            <span> at </span>
                            <input required name='deadline_time' type='time' className="gray_table_field"/>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2 className={formatMsg}> {currentMsg} </h2>

            <button className="green-button w-fit">
                Create Inspection
            </button>

        </form>
    )
}
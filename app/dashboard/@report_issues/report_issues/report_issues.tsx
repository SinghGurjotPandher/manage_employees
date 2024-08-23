'use client'
import { QueryResult, QueryResultRow } from "@vercel/postgres"
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react"

function CreateANewIssue({emails}: {emails: QueryResult<QueryResultRow>}) {

    const [currentMsg, changeMsg] = useState('');
    const [formatMsg, changeMsgFormat] = useState('');
    let router = useRouter();

    let handleIssueReporting = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let issueData = new FormData(e.currentTarget);

        let response = await fetch('/api/report_issue', {
            method: 'POST',
            body: JSON.stringify({
                name: issueData.get('name'),
                description: issueData.get('description'),
                reporting_to: issueData.get('reporting_to')
            })
        })

        let result = await response.json();

        if (result.error != undefined) {
            changeMsg(`ERROR: ${result.error.detail}`)
            changeMsgFormat('error_msg')
        }
        else {
            router.refresh();
            changeMsg(`Issue reported successfully.`)
            changeMsgFormat('success_msg')
        }

    };

    let formRef = useRef<HTMLFormElement>(null);
    
    return (
        <div>
            <h1 className="sub_heading"> Report a New Issue </h1>
            <hr className='mb-4'/>

            

            <form ref={formRef}
                onSubmit={(e) => {
                    handleIssueReporting(e)
                    if (formRef.current) {
                        formRef.current.reset();
                    }
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="font-semibold"> Name </td>
                            <td>
                                <input name='name' type='text' className="gray_table_field" />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Description</td>
                            <td>
                                <textarea  name='description' className="gray_table_field">
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold"> Report To </td>
                            <td>
                                <select name='reporting_to' className="gray_table_field">
                                    {
                                        emails.rows.map((email) => (
                                            <option key={email.email}> {email.email} </option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2 className={formatMsg}> {currentMsg} </h2>

                <button className="green-button"> Report Issue </button>
            </form>
        </div>
    )
}

export default function ReportIssuesPage({emails}: {emails: QueryResult<QueryResultRow>}) {
    return (
        <section className="flex m-4 h-[525px]">
            <div className="basic_box_scroll">
                <CreateANewIssue emails={emails}/>
            </div>
        </section>
    )
}
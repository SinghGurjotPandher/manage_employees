'use client'
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { useState } from "react";

function NothingSelected() {
    return (
        <div className="flex justify-center">
            <h1 className="subtle_msg"> No report currently selected to view. </h1>
        </div>
    )
}

export default function ViewReports({issues}: {issues: QueryResult<QueryResultRow>}) {

    const [showIssue, changeIssue] = useState<QueryResultRow | null>(null);

    function ReportsData() {
        if (showIssue === null) {
            return <NothingSelected />
        }
        else {
            return (
                <div>
                    <h1 className="heading"> {showIssue.name} </h1>
                    <hr className="mb-4"/>
                    
                    <table>
                        <tbody>
                            <tr>
                                <td className="font-semibold"> Description </td>
                                <td> {showIssue.description} </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Reported To </td>
                                <td> {showIssue.reporting_to} </td>
                            </tr>
                            <tr>
                                <td className="font-semibold"> Created At </td>
                                <td> {showIssue.created_at.toLocaleDateString()} at {showIssue.created_at.toLocaleTimeString()} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (
        <section className="flex m-4 h-[525px]">
            <div className="left_small_scrolling_area">
                <ul>
                    {
                        issues.rows.map((issue) => (
                            <li key={issue.id}
                            onClick={() => {
                                changeIssue(issue)
                            }}
                            className={showIssue === null ? 'simple_list' : ((showIssue.id === issue.id ? 'simple_list bg-green-300' : 'simple_list'))}
                            > {issue.name} </li>
                        ))
                    }
                </ul>
            </div>

            <div className="right_larger_scrolling_area">
                <ReportsData />
            </div>

        </section>
    )
}
import { QueryResult, QueryResultRow } from "@vercel/postgres";

export default function PerformancePage({userPerformanceData} : {userPerformanceData: QueryResult<QueryResultRow>}) {
    return (
        <div className="flex flex-wrap">
            {
                userPerformanceData.rows.map((user) => (
                    <div key={user.email} className="green_table_field m-2">
                        <h1 className="sub_heading"> {user.name} </h1>
                        <h2 className="small_sub_heading_italic"> {user.email} </h2>
                        <h2 className="small_sub_heading_italic font-semibold"> Average Time Taken to Complete a Task: </h2>
                        <h2 className="small_sub_heading_italic"> 
                            {
                                Object.entries(user.performance_average).map(([key, value] ) => (
                                    (key !== "milliseconds") &&
                                    <span key={key}> {value as string} {key} </span>
                                ))
                            }
                        </h2>
                    </div>
                ))
            }
        </div>
    )
}
'use client'
import { QueryResult, QueryResultRow } from '@vercel/postgres';
import InspectionForm from '../../create_inspection_form';
import Dialog from '@/app/dashboard/dialog';


export default function InspectionDialog({user_emails} : {user_emails: QueryResult<QueryResultRow>}) {

    function Contents() {
        return (
            <div>
                <h1 className='heading'> Create a New Inspection </h1>
                <hr className='mb-4'/>
    
                <InspectionForm user_emails={user_emails}/>
            </div>
        )
    }
    
    return (
        <Dialog contents={<Contents />}/>
    )
}


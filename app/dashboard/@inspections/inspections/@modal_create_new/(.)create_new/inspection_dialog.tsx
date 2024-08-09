'use client'
import { QueryResult, QueryResultRow } from '@vercel/postgres';
import { useRouter } from 'next/navigation';
import InspectionForm from '../../create_inspection_form';

// fix needed because overscroll-hidden not working for section

export default function InspectionDialog({user_emails} : {user_emails: QueryResult<QueryResultRow>}) {
    let router = useRouter();
    return (
        // items-center
        <section className='absolute inset-0 flex justify-center bg-slate-200 bg-opacity-75 p-5 overflow-hidden' 
            onClick={(e) => {
                if (e.target === e.currentTarget) { // to ensure section minus div area was clicked
                    router.back();
                }
            }}>
            <div className="scroll-smooth border-2 border-green-500 bg-green-50 p-10 rounded-3xl overflow-auto overscroll-contain w-5/12" >
                <button className="button_logged_in" onClick={() => {
                    router.back();
                }}>
                    CLOSE
                </button>
                
                <h1 className='heading'> Create a New Inspection </h1>
                <hr className='mb-4'/>

                <InspectionForm user_emails={user_emails}/>

            </div>
        </section>
    )
}
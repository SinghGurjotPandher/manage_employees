'use client'
import { QueryResult, QueryResultRow } from '@vercel/postgres';
import { useRouter } from 'next/navigation';

// fix needed because overscroll-hidden not working for section

export default function Dialog({contents} : {contents: React.ReactNode}) {
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

                {contents}


            </div>
            
        </section>
    )
}
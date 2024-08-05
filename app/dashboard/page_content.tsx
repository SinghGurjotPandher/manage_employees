'use client'

import Profile from "./profile";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import React, {useState} from 'react';
import Inspections from "./inspections";

import { useRouter } from "next/navigation";



export default function PageContent({profile_data, inspection_data} : 
    {profile_data: QueryResultRow, inspection_data: QueryResult<QueryResultRow>}
) {
    const [currentView, changeView] = useState('Profile')

    let router = useRouter();


    function UserNavigationButtons() {
        return (
            <div className="flex flex-row m-2">

                <button className={currentView === 'Profile' ? "button_logged_in_shown" : "button_logged_in" } 
                onClick={() => {
                    changeView('Profile');
                }}>
                    Profile
                </button>

                <button className={currentView === 'Inspections' ? "button_logged_in_shown" : "button_logged_in" } 
                onClick={() => {
                    changeView('Inspections');
                }}>
                    Inspections
                </button>

                <button className={currentView === 'Reports' ? "button_logged_in_shown" : "button_logged_in" } 
                onClick={() => {
                    changeView('Reports');
                }}>
                    Reports
                </button>

                <button className={currentView === 'Training' ? "button_logged_in_shown" : "button_logged_in" } 
                onClick={() => {
                    changeView('Training');
                }}>
                    Training
                </button>
                
            </div>
        )
    }

    return (
        <div>
            <UserNavigationButtons />
            {currentView === 'Profile' && <Profile profile_data={profile_data}/>}
            {currentView === 'Inspections' && <Inspections inspection_data={inspection_data} email={profile_data.email}/>}


        </div>
    )
}
'use client'

import Profile from "./profile";
import { QueryResultRow } from "@vercel/postgres";
import React, {useState} from 'react';
import Chat from "./chat";



export default function PageContent({profile_data} : 
    {profile_data: QueryResultRow}
) {
    const [currentView, changeView] = useState('Profile')


    function UserNavigationButtons() {
        return (
            <div className="flex flex-row m-2">

                <button className={currentView === 'Profile' ? "button_logged_in_shown" : "button_logged_in" } 
                onClick={() => {
                    changeView('Profile');
                }}>
                    Profile
                </button>
                
                <button className={currentView === 'Chat' ? "button_logged_in_shown" : "button_logged_in" } 
                onClick={() => {
                    changeView('Chat');
                }}>
                    Chat
                </button>
                
            </div>
        )
    }

    return (
        <div>
            <UserNavigationButtons />
            {currentView === 'Profile' && <Profile profile_data={profile_data}/>}
            {currentView === 'Chat' && <Chat />}
            
        </div>
    )
}
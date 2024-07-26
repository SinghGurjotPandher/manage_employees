'use client'
import React, { useState } from 'react';

export default function RoleInformation() {
    let departmentRoles = {
        'Select a Department' : ['Select a Department First'],
        'Quality Assurance': ['Select a Role','Line Inspecter', 'Technician', 'Coordinator','Supervisor','Dock','Manager','Hygienist'],
        'Operations': ['Select a Role', 'Team Member', 'Machine Operator','Coordinator','Supervisor','Production Manager','Operations Manager'],
        'Maintenance': ['Select a Role', 'Receptionist', 'Mechanics','Coordinator','Supervisor','Manager'],
        'Safety': ['Select a Role', 'Coordinator','Manager','Director'],
        'Human Resources': ['Select a Role', 'Representative','Manager','Senior Representative'],
        'Research and Development': ['Select a Role', 'Chemist','Regulatory Specialist','Food Technologist','Manager'],
        'Lab': ['Select a Role', 'Technician'],
        'Information Technology': ['Select a Role', 'Desk Helper','Manager'],
        'Transportation': ['Select a Role', 'Dispatcher','Manager'],
        'Customer Service': ['Select a Role', 'Representative'],
        'Scheduling': ['Select a Role', 'Supply Chain Analyst','Manager','Demand Planner']
    };
    
    let departmentNotSelected = Object.keys(departmentRoles)[0];
    
    const [departmentSelection, changeSelection] = useState(departmentNotSelected);
    
    return (
        <div className="flex flex-col">
            <label>
                Department <span className="text-red-500">*</span>
                <select required className="field" name='department' onChange={
                    (event) => (
                        changeSelection(event.target.value)
                    )
                }>
                    {Object.entries(departmentRoles).map(([department]) => (
                        <option key={department}> {department}</option>
                    ))}
                </select>
            </label>
            
            { departmentSelection != departmentNotSelected && 
            <label>
                Role <span className="text-red-500">*</span>
                <select required className="field" name='role' >
                    {Object.entries(departmentRoles).map(([department, roles]) => (
                        department === departmentSelection &&
                        roles.map((role) => (
                            <option key={role}> {role} </option> 
                        ))
                    ))}
                </select>
            </label> } 
        </div>
    )
}

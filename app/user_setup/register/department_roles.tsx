'use client'
import { getDeptRoles } from '@/app/dept_roles';
import React, { useState } from 'react';

export default function RoleInformation() {
    let departmentRoles = getDeptRoles();
    
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

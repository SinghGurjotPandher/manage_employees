'use client'

import { QueryResultRow } from "@vercel/postgres"

function Demographics({name, date_of_birth, phone_number, gender, pronouns} :
    {name: string, date_of_birth: string, phone_number: string, gender: string, pronouns: string} ) {
    return (
        <div className='md:flex-none md:w-1/3'>
            <h1 className='sub_heading'> Demographics </h1>
            <div className='content'>
                <table>
                    <tbody>
                        <tr>
                            <td className='font-semibold'> Name </td>
                            <td> {name} </td>
                        </tr>
                        <tr>
                            <td className='font-semibold'> Date of Birth </td>
                            <td> {date_of_birth} </td>
                        </tr>
                        <tr>
                            <td className='font-semibold'> Phone Number </td>
                            <td> {phone_number} </td>
                        </tr>
                        <tr>
                            <td className='font-semibold'> Gender </td>
                            <td> {gender} </td>
                        </tr>
                        <tr>
                            <td className='font-semibold'> Pronouns </td>
                            <td> {pronouns} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function LoginInformation({email} : {email: string}) {
    return (
        <div className='md:flex-none md:w-1/3'>
            <h1 className='sub_heading'> Login Information </h1>
            <div className='content'>
                <table>
                    <tbody>
                        <tr>
                            <td className='font-semibold'> Email </td>
                            <td> {email} </td>
                        </tr>        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Department({department_name, role} : {department_name: string, role: string}) {
    return (
        <div className='md:flex-none md:w-1/3'>
            <h1 className='sub_heading'> Role Information </h1>
            <div className='content'>
                <table>
                    <tbody>
                        <tr>
                            <td className='font-semibold'> Department </td>
                            <td> {department_name} </td>
                        </tr>       
                        <tr>
                            <td className='font-semibold'> Role </td>
                            <td> {role} </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default function Profile({profile_data} : {profile_data: QueryResultRow}) {
    let name = profile_data.name;
    let date_of_birth = profile_data.date_of_birth.toLocaleDateString();
    let phone_number = profile_data.phone_number;
    let gender = profile_data.gender;
    let pronouns = profile_data.pronouns;
    let email = profile_data.email;
    let department_name = profile_data.department_name;
    let role = profile_data.role;

    return (
        <section className='m-2'>
            <h1 className='heading'> Profile </h1>
            <hr className='mb-4'/>
            <div className='md:flex md:flex-nowrap'>
                <Demographics 
                    name={name} 
                    date_of_birth={date_of_birth}
                    phone_number={phone_number}
                    gender={gender}
                    pronouns={pronouns} />
                    
                <LoginInformation 
                    email={email} />

                <Department 
                    department_name={department_name}
                    role={role} />
            </div>
        </section>
    )
}
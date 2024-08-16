import Link from "next/link"
import Logout from "../logout";
import { getServerSession } from "next-auth";
import { auth } from "./auth";


function GeneralButtons({ name } : {name: string}) {
    return (
        <div className='flex flex-row justify-between m-3'>
            <div className='flex flex-row m-2'>
                <h1 className='text-4xl font-bold text-green-900'> Welcome {name}! </h1>
            </div>
            <div className='flex flex-row'>
                <Link href='/' className='button_general_loggedin'>
                    Home
                </Link>
                
                <Logout formatting='button_general_loggedin'/>
            </div>
        </div>
    )
}

// YOU MAY HAVE TO CHANGE THIS LATER -- BECAUSE MULTIPLE DEPARTS WILL BE HAVING 
// ACCESS TO "PERFORMANCE" AND "MANAGE TEAM" TABS
function UserNavigationButtons({department, role} : {department: string, role: string}) {
    return (
        <div className="flex flex-row m-2">
            <Link className='button_logged_in' href='/dashboard/profile'> Profile </Link>
            <Link className='button_logged_in' href='/dashboard/inspections'> Inspections </Link>

            {
                (department === 'Quality Assurance' && (role === 'Supervisor' || role === 'Manager'))
                && 
                <Link className='button_logged_in' href='/dashboard/performance'> Performance </Link>
            }
            {
                (department === 'Quality Assurance' && role === 'Manager')
                &&
                <Link className='button_logged_in' href='/dashboard/manage_team'> Manage Team </Link>
            }
        </div>
    )
}

export default async function DashboardPage() {
    let user = await auth();
    let name = user?.name ?? '';
    let department = user?.department ?? '';
    let role = user?.role ?? '';

    return (
        <section className="flex flex-col">
            <GeneralButtons name={name}/>
            <UserNavigationButtons department={department} role={role}/>
        </section>
    )
}
import Link from "next/link"
import Logout from "../logout";
import { getServerSession } from "next-auth";


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


function UserNavigationButtons() {
    return (
        <div className="flex flex-row m-2">
            <Link className='button_logged_in' href='/dashboard/profile'> Profile </Link>
            <Link className='button_logged_in' href='/dashboard/inspections'> Inspections </Link>


        </div>
    )
}

export default async function DashboardPage() {
    let session = await getServerSession();
    let name = session?.user.name ?? '';

    return (
        <section className="flex flex-col">
            <GeneralButtons name={name}/>
            <UserNavigationButtons />
        </section>
    )
}
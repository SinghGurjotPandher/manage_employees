import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth";

import Logout from "./logout";

export default async function Home() {
  let session = await getServerSession();
  return (
    <main className="flex place-items-center h-screen">
      <div className='container mx-auto flex flex-col gap-10 max-w-md bg-cyan-100 rounded p-20'>
        <h1 className='flex justify-center font-bold text-2xl'> Employee Management </h1>

        {
          !session && 
          <Link href='user_setup/register' className='button p-5 text-xl'>
            Register
          </Link>
        }
        
        {
          !session && 
          <Link href='user_setup/login' className='button p-5 text-xl'>
            Login
          </Link>
        }

        
        {
          session && 
          <Link href='/dashboard' className='button p-5 text-xl'>
            Dashboard
          </Link>
        }

        {
          session && 
          <Logout />
        }
        
        
        
      </div>
    </main>
  );
}

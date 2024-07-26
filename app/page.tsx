import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex place-items-center h-screen">
      <div className='container mx-auto flex flex-col gap-10 max-w-md bg-cyan-100 rounded p-20'>
        <h1 className='flex justify-center font-bold text-2xl'> Employee Management </h1>
        <Link href='user_setup/register' className='button p-5 text-xl'>
          Register
        </Link>
        
        <Link href='user_setup/login' className='button p-5 text-xl'>
          Login
        </Link>
      </div>
    </main>
  );
}

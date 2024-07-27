import Link from "next/link";

export default function RegistrationSuccessfulPage() {
    return (
        <section className="flex place-items-center h-screen">
            <div className='container mx-auto flex flex-col gap-10 max-w-lg bg-cyan-100 rounded p-20'>

                <h1 className='flex justify-center font-bold text-2xl text-green-500'> User Registered Successfully </h1>

            </div>
        </section>
    )
}
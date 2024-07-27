

export default function LoginPage() {
    return (
        <section className="flex place-items-center h-screen">
            <div className='container mx-auto flex flex-col gap-10 max-w-lg bg-cyan-100 rounded p-20'>

                <h1 className='flex justify-center font-bold text-2xl'> Login </h1>

                <form className="flex flex-col">                
                    <label>
                        Email <span className="text-red-500">*</span>
                        <input required type='password' name='password' className="field"/>
                    </label>

                    <label>
                        Password <span className="text-red-500">*</span>
                        <input required type='password' name='password' className="field"/>
                    </label>

                    <button className='button p-3 text-lg mt-5'>
                        Login
                    </button>
                </form>
            </div>
        </section>
    )
}
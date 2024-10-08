import { getServerSession } from "next-auth"
import RegisterPage from "./register_page"
import { redirect } from "next/navigation"

export default async function Register() {

    let session = await getServerSession();
    if (session) {
        redirect('/')
    }

    return (
        <RegisterPage />
    )
}
import { getServerSession } from "next-auth"
import LoginPage from "./login_page"
import { redirect } from "next/navigation"

export default async function Login() {

    let session = await getServerSession();
    if (session) {
        redirect('/')
    }

    return (
        <LoginPage />
    )
}
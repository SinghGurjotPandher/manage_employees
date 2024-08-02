import { getServerSession } from "next-auth"
import LoginPage from "./login_page"
import { redirect } from "next/navigation"

export default async function Login() {

    let session = await getServerSession();
    if (session) {
        // In dashboard -- this will keep you at /dashboard -- which will redirect to / (i.e. home)
        // page because of middleware
        redirect('/')
    }

    return (
        <LoginPage />
    )
}
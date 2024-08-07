import { getServerSession } from "next-auth";
import Profile from "./profile_page";
import { sql } from "@vercel/postgres";

async function ProfileData() {
    let session = await getServerSession();
    let userData = await sql `
    SELECT * FROM users 
    WHERE email=${session?.user.email};`
    return userData.rows[0];
}


export default async function ProfilePage() {
    let profile_data = await ProfileData();
    return (
        <Profile profile_data={profile_data} />
    )
}
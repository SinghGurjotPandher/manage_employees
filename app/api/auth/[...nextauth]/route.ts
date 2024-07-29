import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import { User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


let authOptions = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/user_setup/login'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                let findUserInfo = await sql `
                SELECT * FROM users WHERE email=${credentials?.email};`


                let userInfo = findUserInfo.rows[0];

                console.log('USE INFO HERE');

                console.log(userInfo)

                let checkPassword = await compare(credentials?.password || '', userInfo.password);

                if (checkPassword) {
                    return userInfo as User
                }
                return null;
            }
        })
    ]
})


//export default NextAuth(authOptions);

export { authOptions as GET, authOptions as POST};
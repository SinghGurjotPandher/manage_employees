import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import { DefaultSession, NextAuthOptions, TokenSet } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export type User = {
    id: string,
    department: string,
    role: string
} & DefaultSession['user'];

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User
    }
}

const handler : NextAuthOptions = ({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/user_setup/login'
    },
    providers: [
        // Username, password credentials are used to log in a user. 
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            // Query the database to compare passwords -- determines whether to authorize a
            // user to access private pages of the application.
            async authorize(credentials, req) {
                let findUserInfo = await sql `
                SELECT * FROM users WHERE email=${credentials?.email};`
                let userInfo = findUserInfo.rows[0];

                let checkPassword = await compare(credentials?.password || '', userInfo?.password);

                if (checkPassword) {
                    return {
                        id: userInfo?.id,
                        name: userInfo?.name,
                        email: userInfo?.email,
                        department: userInfo?.department_name,
                        role: userInfo?. role
                    };
                }
                return null;
            }
        })
    ],
    callbacks: {
        // populates the token -- which is then used to populate the session information
        // which is then used to display application pages conditionally based on user's
        // role (role-based authentication)
        async jwt ({ token, user })  {
            if (user) {
                token.id = user?.id;
                token.department = (user as User).department;
                token.role = (user as User).role; 
            }
            return token;
        },
        
        async session({ session, token}) {
            console.log('SESSION EXECUTED');
            if (session?.user) {
                session.user.id = token.id as string,
                session.user.department = token.department as string;
                session.user.role = token.role as string;                
            }
            return session;
        },
        
    },
})

export const GET = NextAuth(handler);
export const POST = NextAuth(handler);
export const authOptions = handler;
export default NextAuth(handler);
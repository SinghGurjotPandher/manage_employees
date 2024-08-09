import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import {authConfig} from '@/app/api/auth/[...nextauth]/route'


export async function auth (        
    ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
    const session = await getServerSession(
        ...args,
        authConfig
    )
    return session?.user;
}
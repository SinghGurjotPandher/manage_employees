import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export { default } from 'next-auth/middleware'
/*
export async function middleware(request: any) {

    const token = await getToken({ req: request});

    console.log(token);

    switch (token?.role) {

        case 'Coordinator':
            console.log(request.url)
            return NextResponse.redirect(new URL('http://localhost:3000'), request.url);
            break;

        default:
            return NextResponse.redirect(new URL('/user_setup/login'), request.url);

    }

}
*/

export const config = {
    matcher: ['/dashboard']
};
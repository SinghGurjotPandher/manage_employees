import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request});

    switch (token?.role) {
        

        case 'Line Inspecter':
            if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            break;

        case 'Supervisor':
            if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            break;
        
        default:
            return NextResponse.redirect(new URL('/user_setup/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard','/dashboard/profile','/dashboard/inspections']
};
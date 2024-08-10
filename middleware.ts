import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request});

    switch (token?.role) {
        

        case 'Line Inspecter':
            if (token?.department === 'Quality Assurance') {
                if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
                if (request.nextUrl.pathname.startsWith("/dashboard/inspections/create_new")) {
                    return NextResponse.redirect(new URL('/dashboard/inspections', request.url));
                }    
            }
            else {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            break;

        case 'Supervisor':
            if (token?.department === 'Quality Assurance') {
                if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            }
            else {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            break;
        
        default:
            return NextResponse.redirect(new URL('/user_setup/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard','/dashboard/profile','/dashboard/inspections','/dashboard/inspections/create_new']
};
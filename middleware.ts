import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request});

    switch (token?.department) {
        case 'Quality Assurance':
            switch(token?.role){
                case 'Line Inspecter':
                    if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/inspections/create_new")) {
                        return NextResponse.redirect(new URL('/dashboard/inspections', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/performance")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/manage_team")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/manage_inventory")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/view_reports")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }


                    break;
                
                case 'Supervisor':
                    if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/manage_team")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/manage_inventory")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/view_reports")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }

                    break;
                
                case 'Manager':
                    if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/manage_inventory")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/view_reports")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }

                    break;

                
                default:
                    return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            break;
        case 'Operations':
            switch(token?.role) {
                case 'Machine Operator':
                    if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/performance")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/inspections")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/manage_team")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/view_reports")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    break;
                
                case 'Production Supervisor':
                    if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/inspections")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/performance")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }

                    if (request.nextUrl.pathname.startsWith("/dashboard/manage_team")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/report_issues")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }


                    break;
                    
                case 'Operations Manager':
                    if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/inspections")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    if (request.nextUrl.pathname.startsWith("/dashboard/performance")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }

                    if (request.nextUrl.pathname.startsWith("/dashboard/report_issues")) {
                        return NextResponse.redirect(new URL('/dashboard', request.url));
                    }
                    break;



                default:
                    return NextResponse.redirect(new URL('/dashboard', request.url));


            }
            break;
            
        
        default:
            return NextResponse.redirect(new URL('/user_setup/login', request.url));       
    }
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/profile',
        '/dashboard/inspections',
        '/dashboard/inspections/create_new',
        '/dashboard/performance',
        '/dashboard/manage_team',
        '/dashboard/manage_inventory',
        '/dashboard/report_issues',
        '/dashboard/view_reports'
    ]
};
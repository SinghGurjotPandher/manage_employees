'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let pathName = usePathname();
  return (
    <html lang="en" >
      <body className="bg-cyan-50">
        <div className="flex justify-end">  
                       
            <Link href='/' className="button max-w-sm">
                Home
            </Link>

            {
            pathName != '/user_setup/login' &&
            <Link href='/user_setup/login' className="button max-w-sm">
                Login
            </Link>
            }

            {
            pathName != '/user_setup/register' && pathName != '/user_setup/register/successful' &&
            <Link href='/user_setup/register' className="button max-w-sm">
                Register
            </Link>
            }
            
        </div>
        {children}
      </body>
    </html>
  );
}
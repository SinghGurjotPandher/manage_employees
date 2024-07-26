'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="bg-cyan-50">
        <div className="flex justify-end">             
            <Link href='/' className="button max-w-sm">
                Home
            </Link>
            {
            usePathname() != '/user_setup/login' &&
            <Link href='/user_setup/login' className="button max-w-sm">
                Login
            </Link>
            }

            {
            usePathname() != '/user_setup/register' &&
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
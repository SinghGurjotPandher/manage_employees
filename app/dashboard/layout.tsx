
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className='bg-green-50'>
      <body>
        {children}
      </body>
    </html>
  );
}

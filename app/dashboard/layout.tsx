export default function DashboardLayout({
  children, profile, inspections
}: {
  children: React.ReactNode,
  profile: React.ReactNode,
  inspections: React.ReactNode
}) {

  return (
    <html lang="en" className='bg-green-50'>
      <body>
        {children}
        {profile}
        {inspections}
      </body>
    </html>
  );
}
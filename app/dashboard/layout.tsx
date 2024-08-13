export default function DashboardLayout({
  children, profile, inspections, performance
}: {
  children: React.ReactNode,
  profile: React.ReactNode,
  inspections: React.ReactNode,
  performance: React.ReactNode
}) {

  return (
    <html lang="en" className='bg-green-50'>
      <body>
        {children}
        {profile}
        {inspections}
        {performance}
      </body>
    </html>
  );
}
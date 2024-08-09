export default function DashboardLayout({
  children, profile, inspections, training
}: {
  children: React.ReactNode,
  profile: React.ReactNode,
  inspections: React.ReactNode,
  training: React.ReactNode
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
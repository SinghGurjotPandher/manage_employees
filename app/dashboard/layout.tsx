export default function DashboardLayout({
  children, profile, inspections, performance, manage_team, manage_inventory
}: {
  children: React.ReactNode,
  profile: React.ReactNode,
  inspections: React.ReactNode,
  performance: React.ReactNode,
  manage_team: React.ReactNode,
  manage_inventory: React.ReactNode
}) {

  return (
    <html lang="en" className='bg-green-50'>
      <body>
        {children}
        {profile}
        {inspections}
        {performance}
        {manage_team}
        {manage_inventory}
      </body>
    </html>
  );
}
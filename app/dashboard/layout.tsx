export default function DashboardLayout({
  children, profile, inspections, performance, manage_team, manage_inventory, report_issues, view_reports
}: {
  children: React.ReactNode,
  profile: React.ReactNode,
  inspections: React.ReactNode,
  performance: React.ReactNode,
  manage_team: React.ReactNode,
  manage_inventory: React.ReactNode,
  report_issues: React.ReactNode,
  view_reports: React.ReactNode
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
        {report_issues}
        {view_reports}
      </body>
    </html>
  );
}
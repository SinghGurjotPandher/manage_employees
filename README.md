# Employee Management System
This is a full-stack web application built with Next.js, designed to manage employees, track performance, and facilitate operational tasks across different departments, specifically Quality Assurance and Operations.
The system implements strict role-based access control to ensure each user only sees and interacts with the features relevant to their department and job role.
## Technology Stack
- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js with Credentials Provider _/route.ts_
  - Passwords are secured using _bcrypt_ hashing.
- **Database:** PostgreSQL, utilizing _@vercel/postgres_
- **Routing:** Utilizes Next.js App Router, including Parallel Routes (Slots) for main dashboard views and Intercepting Routes for modals.
- **Authorization:** Middleware for Role-Based Access Control.

## Core Features
### Modules
1. **New Registration & Profile**
    -  New Employees can register with personal, department, and role information.
    -  Users log in using email and password credentials.
    -  View personal demographic, login, and role information on the Profile page.
2. **Inspections (QA)**
    - **Create New Inspection:** QA Supervisors and Managers can create new inspections, defining a checklist, issues, location, deadline, and assigning it to a QA user.
    - **View & Edit:** Users see a list of relevant inspections (either all QA inspections for managers/supervisors, or only those assigned to them for others).
    - The editable fields are restricted based on role (e.g., Line Inspectors can only update _observations_ and _corrective_action_).
4. **Performance (QA Supervisors/Managers)**
    - Displays a Key Performance Indicator: the average time taken by each QA user to complete an inspection (calculated as the difference between _updated_at_ and _created_at_ for completed inspections).
6. **Manage Inventory (Operations)**
    - Allows Operations Supervisors/Managers to view, add, and update machine information, including maintenance schedules and status (_Operational, Under Maintenance, Out of Service_).
8. **Report Issues (Machine Operators)**
    - Machine Operators can report new equipment issues to specific Operations Supervisors or Managers via email selection.
9. **View Reported Issues (Operations Supervisors/Managers)**
    - Displays a list of issues reported to the currently logged-in user.
10. **Manage Team (Managers)**
    - Allows Managers (QA or Operations) to view and update the _role_ and _hourly_salary_ for employees within their department.

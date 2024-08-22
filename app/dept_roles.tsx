export type jsonDepartmentRoles = {
    'Select a Department': string[];
    'Quality Assurance': string[];
    'Operations': string[];
}

export function getDeptRoles() {
    let departmentRoles : jsonDepartmentRoles = {
        'Select a Department' : ['Select a Department First'],
        'Quality Assurance': ['Select a Role','Line Inspecter', 'Supervisor','Manager'],
        'Operations': ['Select a Role', 'Machine Operator','Production Supervisor','Operations Manager']
    }
    return departmentRoles
};


/*
To extend this project to a larger scale:
    let departmentRoles : jsonDepartmentRoles = {
        'Select a Department' : ['Select a Department First'],
        'Quality Assurance': ['Select a Role','Line Inspecter', 'Technician', 'Coordinator','Supervisor','Dock','Manager','Hygienist'],
        'Operations': ['Select a Role', 'Team Member', 'Machine Operator','Coordinator','Supervisor','Production Manager','Operations Manager'],
        'Maintenance': ['Select a Role', 'Receptionist', 'Mechanics','Coordinator','Supervisor','Manager'],
        'Safety': ['Select a Role', 'Coordinator','Manager','Director'],
        'Human Resources': ['Select a Role', 'Representative','Manager','Senior Representative'],
        'Research and Development': ['Select a Role', 'Chemist','Regulatory Specialist','Food Technologist','Manager'],
        'Lab': ['Select a Role', 'Technician'],
        'Information Technology': ['Select a Role', 'Desk Helper','Manager'],
        'Transportation': ['Select a Role', 'Dispatcher','Manager'],
        'Customer Service': ['Select a Role', 'Representative'],
        'Scheduling': ['Select a Role', 'Supply Chain Analyst','Manager','Demand Planner']
    }
*/
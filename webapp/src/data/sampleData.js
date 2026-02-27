// Realistic sample data for NIS 2 EA Framework
// 100 applications with proportional infrastructure, security, and business entities

// Helper function to generate ID
const genId = (prefix, num) => `${prefix}-${String(num).padStart(3, '0')}`;

// ============================================================================
// APPLICATION SYSTEMS (100)
// ============================================================================
export const sampleApplicationSystems = [
  // Core Business Applications
  { id: genId('app', 1), name: 'ERP System', description: 'Enterprise Resource Planning', criticality: 'critical', owner: 'IT Department', status: 'production', users: 500, dataClassification: 'confidential', lifecyclePhase: 'production', plannedDate: '2020-01-01', productionDate: '2021-03-15', retirementDate: '2028-12-31' },
  { id: genId('app', 2), name: 'CRM Platform', description: 'Customer Relationship Management', criticality: 'critical', owner: 'Sales Department', status: 'production', users: 350, dataClassification: 'confidential', lifecyclePhase: 'production', plannedDate: '2021-06-01', productionDate: '2022-01-10', retirementDate: '2027-06-30' },
  { id: genId('app', 3), name: 'Customer Portal', description: 'Customer self-service portal', criticality: 'critical', owner: 'IT Department', status: 'production', users: 50000, dataClassification: 'confidential', lifecyclePhase: 'maintenance', plannedDate: '2019-03-01', productionDate: '2020-09-01', retirementDate: '2026-03-31' },
  { id: genId('app', 4), name: 'HR Management System', description: 'Human Resources platform', criticality: 'high', owner: 'HR Department', status: 'production', users: 200, dataClassification: 'confidential', lifecyclePhase: 'production', plannedDate: '2022-01-01', productionDate: '2023-04-01', retirementDate: '2029-12-31' },
  { id: genId('app', 5), name: 'Financial Management', description: 'Financial accounting and reporting', criticality: 'critical', owner: 'Finance Department', status: 'production', users: 150, dataClassification: 'secret', lifecyclePhase: 'production', plannedDate: '2020-09-01', productionDate: '2021-12-01', retirementDate: '2028-06-30' },
  
  // E-Commerce & Web
  { id: genId('app', 6), name: 'E-Commerce Platform', description: 'Online store and shopping', criticality: 'critical', owner: 'Sales Department', status: 'production', users: 100000, dataClassification: 'confidential', lifecyclePhase: 'production', plannedDate: '2021-01-01', productionDate: '2022-06-15', retirementDate: '2029-12-31' },
  { id: genId('app', 7), name: 'Payment Gateway', description: 'Payment processing system', criticality: 'critical', owner: 'Finance Department', status: 'production', users: 100000, dataClassification: 'secret', lifecyclePhase: 'production', plannedDate: '2021-03-01', productionDate: '2022-07-01', retirementDate: '2030-06-30' },
  { id: genId('app', 8), name: 'Product Catalog', description: 'Product information management', criticality: 'high', owner: 'Sales Department', status: 'production', users: 80, dataClassification: 'internal', lifecyclePhase: 'maintenance', plannedDate: '2018-06-01', productionDate: '2019-12-01', retirementDate: '2025-12-31' },
  { id: genId('app', 9), name: 'Order Management', description: 'Order processing and fulfillment', criticality: 'critical', owner: 'Operations', status: 'production', users: 200, dataClassification: 'confidential', lifecyclePhase: 'production', plannedDate: '2020-11-01', productionDate: '2022-03-01', retirementDate: '2028-12-31' },
  { id: genId('app', 10), name: 'Inventory System', description: 'Warehouse and inventory tracking', criticality: 'high', owner: 'Operations', status: 'production', users: 120, dataClassification: 'internal', lifecyclePhase: 'phaseout', plannedDate: '2017-01-01', productionDate: '2018-06-01', retirementDate: '2026-06-30' },
  
  // Communication & Collaboration
  { id: genId('app', 11), name: 'Email System', description: 'Corporate email platform', criticality: 'critical', owner: 'IT Department', status: 'production', users: 800, dataClassification: 'confidential' },
  { id: genId('app', 12), name: 'Document Management', description: 'Central document repository', criticality: 'high', owner: 'IT Department', status: 'production', users: 600, dataClassification: 'confidential' },
  { id: genId('app', 13), name: 'Collaboration Suite', description: 'Teams and collaboration tools', criticality: 'high', owner: 'IT Department', status: 'production', users: 750, dataClassification: 'internal' },
  { id: genId('app', 14), name: 'Video Conferencing', description: 'Virtual meeting platform', criticality: 'medium', owner: 'IT Department', status: 'production', users: 500, dataClassification: 'internal' },
  { id: genId('app', 15), name: 'Intranet Portal', description: 'Internal company portal', criticality: 'medium', owner: 'HR Department', status: 'production', users: 800, dataClassification: 'internal' },
  
  // Analytics & BI
  { id: genId('app', 16), name: 'Data Warehouse', description: 'Central data warehouse', criticality: 'high', owner: 'IT Department', status: 'production', users: 100, dataClassification: 'confidential' },
  { id: genId('app', 17), name: 'BI Dashboard', description: 'Business intelligence and reporting', criticality: 'high', owner: 'IT Department', status: 'production', users: 250, dataClassification: 'confidential' },
  { id: genId('app', 18), name: 'Analytics Platform', description: 'Data analytics and visualization', criticality: 'medium', owner: 'IT Department', status: 'production', users: 150, dataClassification: 'internal' },
  { id: genId('app', 19), name: 'Customer Analytics', description: 'Customer behavior analysis', criticality: 'medium', owner: 'Marketing Department', status: 'production', users: 80, dataClassification: 'confidential' },
  { id: genId('app', 20), name: 'Sales Analytics', description: 'Sales performance tracking', criticality: 'medium', owner: 'Sales Department', status: 'production', users: 100, dataClassification: 'internal' },
  
  // Security & Identity
  { id: genId('app', 21), name: 'Identity Management', description: 'IAM and SSO platform', criticality: 'critical', owner: 'Security Team', status: 'production', users: 800, dataClassification: 'secret', lifecyclePhase: 'production', plannedDate: '2021-09-01', productionDate: '2023-02-01', retirementDate: '2030-12-31' },
  { id: genId('app', 22), name: 'Access Control System', description: 'Authorization and permissions', criticality: 'critical', owner: 'Security Team', status: 'production', users: 800, dataClassification: 'secret', lifecyclePhase: 'production', plannedDate: '2021-10-01', productionDate: '2023-03-01', retirementDate: '2031-06-30' },
  { id: genId('app', 23), name: 'SIEM Platform', description: 'Security information and event management', criticality: 'critical', owner: 'Security Team', status: 'production', users: 20, dataClassification: 'secret', lifecyclePhase: 'production', plannedDate: '2022-06-01', productionDate: '2023-12-01', retirementDate: '2029-12-31' },
  { id: genId('app', 24), name: 'Vulnerability Scanner', description: 'Security vulnerability assessment', criticality: 'high', owner: 'Security Team', status: 'production', users: 15, dataClassification: 'confidential', lifecyclePhase: 'maintenance', plannedDate: '2019-03-01', productionDate: '2020-09-01', retirementDate: '2027-03-31' },
  { id: genId('app', 25), name: 'Firewall Manager', description: 'Network firewall management', criticality: 'critical', owner: 'Security Team', status: 'production', users: 10, dataClassification: 'secret', lifecyclePhase: 'production', plannedDate: '2020-01-01', productionDate: '2021-06-01', retirementDate: '2028-12-31' },
  
  // Infrastructure & Operations
  { id: genId('app', 26), name: 'Monitoring System', description: 'Infrastructure monitoring', criticality: 'critical', owner: 'IT Operations', status: 'production', users: 30, dataClassification: 'internal', lifecyclePhase: 'production', plannedDate: '2022-01-01', productionDate: '2023-06-01', retirementDate: '2030-06-30' },
  { id: genId('app', 27), name: 'Backup System', description: 'Data backup and recovery', criticality: 'critical', owner: 'IT Operations', status: 'production', users: 10, dataClassification: 'confidential', lifecyclePhase: 'production', plannedDate: '2020-06-01', productionDate: '2021-12-01', retirementDate: '2029-12-31' },
  { id: genId('app', 28), name: 'Configuration Management', description: 'IT configuration database', criticality: 'high', owner: 'IT Operations', status: 'production', users: 25, dataClassification: 'internal', lifecyclePhase: 'maintenance', plannedDate: '2018-01-01', productionDate: '2019-06-01', retirementDate: '2026-12-31' },
  { id: genId('app', 29), name: 'Patch Management', description: 'Software update management', criticality: 'high', owner: 'IT Operations', status: 'production', users: 15, dataClassification: 'internal', lifecyclePhase: 'development', plannedDate: '2025-01-01', productionDate: '2026-03-01', retirementDate: '2032-12-31' },
  { id: genId('app', 30), name: 'Service Desk', description: 'IT support ticket system', criticality: 'high', owner: 'IT Support', status: 'production', users: 850, dataClassification: 'internal', lifecyclePhase: 'production', plannedDate: '2021-03-01', productionDate: '2022-09-01', retirementDate: '2029-06-30' },
  
  // Development & DevOps
  { id: genId('app', 31), name: 'Source Control', description: 'Git repository management', criticality: 'high', owner: 'Development Team', status: 'production', users: 120, dataClassification: 'confidential', lifecyclePhase: 'production', plannedDate: '2020-09-01', productionDate: '2021-12-01', retirementDate: '2028-12-31' },
  { id: genId('app', 32), name: 'CI/CD Pipeline', description: 'Continuous integration and deployment', criticality: 'high', owner: 'Development Team', status: 'production', users: 80, dataClassification: 'internal', lifecyclePhase: 'production', plannedDate: '2021-06-01', productionDate: '2022-12-01', retirementDate: '2029-06-30' },
  { id: genId('app', 33), name: 'Container Registry', description: 'Docker image repository', criticality: 'medium', owner: 'Development Team', status: 'production', users: 60, dataClassification: 'internal', lifecyclePhase: 'planned', plannedDate: '2026-01-01', productionDate: '2027-06-01', retirementDate: '2033-12-31' },
  { id: genId('app', 34), name: 'API Gateway', description: 'API management and routing', criticality: 'critical', owner: 'Development Team', status: 'production', users: 50000, dataClassification: 'internal', lifecyclePhase: 'production', plannedDate: '2022-03-01', productionDate: '2023-09-01', retirementDate: '2030-12-31' },
  { id: genId('app', 35), name: 'Testing Platform', description: 'Automated testing system', criticality: 'medium', owner: 'QA Team', status: 'production', users: 40, dataClassification: 'internal', lifecyclePhase: 'development', plannedDate: '2025-06-01', productionDate: '2026-12-01', retirementDate: '2032-06-30' },
  
  // Mobile Applications
  { id: genId('app', 36), name: 'Mobile Banking App', description: 'Customer mobile banking', criticality: 'critical', owner: 'Digital Team', status: 'production', users: 80000, dataClassification: 'secret' },
  { id: genId('app', 37), name: 'Mobile CRM', description: 'Sales mobile application', criticality: 'high', owner: 'Sales Department', status: 'production', users: 200, dataClassification: 'confidential' },
  { id: genId('app', 38), name: 'Employee App', description: 'Internal employee mobile app', criticality: 'medium', owner: 'HR Department', status: 'production', users: 600, dataClassification: 'internal' },
  { id: genId('app', 39), name: 'Field Service App', description: 'Technician mobile application', criticality: 'high', owner: 'Operations', status: 'production', users: 150, dataClassification: 'internal' },
  { id: genId('app', 40), name: 'Customer Support App', description: 'Support team mobile tool', criticality: 'medium', owner: 'Customer Service', status: 'production', users: 80, dataClassification: 'confidential' },
  
  // Supply Chain & Logistics
  { id: genId('app', 41), name: 'Supply Chain Management', description: 'End-to-end supply chain', criticality: 'critical', owner: 'Operations', status: 'production', users: 180, dataClassification: 'confidential' },
  { id: genId('app', 42), name: 'Logistics Platform', description: 'Shipping and delivery tracking', criticality: 'high', owner: 'Logistics', status: 'production', users: 120, dataClassification: 'internal' },
  { id: genId('app', 43), name: 'Warehouse Management', description: 'Warehouse operations system', criticality: 'high', owner: 'Operations', status: 'production', users: 200, dataClassification: 'internal' },
  { id: genId('app', 44), name: 'Procurement System', description: 'Purchase order management', criticality: 'high', owner: 'Procurement', status: 'production', users: 80, dataClassification: 'confidential' },
  { id: genId('app', 45), name: 'Supplier Portal', description: 'Vendor collaboration platform', criticality: 'medium', owner: 'Procurement', status: 'production', users: 300, dataClassification: 'internal' },
  
  // Marketing & Sales
  { id: genId('app', 46), name: 'Marketing Automation', description: 'Campaign management platform', criticality: 'high', owner: 'Marketing Department', status: 'production', users: 50, dataClassification: 'confidential' },
  { id: genId('app', 47), name: 'Lead Management', description: 'Sales lead tracking', criticality: 'high', owner: 'Sales Department', status: 'production', users: 150, dataClassification: 'confidential' },
  { id: genId('app', 48), name: 'Content Management', description: 'Website CMS platform', criticality: 'high', owner: 'Marketing Department', status: 'production', users: 40, dataClassification: 'internal' },
  { id: genId('app', 49), name: 'Social Media Management', description: 'Social media tools', criticality: 'medium', owner: 'Marketing Department', status: 'production', users: 25, dataClassification: 'internal' },
  { id: genId('app', 50), name: 'Email Marketing', description: 'Email campaign platform', criticality: 'medium', owner: 'Marketing Department', status: 'production', users: 35, dataClassification: 'confidential' },
  
  // Customer Service
  { id: genId('app', 51), name: 'Call Center Platform', description: 'Customer service phone system', criticality: 'critical', owner: 'Customer Service', status: 'production', users: 200, dataClassification: 'confidential' },
  { id: genId('app', 52), name: 'Live Chat System', description: 'Real-time customer chat', criticality: 'high', owner: 'Customer Service', status: 'production', users: 100, dataClassification: 'confidential' },
  { id: genId('app', 53), name: 'Knowledge Base', description: 'Self-service knowledge articles', criticality: 'medium', owner: 'Customer Service', status: 'production', users: 50000, dataClassification: 'public' },
  { id: genId('app', 54), name: 'Survey Platform', description: 'Customer feedback surveys', criticality: 'medium', owner: 'Customer Service', status: 'production', users: 60, dataClassification: 'internal' },
  { id: genId('app', 55), name: 'Complaint Management', description: 'Customer complaint tracking', criticality: 'high', owner: 'Customer Service', status: 'production', users: 80, dataClassification: 'confidential' },
  
  // Compliance & Legal
  { id: genId('app', 56), name: 'Compliance Management', description: 'Regulatory compliance tracking', criticality: 'critical', owner: 'Compliance Team', status: 'production', users: 40, dataClassification: 'confidential' },
  { id: genId('app', 57), name: 'Contract Management', description: 'Legal contract repository', criticality: 'high', owner: 'Legal Department', status: 'production', users: 50, dataClassification: 'confidential' },
  { id: genId('app', 58), name: 'Audit Management', description: 'Internal audit system', criticality: 'high', owner: 'Compliance Team', status: 'production', users: 30, dataClassification: 'confidential' },
  { id: genId('app', 59), name: 'Policy Management', description: 'Corporate policy repository', criticality: 'medium', owner: 'Compliance Team', status: 'production', users: 800, dataClassification: 'internal' },
  { id: genId('app', 60), name: 'Risk Management', description: 'Enterprise risk assessment', criticality: 'high', owner: 'Risk Team', status: 'production', users: 50, dataClassification: 'confidential' },
  
  // IoT & Smart Devices
  { id: genId('app', 61), name: 'IoT Platform', description: 'IoT device management', criticality: 'high', owner: 'IT Department', status: 'production', users: 30, dataClassification: 'internal' },
  { id: genId('app', 62), name: 'Building Management', description: 'Smart building controls', criticality: 'medium', owner: 'Facilities', status: 'production', users: 15, dataClassification: 'internal' },
  { id: genId('app', 63), name: 'Asset Tracking', description: 'Physical asset monitoring', criticality: 'medium', owner: 'Operations', status: 'production', users: 40, dataClassification: 'internal' },
  { id: genId('app', 64), name: 'Environmental Monitoring', description: 'Facility environmental sensors', criticality: 'low', owner: 'Facilities', status: 'production', users: 10, dataClassification: 'internal' },
  
  // Industry-Specific
  { id: genId('app', 65), name: 'Production Planning', description: 'Manufacturing planning system', criticality: 'critical', owner: 'Manufacturing', status: 'production', users: 120, dataClassification: 'confidential' },
  { id: genId('app', 66), name: 'Quality Management', description: 'Quality control and testing', criticality: 'high', owner: 'Quality Assurance', status: 'production', users: 80, dataClassification: 'internal' },
  { id: genId('app', 67), name: 'Maintenance Management', description: 'Equipment maintenance tracking', criticality: 'high', owner: 'Maintenance', status: 'production', users: 60, dataClassification: 'internal' },
  { id: genId('app', 68), name: 'Laboratory Information', description: 'Lab data management', criticality: 'high', owner: 'R&D', status: 'production', users: 50, dataClassification: 'confidential' },
  { id: genId('app', 69), name: 'R&D Platform', description: 'Research and development tools', criticality: 'medium', owner: 'R&D', status: 'production', users: 70, dataClassification: 'confidential' },
  { id: genId('app', 70), name: 'Product Lifecycle', description: 'PLM system', criticality: 'high', owner: 'R&D', status: 'production', users: 90, dataClassification: 'confidential' },
  
  // Integrations & Middleware
  { id: genId('app', 71), name: 'Integration Platform', description: 'Enterprise service bus', criticality: 'critical', owner: 'IT Department', status: 'production', users: 20, dataClassification: 'internal' },
  { id: genId('app', 72), name: 'Message Queue', description: 'Async message broker', criticality: 'critical', owner: 'IT Department', status: 'production', users: 15, dataClassification: 'internal' },
  { id: genId('app', 73), name: 'Data Sync Service', description: 'Cross-system data synchronization', criticality: 'high', owner: 'IT Department', status: 'production', users: 10, dataClassification: 'internal' },
  { id: genId('app', 74), name: 'ETL Pipeline', description: 'Extract, transform, load jobs', criticality: 'high', owner: 'IT Department', status: 'production', users: 12, dataClassification: 'internal' },
  
  // Training & Learning
  { id: genId('app', 75), name: 'LMS Platform', description: 'Learning management system', criticality: 'medium', owner: 'HR Department', status: 'production', users: 800, dataClassification: 'internal' },
  { id: genId('app', 76), name: 'Onboarding System', description: 'New employee onboarding', criticality: 'medium', owner: 'HR Department', status: 'production', users: 100, dataClassification: 'internal' },
  { id: genId('app', 77), name: 'Skills Management', description: 'Employee skills tracking', criticality: 'low', owner: 'HR Department', status: 'production', users: 150, dataClassification: 'internal' },
  
  // Finance-Specific
  { id: genId('app', 78), name: 'Treasury Management', description: 'Cash and liquidity management', criticality: 'critical', owner: 'Finance Department', status: 'production', users: 20, dataClassification: 'secret' },
  { id: genId('app', 79), name: 'Expense Management', description: 'Employee expense tracking', criticality: 'medium', owner: 'Finance Department', status: 'production', users: 800, dataClassification: 'internal' },
  { id: genId('app', 80), name: 'Invoice Processing', description: 'AP/AR automation', criticality: 'high', owner: 'Finance Department', status: 'production', users: 60, dataClassification: 'confidential' },
  { id: genId('app', 81), name: 'Budget Planning', description: 'Financial budgeting tool', criticality: 'high', owner: 'Finance Department', status: 'production', users: 100, dataClassification: 'confidential' },
  { id: genId('app', 82), name: 'Tax Management', description: 'Tax calculation and filing', criticality: 'critical', owner: 'Finance Department', status: 'production', users: 25, dataClassification: 'secret' },
  
  // Travel & Facilities
  { id: genId('app', 83), name: 'Travel Booking', description: 'Corporate travel management', criticality: 'medium', owner: 'HR Department', status: 'production', users: 500, dataClassification: 'internal' },
  { id: genId('app', 84), name: 'Meeting Room Booking', description: 'Room reservation system', criticality: 'low', owner: 'Facilities', status: 'production', users: 800, dataClassification: 'internal' },
  { id: genId('app', 85), name: 'Parking Management', description: 'Parking space allocation', criticality: 'low', owner: 'Facilities', status: 'production', users: 400, dataClassification: 'internal' },
  
  // Partner & Vendor
  { id: genId('app', 86), name: 'Partner Portal', description: 'Business partner collaboration', criticality: 'high', owner: 'Sales Department', status: 'production', users: 500, dataClassification: 'confidential' },
  { id: genId('app', 87), name: 'Vendor Management', description: 'Supplier performance tracking', criticality: 'medium', owner: 'Procurement', status: 'production', users: 50, dataClassification: 'internal' },
  { id: genId('app', 88), name: 'Reseller Portal', description: 'Channel partner platform', criticality: 'high', owner: 'Sales Department', status: 'production', users: 200, dataClassification: 'confidential' },
  
  // Reporting & Documentation
  { id: genId('app', 89), name: 'Report Generator', description: 'Custom report builder', criticality: 'medium', owner: 'IT Department', status: 'production', users: 200, dataClassification: 'internal' },
  { id: genId('app', 90), name: 'Documentation Portal', description: 'Technical documentation', criticality: 'medium', owner: 'IT Department', status: 'production', users: 150, dataClassification: 'internal' },
  
  // Archival & Retention
  { id: genId('app', 91), name: 'Archive System', description: 'Long-term data archival', criticality: 'high', owner: 'IT Department', status: 'production', users: 20, dataClassification: 'confidential' },
  { id: genId('app', 92), name: 'Records Management', description: 'Document retention compliance', criticality: 'high', owner: 'Compliance Team', status: 'production', users: 40, dataClassification: 'confidential' },
  
  // Authentication Services
  { id: genId('app', 93), name: 'MFA Service', description: 'Multi-factor authentication', criticality: 'critical', owner: 'Security Team', status: 'production', users: 800, dataClassification: 'secret' },
  { id: genId('app', 94), name: 'PKI Infrastructure', description: 'Certificate management', criticality: 'critical', owner: 'Security Team', status: 'production', users: 15, dataClassification: 'secret' },
  
  // Legacy & Phase-Out
  { id: genId('app', 95), name: 'Legacy Mainframe', description: 'Old mainframe system', criticality: 'medium', owner: 'IT Department', status: 'maintenance', users: 50, dataClassification: 'confidential' },
  { id: genId('app', 96), name: 'Legacy CRM', description: 'Old CRM being migrated', criticality: 'low', owner: 'Sales Department', status: 'retirement', users: 20, dataClassification: 'internal' },
  
  // New/Development
  { id: genId('app', 97), name: 'AI Assistant', description: 'Internal AI chatbot', criticality: 'low', owner: 'IT Department', status: 'development', users: 100, dataClassification: 'internal' },
  { id: genId('app', 98), name: 'Predictive Analytics', description: 'ML prediction engine', criticality: 'medium', owner: 'IT Department', status: 'development', users: 50, dataClassification: 'confidential' },
  { id: genId('app', 99), name: 'Blockchain Platform', description: 'Distributed ledger pilot', criticality: 'low', owner: 'IT Department', status: 'planning', users: 10, dataClassification: 'confidential' },
  { id: genId('app', 100), name: 'Quantum Simulator', description: 'Quantum computing sandbox', criticality: 'low', owner: 'R&D', status: 'planning', users: 5, dataClassification: 'internal' }
];

// ============================================================================
// INFRASTRUCTURE NODES (40)
// ============================================================================
export const sampleInfrastructureNodes = [
  // Production Servers
  { id: genId('infra', 1), name: 'Web Server Cluster', description: 'Load-balanced web servers', type: 'Server Cluster', location: 'AWS eu-north-1', status: 'active', lifecyclePhase: 'production', plannedDate: '2021-01-01', productionDate: '2022-03-01', retirementDate: '2028-12-31' },
  { id: genId('infra', 2), name: 'Application Server Pool', description: 'Application tier servers', type: 'Server Cluster', location: 'AWS eu-north-1', status: 'active', lifecyclePhase: 'production', plannedDate: '2021-01-01', productionDate: '2022-03-01', retirementDate: '2029-06-30' },
  { id: genId('infra', 3), name: 'Database Primary', description: 'Primary database server', type: 'Database Server', location: 'AWS eu-north-1', status: 'active', lifecyclePhase: 'production', plannedDate: '2020-06-01', productionDate: '2021-09-01', retirementDate: '2027-12-31' },
  { id: genId('infra', 4), name: 'Database Secondary', description: 'Read replica database', type: 'Database Server', location: 'AWS eu-north-1', status: 'active', lifecyclePhase: 'production', plannedDate: '2020-09-01', productionDate: '2021-12-01', retirementDate: '2028-06-30' },
  { id: genId('infra', 5), name: 'Cache Cluster', description: 'Redis cache servers', type: 'Cache Server', location: 'AWS eu-north-1', status: 'active', lifecyclePhase: 'production', plannedDate: '2022-01-01', productionDate: '2023-03-01', retirementDate: '2029-12-31' },
  { id: genId('infra', 6), name: 'Message Queue Cluster', description: 'RabbitMQ message brokers', type: 'Message Broker', location: 'AWS eu-north-1', status: 'active', lifecyclePhase: 'maintenance', plannedDate: '2019-06-01', productionDate: '2020-12-01', retirementDate: '2026-12-31' },
  { id: genId('infra', 7), name: 'API Gateway Nodes', description: 'API gateway servers', type: 'Gateway', location: 'AWS eu-north-1', status: 'active', lifecyclePhase: 'production', plannedDate: '2022-03-01', productionDate: '2023-06-01', retirementDate: '2030-06-30' },
  { id: genId('infra', 8), name: 'Storage Array 1', description: 'Primary storage SAN', type: 'Storage', location: 'On-premise DC1', status: 'active', lifecyclePhase: 'phaseout', plannedDate: '2018-01-01', productionDate: '2019-06-01', retirementDate: '2026-06-30' },
  { id: genId('infra', 9), name: 'Storage Array 2', description: 'Secondary storage SAN', type: 'Storage', location: 'On-premise DC2', status: 'active', lifecyclePhase: 'production', plannedDate: '2020-03-01', productionDate: '2021-09-01', retirementDate: '2028-12-31' },
  { id: genId('infra', 10), name: 'Backup Storage', description: 'Backup and archive storage', type: 'Storage', location: 'AWS S3', status: 'active', lifecyclePhase: 'production', plannedDate: '2021-06-01', productionDate: '2022-09-01', retirementDate: '2030-12-31' },
  
  // Network Infrastructure
  { id: genId('infra', 11), name: 'Core Router 1', description: 'Primary network router', type: 'Network Device', location: 'On-premise DC1', status: 'active' },
  { id: genId('infra', 12), name: 'Core Router 2', description: 'Secondary network router', type: 'Network Device', location: 'On-premise DC2', status: 'active' },
  { id: genId('infra', 13), name: 'Firewall Cluster', description: 'Network firewall appliances', type: 'Security Appliance', location: 'On-premise DC1', status: 'active' },
  { id: genId('infra', 14), name: 'Load Balancer', description: 'Application load balancer', type: 'Load Balancer', location: 'AWS', status: 'active' },
  { id: genId('infra', 15), name: 'VPN Gateway', description: 'Remote access VPN', type: 'Gateway', location: 'On-premise DC1', status: 'active' },
  
  // DR & Backup Sites
  { id: genId('infra', 16), name: 'DR Site Primary', description: 'Disaster recovery datacenter', type: 'Server Cluster', location: 'Azure westeurope', status: 'standby' },
  { id: genId('infra', 17), name: 'DR Database', description: 'DR database replica', type: 'Database Server', location: 'Azure westeurope', status: 'standby' },
  
  // Development & Test
  { id: genId('infra', 18), name: 'Dev Server Cluster', description: 'Development environment', type: 'Server Cluster', location: 'AWS eu-north-1', status: 'active' },
  { id: genId('infra', 19), name: 'Test Environment', description: 'QA testing servers', type: 'Server Cluster', location: 'AWS eu-north-1', status: 'active' },
  { id: genId('infra', 20), name: 'Staging Environment', description: 'Pre-production staging', type: 'Server Cluster', location: 'AWS eu-north-1', status: 'active' },
  
  // Monitoring & Security
  { id: genId('infra', 21), name: 'Monitoring Server', description: 'Infrastructure monitoring', type: 'Monitoring', location: 'AWS eu-north-1', status: 'active' },
  { id: genId('infra', 22), name: 'Log Aggregation', description: 'Centralized logging', type: 'Logging', location: 'AWS eu-north-1', status: 'active' },
  { id: genId('infra', 23), name: 'SIEM Platform', description: 'Security event monitoring', type: 'Security', location: 'On-premise DC1', status: 'active' },
  { id: genId('infra', 24), name: 'IDS/IPS Sensors', description: 'Intrusion detection', type: 'Security Appliance', location: 'On-premise DC1', status: 'active' },
  
  // Container & Cloud
  { id: genId('infra', 25), name: 'Kubernetes Cluster', description: 'Container orchestration', type: 'Container Platform', location: 'AWS EKS', status: 'active' },
  { id: genId('infra', 26), name: 'Docker Registry', description: 'Container image storage', type: 'Registry', location: 'AWS ECR', status: 'active' },
  { id: genId('infra', 27), name: 'Serverless Functions', description: 'AWS Lambda functions', type: 'Serverless', location: 'AWS', status: 'active' },
  
  // Email & Communication
  { id: genId('infra', 28), name: 'Mail Server Cluster', description: 'Email servers', type: 'Mail Server', location: 'On-premise DC1', status: 'active' },
  { id: genId('infra', 29), name: 'Collaboration Servers', description: 'Teams/Slack infrastructure', type: 'Collaboration', location: 'SaaS', status: 'active' },
  
  // File & Share
  { id: genId('infra', 30), name: 'File Server Cluster', description: 'Network file shares', type: 'File Server', location: 'On-premise DC1', status: 'active' },
  { id: genId('infra', 31), name: 'Content Delivery Network', description: 'CDN for static assets', type: 'CDN', location: 'Cloudflare', status: 'active' },
  
  // Database Specific
  { id: genId('infra', 32), name: 'Analytics Database', description: 'Data warehouse database', type: 'Database Server', location: 'AWS Redshift', status: 'active' },
  { id: genId('infra', 33), name: 'NoSQL Cluster', description: 'MongoDB cluster', type: 'Database Server', location: 'AWS', status: 'active' },
  { id: genId('infra', 34), name: 'In-Memory Database', description: 'Real-time data cache', type: 'Cache Server', location: 'AWS', status: 'active' },
  
  // Edge & Remote
  { id: genId('infra', 35), name: 'Edge Computing Nodes', description: 'Remote edge servers', type: 'Edge Server', location: 'Multiple', status: 'active' },
  { id: genId('infra', 36), name: 'Branch Office Servers', description: 'Regional office infrastructure', type: 'Server', location: 'Multiple', status: 'active' },
  
  // Specialized
  { id: genId('infra', 37), name: 'GPU Compute Cluster', description: 'ML/AI training servers', type: 'Compute', location: 'AWS', status: 'active' },
  { id: genId('infra', 38), name: 'IoT Gateway', description: 'IoT device connectivity', type: 'Gateway', location: 'On-premise', status: 'active' },
  { id: genId('infra', 39), name: 'Blockchain Nodes', description: 'Distributed ledger nodes', type: 'Blockchain', location: 'Multiple', status: 'pilot' },
  { id: genId('infra', 40), name: 'Quantum Computing Service', description: 'Cloud quantum processors', type: 'Quantum', location: 'IBM Cloud', status: 'pilot' }
];

// ============================================================================
// BUSINESS PROCESSES (30)
// ============================================================================
export const sampleBusinessProcesses = [
  { id: genId('proc', 1), name: 'Order Processing', description: 'Customer order management', criticality: 'critical', rto: '4 hours', rpo: '1 hour' },
  { id: genId('proc', 2), name: 'Customer Onboarding', description: 'New customer registration', criticality: 'high', rto: '8 hours', rpo: '2 hours' },
  { id: genId('proc', 3), name: 'Payment Processing', description: 'Financial transaction handling', criticality: 'critical', rto: '1 hour', rpo: '15 minutes' },
  { id: genId('proc', 4), name: 'Inventory Management', description: 'Stock level monitoring', criticality: 'high', rto: '8 hours', rpo: '4 hours' },
  { id: genId('proc', 5), name: 'Shipping & Delivery', description: 'Logistics and fulfillment', criticality: 'high', rto: '12 hours', rpo: '4 hours' },
  { id: genId('proc', 6), name: 'Customer Support', description: 'Help desk and ticketing', criticality: 'high', rto: '4 hours', rpo: '2 hours' },
  { id: genId('proc', 7), name: 'Financial Reporting', description: 'Monthly/quarterly reports', criticality: 'critical', rto: '24 hours', rpo: '8 hours' },
  { id: genId('proc', 8), name: 'Payroll Processing', description: 'Employee salary payment', criticality: 'critical', rto: '4 hours', rpo: '1 hour' },
  { id: genId('proc', 9), name: 'Recruitment', description: 'Hiring and onboarding', criticality: 'medium', rto: '48 hours', rpo: '24 hours' },
  { id: genId('proc', 10), name: 'Employee Evaluation', description: 'Performance reviews', criticality: 'medium', rto: '72 hours', rpo: '24 hours' },
  { id: genId('proc', 11), name: 'Procurement', description: 'Purchase order processing', criticality: 'high', rto: '24 hours', rpo: '8 hours' },
  { id: genId('proc', 12), name: 'Supplier Management', description: 'Vendor relationship management', criticality: 'medium', rto: '48 hours', rpo: '24 hours' },
  { id: genId('proc', 13), name: 'Product Development', description: 'New product lifecycle', criticality: 'high', rto: '48 hours', rpo: '24 hours' },
  { id: genId('proc', 14), name: 'Quality Assurance', description: 'Product testing and validation', criticality: 'high', rto: '24 hours', rpo: '8 hours' },
  { id: genId('proc', 15), name: 'Marketing Campaign', description: 'Campaign planning and execution', criticality: 'medium', rto: '72 hours', rpo: '24 hours' },
  { id: genId('proc', 16), name: 'Sales Pipeline', description: 'Lead to close process', criticality: 'high', rto: '24 hours', rpo: '8 hours' },
  { id: genId('proc', 17), name: 'Incident Management', description: 'IT incident response', criticality: 'critical', rto: '2 hours', rpo: '30 minutes' },
  { id: genId('proc', 18), name: 'Change Management', description: 'IT change control', criticality: 'high', rto: '24 hours', rpo: '8 hours' },
  { id: genId('proc', 19), name: 'Security Monitoring', description: '24/7 security operations', criticality: 'critical', rto: '1 hour', rpo: '15 minutes' },
  { id: genId('proc', 20), name: 'Compliance Auditing', description: 'Regular compliance checks', criticality: 'high', rto: '48 hours', rpo: '24 hours' },
  { id: genId('proc', 21), name: 'Risk Assessment', description: 'Risk identification and mitigation', criticality: 'high', rto: '72 hours', rpo: '24 hours' },
  { id: genId('proc', 22), name: 'Business Continuity', description: 'BCP/DR planning', criticality: 'critical', rto: '8 hours', rpo: '4 hours' },
  { id: genId('proc', 23), name: 'Contract Management', description: 'Legal contract lifecycle', criticality: 'medium', rto: '48 hours', rpo: '24 hours' },
  { id: genId('proc', 24), name: 'Budget Planning', description: 'Annual budget process', criticality: 'high', rto: '72 hours', rpo: '24 hours' },
  { id: genId('proc', 25), name: 'Asset Management', description: 'IT asset tracking', criticality: 'medium', rto: '48 hours', rpo: '24 hours' },
  { id: genId('proc', 26), name: 'Data Backup & Recovery', description: 'Backup operations', criticality: 'critical', rto: '4 hours', rpo: '1 hour' },
  { id: genId('proc', 27), name: 'Network Operations', description: 'Network monitoring and maintenance', criticality: 'critical', rto: '2 hours', rpo: '30 minutes' },
  { id: genId('proc', 28), name: 'Application Deployment', description: 'Software release process', criticality: 'high', rto: '24 hours', rpo: '8 hours' },
  { id: genId('proc', 29), name: 'Data Analysis', description: 'Business intelligence process', criticality: 'medium', rto: '48 hours', rpo: '24 hours' },
  { id: genId('proc', 30), name: 'Customer Feedback', description: 'Customer satisfaction tracking', criticality: 'low', rto: '72 hours', rpo: '48 hours' }
];

// ============================================================================
// BUSINESS CAPABILITIES (20)
// ============================================================================
export const sampleBusinessCapabilities = [
  { id: genId('cap', 1), name: 'Customer Management', description: 'Manage customer relationships', criticality: 'critical', owner: 'Sales Department', status: 'active' },
  { id: genId('cap', 2), name: 'Order Fulfillment', description: 'Process and deliver orders', criticality: 'critical', owner: 'Operations', status: 'active' },
  { id: genId('cap', 3), name: 'Financial Management', description: 'Manage finances and accounting', criticality: 'critical', owner: 'Finance Department', status: 'active' },
  { id: genId('cap', 4), name: 'Human Resources', description: 'Employee management', criticality: 'high', owner: 'HR Department', status: 'active' },
  { id: genId('cap', 5), name: 'Supply Chain', description: 'End-to-end supply chain', criticality: 'critical', owner: 'Operations', status: 'active' },
  { id: genId('cap', 6), name: 'Product Development', description: 'Innovation and R&D', criticality: 'high', owner: 'R&D', status: 'active' },
  { id: genId('cap', 7), name: 'Marketing & Sales', description: 'Go-to-market capability', criticality: 'high',owner: 'Marketing Department', status: 'active' },
  { id: genId('cap', 8), name: 'Customer Service', description: 'Support and service', criticality: 'high', owner: 'Customer Service', status: 'active' },
  { id: genId('cap', 9), name: 'IT Operations', description: 'Maintain IT systems', criticality: 'critical', owner: 'IT Department', status: 'active' },
  { id: genId('cap', 10), name: 'Information Security', description: 'Protect information assets', criticality: 'critical', owner: 'Security Team', status: 'active' },
  { id: genId('cap', 11), name: 'Compliance Management', description: 'Regulatory compliance', criticality: 'critical', owner: 'Compliance Team', status: 'active' },
  { id: genId('cap', 12), name: 'Risk Management', description: 'Enterprise risk management', criticality: 'high', owner: 'Risk Team', status: 'active' },
  { id: genId('cap', 13), name: 'Data Analytics', description: 'Business intelligence', criticality: 'high', owner: 'IT Department', status: 'active' },
  { id: genId('cap', 14), name: 'Quality Management', description: 'Quality assurance', criticality: 'high', owner: 'Quality Assurance', status: 'active' },
  { id: genId('cap', 15), name: 'Procurement', description: 'Purchasing and sourcing', criticality: 'high', owner: 'Procurement', status: 'active' },
  { id: genId('cap', 16), name: 'Manufacturing', description: 'Production capability', criticality: 'critical', owner: 'Manufacturing', status: 'active' },
  { id: genId('cap', 17), name: 'Logistics', description: 'Transportation and warehousing', criticality: 'high', owner: 'Logistics', status: 'active' },
  { id: genId('cap', 18), name: 'Partner Management', description: 'Partner ecosystem', criticality: 'medium', owner: 'Sales Department', status: 'active' },
  { id: genId('cap', 19), name: 'Innovation', description: 'Digital transformation', criticality: 'medium', owner: 'IT Department', status: 'planned' },
  { id: genId('cap', 20), name: 'Sustainability', description: 'ESG initiatives', criticality: 'medium', owner: 'Compliance Team', status: 'planned' }
];

// ============================================================================
// SECURITY CONTROLS (50)
// ============================================================================
export const sampleSecurityControls = [
  { id: genId('sec', 1), name: 'Multi-Factor Authentication', description: 'MFA for all users', type: 'Authentication', status: 'implemented', coverage: 100 },
  { id: genId('sec', 2), name: 'Data Encryption at Rest', description: 'AES-256 encryption', type: 'Cryptography', status: 'implemented', coverage: 95 },
  { id: genId('sec', 3), name: 'Data Encryption in Transit', description: 'TLS 1.3 for all connections', type: 'Cryptography', status: 'implemented', coverage: 100 },
  { id: genId('sec', 4), name: 'Network Firewall', description: 'Perimeter firewall rules', type: 'Network Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 5), name: 'Web Application Firewall', description: 'WAF for web applications', type: 'Application Security', status: 'implemented', coverage: 90 },
  { id: genId('sec', 6), name: 'Intrusion Detection', description: 'IDS/IPS monitoring', type: 'Monitoring', status: 'implemented', coverage: 100 },
  { id: genId('sec', 7), name: 'Vulnerability Scanning', description: 'Automated vulnerability assessment', type: 'Assessment', status: 'implemented', coverage: 100 },
  { id: genId('sec', 8), name: 'Penetration Testing', description: 'Annual pen testing', type: 'Assessment', status: 'implemented', coverage: 80 },
  { id: genId('sec', 9), name: 'Security Awareness Training', description: 'Employee security training', type: 'Training', status: 'implemented', coverage: 95 },
  { id: genId('sec', 10), name: 'Phishing Simulation', description: 'Regular phishing tests', type: 'Training', status: 'implemented', coverage: 100 },
  { id: genId('sec', 11), name: 'Access Control Lists', description: 'Role-based access control', type: 'Access Control', status: 'implemented', coverage: 100 },
  { id: genId('sec', 12), name: 'Privileged Access Management', description: 'PAM for admin accounts', type: 'Access Control', status: 'implemented', coverage: 100 },
  { id: genId('sec', 13), name: 'Password Policy', description: 'Strong password requirements', type: 'Policy', status: 'implemented', coverage: 100 },
  { id: genId('sec', 14), name: 'Session Timeout', description: 'Automatic session expiration', type: 'Access Control', status: 'implemented', coverage: 100 },
  { id: genId('sec', 15), name: 'Antivirus Software', description: 'Endpoint protection', type: 'Endpoint Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 16), name: 'EDR Solution', description: 'Endpoint detection and response', type: 'Endpoint Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 17), name: 'DLP Solution', description: 'Data loss prevention', type: 'Data Protection', status: 'implemented', coverage: 85 },
  { id: genId('sec', 18), name: 'Email Security Gateway', description: 'Email filtering and protection', type: 'Email Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 19), name: 'DNS Filtering', description: 'Block malicious domains', type: 'Network Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 20), name: 'VPN Access', description: 'Secure remote access', type: 'Network Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 21), name: 'Network Segmentation', description: 'VLAN isolation', type: 'Network Security', status: 'implemented', coverage: 90 },
  { id: genId('sec', 22), name: 'Database Encryption', description: 'Encrypted database fields', type: 'Data Protection', status: 'implemented', coverage: 80 },
  { id: genId('sec', 23), name: 'Database Auditing', description: 'DB access logging', type: 'Monitoring', status: 'implemented', coverage: 100 },
  { id: genId('sec', 24), name: 'Application Logging', description: 'Application security logs', type: 'Monitoring', status: 'implemented', coverage: 95 },
  { id: genId('sec', 25), name: 'SIEM Monitoring', description: 'Security event correlation', type: 'Monitoring', status: 'implemented', coverage: 100 },
  { id: genId('sec', 26), name: 'SOC Operations', description: '24/7 security operations', type: 'Operations', status: 'implemented', coverage: 100 },
  { id: genId('sec', 27), name: 'Incident Response Plan', description: 'IR procedures', type: 'Process', status: 'implemented', coverage: 100 },
  { id: genId('sec', 28), name: 'Disaster Recovery Plan', description: 'DR procedures', type: 'Process', status: 'implemented', coverage: 100 },
  { id: genId('sec', 29), name: 'Backup Procedures', description: 'Regular backups', type: 'Process', status: 'implemented', coverage: 100 },
  { id: genId('sec', 30), name: 'Patch Management', description: 'Security patch deployment', type: 'Operations', status: 'implemented', coverage: 95 },
  { id: genId('sec', 31), name: 'Change Control', description: 'Change management process', type: 'Process', status: 'implemented', coverage: 100 },
  { id: genId('sec', 32), name: 'Secure Development', description: 'Secure SDLC practices', type: 'Development', status: 'implemented', coverage: 90 },
  { id: genId('sec', 33), name: 'Code Review', description: 'Security code reviews', type: 'Development', status: 'implemented', coverage: 85 },
  { id: genId('sec', 34), name: 'Container Security', description: 'Container image scanning', type: 'Application Security', status: 'implemented', coverage: 90 },
  { id: genId('sec', 35), name: 'API Security', description: 'API authentication and rate limiting', type: 'Application Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 36), name: 'Certificate Management', description: 'PKI certificate lifecycle', type: 'Cryptography', status: 'implemented', coverage: 100 },
  { id: genId('sec', 37), name: 'Key Management', description: 'Encryption key rotation', type: 'Cryptography', status: 'implemented', coverage: 95 },
  { id: genId('sec', 38), name: 'Cloud Security Posture', description: 'Cloud configuration monitoring', type: 'Cloud Security', status: 'implemented', coverage: 90 },
  { id: genId('sec', 39), name: 'Identity Governance', description: 'User access reviews', type: 'Access Control', status: 'implemented', coverage: 100 },
  { id: genId('sec', 40), name: 'Asset Inventory', description: 'IT asset management', type: 'Operations', status: 'implemented', coverage: 95 },
  { id: genId('sec', 41), name: 'Mobile Device Management', description: 'MDM for mobile devices', type: 'Endpoint Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 42), name: 'USB Control', description: 'Removable media restrictions', type: 'Endpoint Security', status: 'implemented', coverage: 100 },
  { id: genId('sec', 43), name: 'Application Whitelisting', description: 'Approved software list', type: 'Endpoint Security', status: 'implemented', coverage: 85 },
  { id: genId('sec', 44), name: 'Security Metrics', description: 'KPI and reporting', type: 'Governance', status: 'implemented', coverage: 90 },
  { id: genId('sec', 45), name: 'Third-Party Risk Assessment', description: 'Vendor security reviews', type: 'Risk Management', status: 'implemented', coverage: 80 },
  { id: genId('sec', 46), name: 'Data Classification', description: 'Information classification scheme', type: 'Data Protection', status: 'implemented', coverage: 90 },
  { id: genId('sec', 47), name: 'Privacy Controls', description: 'GDPR compliance controls', type: 'Compliance', status: 'implemented', coverage: 100 },
  { id: genId('sec', 48), name: 'Audit Logging', description: 'Comprehensive audit trails', type: 'Monitoring', status: 'implemented', coverage: 100 },
  { id: genId('sec', 49), name: 'Threat Intelligence', description: 'Threat intel feeds', type: 'Monitoring', status: 'implemented', coverage: 85 },
  { id: genId('sec', 50), name: 'Zero Trust Architecture', description: 'Zero trust network design', type: 'Architecture', status: 'planned', coverage: 30 }
];

// ============================================================================
// DATA STORES (35)
// ============================================================================
export const sampleDataStores = [
  { id: genId('ds', 1), name: 'Customer Database', description: 'Customer master data', type: 'Relational DB', classification: 'confidential', size: '500 GB' },
  { id: genId('ds', 2), name: 'Product Database', description: 'Product catalog data', type: 'Relational DB', classification: 'internal', size: '100 GB' },
  { id: genId('ds', 3), name: 'Order Database', description: 'Order history', type: 'Relational DB', classification: 'confidential', size: '2 TB' },
  { id: genId('ds', 4), name: 'Financial Database', description: 'Financial transactions', type: 'Relational DB', classification: 'secret', size: '800 GB' },
  { id: genId('ds', 5), name: 'HR Database', description: 'Employee data', type: 'Relational DB', classification: 'confidential', size: '50 GB' },
  { id: genId('ds', 6), name: 'Analytics Data Warehouse', description: 'Business intelligence data', type: 'Data Warehouse', classification: 'internal', size: '5 TB' },
  { id: genId('ds', 7), name: 'Document Repository', description: 'Corporate documents', type: 'Document Store', classification: 'internal', size: '1 TB' },
  { id: genId('ds', 8), name: 'Email Archive', description: 'Email retention', type: 'Archive', classification: 'confidential', size: '3 TB' },
  { id: genId('ds', 9), name: 'Log Storage', description: 'Application and system logs', type: 'Time-Series DB', classification: 'internal', size: '10 TB' },
  { id: genId('ds', 10), name: 'Security Event Store', description: 'SIEM data', type: 'Time-Series DB', classification: 'confidential', size: '8 TB' },
  { id: genId('ds', 11), name: 'Backup Storage', description: 'System backups', type: 'Object Storage', classification: 'confidential', size: '50 TB' },
  { id: genId('ds', 12), name: 'Media Library', description: 'Images and videos', type: 'Object Storage', classification: 'internal', size: '5 TB' },
  { id: genId('ds', 13), name: 'Cache Layer', description: 'Application cache', type: 'In-Memory DB', classification: 'internal', size: '100 GB' },
  { id: genId('ds', 14), name: 'Session Store', description: 'User sessions', type: 'In-Memory DB', classification: 'confidential', size: '20 GB' },
  { id: genId('ds', 15), name: 'Search Index', description: 'Full-text search', type: 'Search Engine', classification: 'internal', size: '200 GB' },
  { id: genId('ds', 16), name: 'Inventory Database', description: 'Stock levels', type: 'Relational DB', classification: 'internal', size: '150 GB' },
  { id: genId('ds', 17), name: 'CRM Database', description: 'Sales and leads', type: 'Relational DB', classification: 'confidential', size: '300 GB' },
  { id: genId('ds', 18), name: 'Support Ticket DB', description: 'Customer tickets', type: 'Relational DB', classification: 'confidential', size: '200 GB' },
  { id: genId('ds', 19), name: 'Audit Log Store', description: 'Compliance audit logs', type: 'Append-Only DB', classification: 'confidential', size: '1 TB' },
  { id: genId('ds', 20), name: 'Configuration DB', description: 'System configuration', type: 'Key-Value Store', classification: 'internal', size: '10 GB' },
  { id: genId('ds', 21), name: 'Mobile App Database', description: 'Mobile app backend', type: 'NoSQL DB', classification: 'confidential', size: '400 GB' },
  { id: genId('ds', 22), name: 'IoT Data Lake', description: 'Sensor data', type: 'Data Lake', classification: 'internal', size: '15 TB' },
  { id: genId('ds', 23), name: 'ML Training Data', description: 'Machine learning datasets', type: 'Data Lake', classification: 'internal', size: '3 TB' },
  { id: genId('ds', 24), name: 'Contract Database', description: 'Legal contracts', type: 'Document Store', classification: 'confidential', size: '100 GB' },
  { id: genId('ds', 25), name: 'Compliance Database', description: 'Regulatory data', type: 'Relational DB', classification: 'confidential', size: '50 GB' },
  { id: genId('ds', 26), name: 'Supply Chain DB', description: 'Supplier and logistics data', type: 'Relational DB', classification: 'confidential', size: '250 GB' },
  { id: genId('ds', 27), name: 'Quality Database', description: 'QA test results', type: 'Relational DB', classification: 'internal', size: '80 GB' },
  { id: genId('ds', 28), name: 'Asset Database', description: 'IT asset inventory', type: 'CMDB', classification: 'internal', size: '30 GB' },
  { id: genId('ds', 29), name: 'Knowledge Base DB', description: 'Help articles', type: 'Document Store', classification: 'public', size: '20 GB' },
  { id: genId('ds', 30), name: 'API Logs', description: 'API usage telemetry', type: 'Time-Series DB', classification: 'internal', size: '2 TB' },
  { id: genId('ds', 31), name: 'Metrics Database', description: 'System metrics', type: 'Time-Series DB', classification: 'internal', size: '1 TB' },
  { id: genId('ds', 32), name: 'User Preferences', description: 'Application settings', type: 'Key-Value Store', classification: 'internal', size: '5 GB' },
  { id: genId('ds', 33), name: 'Blockchain Ledger', description: 'Distributed ledger', type: 'Blockchain', classification: 'confidential', size: '100 GB' },
  { id: genId('ds', 34), name: 'Archive Storage', description: 'Long-term archival', type: 'Cold Storage', classification: 'confidential', size: '100 TB' },
  { id: genId('ds', 35), name: 'Test Data Store', description: 'QA test data', type: 'Relational DB', classification: 'internal', size: '500 GB' }
];

// ============================================================================
// DATA OBJECTS (40)
// ============================================================================
export const sampleDataObjects = [
  { id: genId('data', 1), name: 'Customer Personal Data', description: 'PII including names, addresses', classification: 'confidential', gdpr: true },
  { id: genId('data', 2), name: 'Payment Card Data', description: 'Credit card information', classification: 'secret', pci_dss: true },
  { id: genId('data', 3), name: 'Bank Account Numbers', description: 'Financial account data', classification: 'secret', gdpr: true },
  { id: genId('data', 4), name: 'Employee Personal Data', description: 'HR personnel records', classification: 'confidential', gdpr: true },
  { id: genId('data', 5), name: 'Salary Information', description: 'Compensation data', classification: 'secret', gdpr: true },
  { id: genId('data', 6), name: 'Health Records', description: 'Medical information', classification: 'secret', gdpr: true },  
  { id: genId('data', 7), name: 'Social Security Numbers', description: 'National IDs', classification: 'secret', gdpr: true },
  { id: genId('data', 8), name: 'Biometric Data', description: 'Fingerprints, facial recognition', classification: 'secret', gdpr: true },
  { id: genId('data', 9), name: 'Email Addresses', description: 'Contact emails', classification: 'confidential', gdpr: true },
  { id: genId('data', 10), name: 'Phone Numbers', description: 'Contact phone numbers', classification: 'confidential', gdpr: true },
  { id: genId('data', 11), name: 'Postal Addresses', description: 'Physical addresses', classification: 'confidential', gdpr: true },
  { id: genId('data', 12), name: 'Login Credentials', description: 'Usernames and passwords', classification: 'secret', gdpr: false },
  { id: genId('data', 13), name: 'API Keys', description: 'System API credentials', classification: 'secret', gdpr: false },
  { id: genId('data', 14), name: 'Encryption Keys', description: 'Cryptographic keys', classification: 'secret', gdpr: false },
  { id: genId('data', 15), name: 'Trade Secrets', description: 'Proprietary business information', classification: 'secret', gdpr: false },
  { id: genId('data', 16), name: 'Financial Statements', description: 'Company financial reports', classification: 'confidential', gdpr: false },
  { id: genId('data', 17), name: 'Contract Terms', description: 'Legal agreement details', classification: 'confidential', gdpr: false },
  { id: genId('data', 18), name: 'Customer Orders', description: 'Purchase order data', classification: 'confidential', gdpr: true },
  { id: genId('data', 19), name: 'Invoices', description: 'Billing documents', classification: 'confidential', gdpr: true },
  { id: genId('data', 20), name: 'Shipping Information', description: 'Delivery addresses and tracking', classification: 'confidential', gdpr: true },
  { id: genId('data', 21), name: 'Product Designs', description: 'Technical specifications', classification: 'confidential', gdpr: false },
  { id: genId('data', 22), name: 'Source Code', description: 'Application source code', classification: 'confidential', gdpr: false },
  { id: genId('data', 23), name: 'Security Logs', description: 'System audit trails', classification: 'confidential', gdpr: false },
  { id: genId('data', 24), name: 'Incident Reports', description: 'Security incident data', classification: 'confidential', gdpr: false },
  { id: genId('data', 25), name: 'Compliance Records', description: 'Audit and compliance data', classification: 'confidential', gdpr: false },
  { id: genId('data', 26), name: 'Marketing Lists', description: 'Customer segmentation', classification: 'internal', gdpr: true },
  { id: genId('data', 27), name: 'Sales Forecasts', description: 'Revenue projections', classification: 'confidential', gdpr: false },
  { id: genId('data', 28), name: 'Budget Data', description: 'Financial planning', classification: 'confidential', gdpr: false },
  { id: genId('data', 29), name: 'Performance Reviews', description: 'Employee evaluations', classification: 'confidential', gdpr: true },
  { id: genId('data', 30), name: 'Customer Support Tickets', description: 'Help desk records', classification: 'confidential', gdpr: true },
  { id: genId('data', 31), name: 'Sensor Data', description: 'IoT telemetry', classification: 'internal', gdpr: false },
  { id: genId('data', 32), name: 'Usage Analytics', description: 'Application usage metrics', classification: 'internal', gdpr: true },
  { id: genId('data', 33), name: 'System Metrics', description: 'Infrastructure performance', classification: 'internal', gdpr: false },
  { id: genId('data', 34), name: 'Network Traffic', description: 'Network flow data', classification: 'internal', gdpr: false },
  { id: genId('data', 35), name: 'Vulnerability Scan Results', description: 'Security assessment data', classification: 'confidential', gdpr: false },
  { id: genId('data', 36), name: 'Training Records', description: 'Employee training completion', classification: 'internal', gdpr: true },
  { id: genId('data', 37), name: 'Supplier Contracts', description: 'Vendor agreements', classification: 'confidential', gdpr: false },
  { id: genId('data', 38), name: 'Inventory Levels', description: 'Stock quantities', classification: 'internal', gdpr: false },
  { id: genId('data', 39), name: 'Quality Test Results', description: 'QA outcomes', classification: 'internal', gdpr: false },
  { id: genId('data', 40), name: 'Customer Feedback', description: 'Survey responses', classification: 'internal', gdpr: true }
];

// ============================================================================
// THREAT SCENARIOS (15)
// ============================================================================
export const sampleThreatScenarios = [
  { id: genId('threat', 1), name: 'Ransomware Attack', description: 'Malware encrypting data', severity: 'critical', likelihood: 'high' },
  { id: genId('threat', 2), name: 'DDoS Attack', description: 'Distributed denial of service', severity: 'high', likelihood: 'medium' },
  { id: genId('threat', 3), name: 'SQL Injection', description: 'Database injection attack', severity: 'critical', likelihood: 'medium' },
  { id: genId('threat', 4), name: 'Phishing Campaign', description: 'Social engineering emails', severity: 'high', likelihood: 'high' },
  { id: genId('threat', 5), name: 'Insider Threat', description: 'Malicious employee activity', severity: 'high', likelihood: 'low' },
  { id: genId('threat', 6), name: 'Data Breach', description: 'Unauthorized data access', severity: 'critical', likelihood: 'medium' },
  { id: genId('threat', 7), name: 'Supply Chain Attack', description: 'Compromised vendor software', severity: 'critical', likelihood: 'low' },
  { id: genId('threat', 8), name: 'Zero-Day Exploit', description: 'Unknown vulnerability exploitation', severity: 'critical', likelihood: 'low' },
  { id: genId('threat', 9), name: 'Password Spraying', description: 'Credential stuffing attack', severity: 'medium', likelihood: 'high' },
  { id: genId('threat', 10), name: 'Man-in-the-Middle', description: 'Network interception', severity: 'high', likelihood: 'low' },
  { id: genId('threat', 11), name: 'API Abuse', description: 'API rate limiting bypass', severity: 'medium', likelihood: 'medium' },
  { id: genId('threat', 12), name: 'Cloud Misconfiguration', description: 'Exposed cloud resources', severity: 'high', likelihood: 'medium' },
  { id: genId('threat', 13), name: 'IoT Device Compromise', description: 'Unsecured IoT devices', severity: 'medium', likelihood: 'medium' },
  { id: genId('threat', 14), name: 'Business Email Compromise', description: 'CEO fraud attack', severity: 'high', likelihood: 'medium' },
  { id: genId('threat', 15), name: 'Cryptojacking', description: 'Unauthorized crypto mining', severity: 'low', likelihood: 'medium' }
];

// ============================================================================
// VULNERABILITIES (20)
// ============================================================================
export const sampleVulnerabilities = [
  { id: genId('vuln', 1), name: 'Outdated Software', description: 'Unpatched applications', severity: 'high', cvss: 7.5 },
  { id: genId('vuln', 2), name: 'Weak Passwords', description: 'Default or simple passwords', severity: 'medium', cvss: 5.5 },
  { id: genId('vuln', 3), name: 'Missing Encryption', description: 'Unencrypted data transmission', severity: 'high', cvss: 7.0 },
  { id: genId('vuln', 4), name: 'Open Ports', description: 'Unnecessary ports exposed', severity: 'medium', cvss: 5.0 },
  { id: genId('vuln', 5), name: 'SQL Injection Flaw', description: 'Input validation missing', severity: 'critical', cvss: 9.1 },
  { id: genId('vuln', 6), name: 'XSS Vulnerability', description: 'Cross-site scripting possible', severity: 'high', cvss: 7.3 },
  { id: genId('vuln', 7), name: 'CSRF Weakness', description: 'No CSRF protection', severity: 'medium', cvss: 6.0 },
  { id: genId('vuln', 8), name: 'Insecure API', description: 'API lacks authentication', severity: 'high', cvss: 8.0 },
  { id: genId('vuln', 9), name: 'Misconfigured Firewall', description: 'Overly permissive rules', severity: 'high', cvss: 7.8 },
  { id: genId('vuln', 10), name: 'Insufficient Logging', description: 'No audit trail', severity: 'medium', cvss: 4.5 },
  { id: genId('vuln', 11), name: 'Hardcoded Credentials', description: 'Credentials in source code', severity: 'critical', cvss: 9.5 },
  { id: genId('vuln', 12), name: 'Directory Traversal', description: 'Path traversal vulnerability', severity: 'high', cvss: 7.0 },
  { id: genId('vuln', 13), name: 'Broken Authentication', description: 'Session management flaw', severity: 'critical', cvss: 8.8 },
  { id: genId('vuln', 14), name: 'Sensitive Data Exposure', description: 'Data leakage', severity: 'high', cvss: 7.4 },
  { id: genId('vuln', 15), name: 'XML External Entity', description: 'XXE injection possible', severity: 'medium', cvss: 6.5 },
  { id: genId('vuln', 16), name: 'Unvalidated Redirects', description: 'Open redirect vulnerability', severity: 'low', cvss: 3.5 },
  { id: genId('vuln', 17), name: 'Insecure Deserialization', description: 'Object injection risk', severity: 'critical', cvss: 8.5 },
  { id: genId('vuln', 18), name: 'Missing Rate Limiting', description: 'No API throttling', severity: 'medium', cvss: 5.8 },
  { id: genId('vuln', 19), name: 'Weak Cipher Suites', description: 'Deprecated TLS versions', severity: 'medium', cvss: 5.5 },
  { id: genId('vuln', 20), name: 'Lack of Security Headers', description: 'Missing HTTP security headers', severity: 'low', cvss: 4.0 }
];

// ============================================================================
// ORGANIZATIONAL UNITS (10)
// ============================================================================
export const sampleOrganizationalUnits = [
  { id: genId('org', 1), name: 'IT Department', description: 'Information Technology', head: genId('person', 1), responsibilities: ['Systems', 'Infrastructure', 'Security'] },
  { id: genId('org', 2), name: 'Security Team', description: 'Cybersecurity Operations', head: genId('person', 2), responsibilities: ['Security Monitoring', 'Incident Response'] },
  { id: genId('org', 3), name: 'Finance Department', description: 'Financial Management', head: genId('person', 3), responsibilities: ['Accounting', 'Treasury', 'Budgeting'] },
  { id: genId('org', 4), name: 'HR Department', description: 'Human Resources', head: genId('person', 4), responsibilities: ['Recruitment', 'Training', 'Payroll'] },
  { id: genId('org', 5), name: 'Sales Department', description: 'Sales and Business Development', head: genId('person', 5), responsibilities: ['Sales', 'Customer Relations'] },
  { id: genId('org', 6), name: 'Operations', description: 'Business Operations', head: genId('person', 6), responsibilities: ['Supply Chain', 'Logistics'] },
  { id: genId('org', 7), name: 'Compliance Team', description: 'Regulatory Compliance', head: genId('person', 7), responsibilities: ['Compliance', 'Audit', 'Risk'] },
  { id: genId('org', 8), name: 'Development Team', description: 'Software Development', head: genId('person', 8), responsibilities: ['Development', 'DevOps'] },
  { id: genId('org', 9), name: 'Customer Service', description: 'Customer Support', head: genId('person', 9), responsibilities: ['Support', 'Service Desk'] },
  { id: genId('org', 10), name: 'Marketing Department', description: 'Marketing and Communications', head: genId('person', 10), responsibilities: ['Marketing', 'Communications'] }
];

// ============================================================================
// PERSONS (15)
// ============================================================================
export const samplePersons = [
  { id: genId('person', 1), name: 'John Smith', email: 'john.smith@company.com', roles: ['CIO'], organizational_unit: genId('org', 1) },
  { id: genId('person', 2), name: 'Sarah Johnson', email: 'sarah.johnson@company.com', roles: ['CISO'], organizational_unit: genId('org', 2) },
  { id: genId('person', 3), name: 'Michael Brown', email: 'michael.brown@company.com', roles: ['CFO'], organizational_unit: genId('org', 3) },
  { id: genId('person', 4), name: 'Emily Davis', email: 'emily.davis@company.com', roles: ['HR Director'], organizational_unit: genId('org', 4) },
  { id: genId('person', 5), name: 'David Wilson', email: 'david.wilson@company.com', roles: ['Sales Director'], organizational_unit: genId('org', 5) },
  { id: genId('person', 6), name: 'Lisa Anderson', email: 'lisa.anderson@company.com', roles: ['COO'], organizational_unit: genId('org', 6) },
  { id: genId('person', 7), name: 'Robert Taylor', email: 'robert.taylor@company.com', roles: ['Compliance Officer'], organizational_unit: genId('org', 7) },
  { id: genId('person', 8), name: 'Jennifer Martinez', email: 'jennifer.martinez@company.com', roles: ['Dev Manager'], organizational_unit: genId('org', 8) },
  { id: genId('person', 9), name: 'William Garcia', email: 'william.garcia@company.com', roles: ['Service Manager'], organizational_unit: genId('org', 9) },
  { id: genId('person', 10), name: 'Jessica Rodriguez', email: 'jessica.rodriguez@company.com', roles: ['Marketing Director'], organizational_unit: genId('org', 10) },
  { id: genId('person', 11), name: 'James Lee', email: 'james.lee@company.com', roles: ['IT Operations Manager'], organizational_unit: genId('org', 1) },
  { id: genId('person', 12), name: 'Mary White', email: 'mary.white@company.com', roles: ['Security Analyst'], organizational_unit: genId('org', 2) },
  { id: genId('person', 13), name: 'Christopher Harris', email: 'chris.harris@company.com', roles: ['Network Engineer'], organizational_unit: genId('org', 1) },
  { id: genId('person', 14), name: 'Patricia Clark', email: 'patricia.clark@company.com', roles: ['Database Administrator'], organizational_unit: genId('org', 1) },
  { id: genId('person', 15), name: 'Daniel Lewis', email: 'daniel.lewis@company.com', roles: ['System Architect'], organizational_unit: genId('org', 8) }
];

// ============================================================================
// POLICIES (12)
// ============================================================================
export const samplePolicies = [
  { id: genId('policy', 1), name: 'Information Security Policy', description: 'Enterprise security standards', status: 'approved', last_review: '2026-01-01' },
  { id: genId('policy', 2), name: 'Acceptable Use Policy', description: 'IT resource usage guidelines', status: 'approved', last_review: '2025-12-01' },
  { id: genId('policy', 3), name: 'Data Protection Policy', description: 'GDPR compliance policy', status: 'approved', last_review: '2026-01-15' },
  { id: genId('policy', 4), name: 'Access Control Policy', description: 'User access management', status: 'approved', last_review: '2025-11-01' },
  { id: genId('policy', 5), name: 'Incident Response Policy', description: 'Security incident procedures', status: 'approved', last_review: '2026-02-01' },
  { id: genId('policy', 6), name: 'Business Continuity Policy', description: 'BCP/DR guidelines', status: 'approved', last_review: '2025-10-01' },
  { id: genId('policy', 7), name: 'Change Management Policy', description: 'Change control process', status: 'approved', last_review: '2025-12-15' },
  { id: genId('policy', 8), name: 'Password Policy', description: 'Password requirements', status: 'approved', last_review: '2026-01-10' },
  { id: genId('policy', 9), name: 'Remote Work Policy', description: 'Telework security', status: 'approved', last_review: '2025-09-01' },
  { id: genId('policy', 10), name: 'Third-Party Risk Policy', description: 'Vendor security requirements', status: 'approved', last_review: '2025-11-15' },
  { id: genId('policy', 11), name: 'Encryption Policy', description: 'Data encryption standards', status: 'approved', last_review: '2026-01-20' },
  { id: genId('policy', 12), name: 'Asset Management Policy', description: 'IT asset lifecycle', status: 'approved', last_review: '2025-12-20' }
];

// ============================================================================
// COMPLIANCE REQUIREMENTS (8)
// ============================================================================
export const sampleComplianceRequirements = [
  { id: genId('comp', 1), name: 'NIS 2 Directive', description: 'EU Network and Information Security', category: 'Cybersecurity', mandatory: true },
  { id: genId('comp', 2), name: 'GDPR', description: 'General Data Protection Regulation', category: 'Privacy', mandatory: true },
  { id: genId('comp', 3), name: 'ISO 27001', description: 'Information security management', category: 'Standards', mandatory: false },
  { id: genId('comp', 4), name: 'PCI DSS', description: 'Payment Card Industry standards', category: 'Financial', mandatory: true },
  { id: genId('comp', 5), name: 'SOC 2', description: 'Service Organization Control', category: 'Audit', mandatory: false },
  { id: genId('comp', 6), name: 'HIPAA', description: 'Health Insurance Portability', category: 'Healthcare', mandatory: false },
  { id: genId('comp', 7), name: 'SOX', description: 'Sarbanes-Oxley Act', category: 'Financial', mandatory: true },
  { id: genId('comp', 8), name: 'NIST CSF', description: 'Cybersecurity Framework', category: 'Standards', mandatory: false }
];

// ============================================================================
// SUPPLIERS (12)
// ============================================================================
export const sampleSuppliers = [
  { id: genId('supplier', 1), name: 'CloudProvider Inc', description: 'Cloud infrastructure provider', category: 'Cloud Services', criticality: 'critical', risk_level: 'low' },
  { id: genId('supplier', 2), name: 'SecureAuth Solutions', description: 'Identity management vendor', category: 'Security', criticality: 'critical', risk_level: 'low' },
  { id: genId('supplier', 3), name: 'DataBackup Corp', description: 'Backup and recovery services', category: 'Data Protection', criticality: 'critical', risk_level: 'low' },
  { id: genId('supplier', 4), name: 'NetworkGear Ltd', description: 'Network equipment supplier', category: 'Hardware', criticality: 'high', risk_level: 'medium' },
  { id: genId('supplier', 5), name: 'SoftwareDev Co', description: 'Custom software development', category: 'Development', criticality: 'medium', risk_level: 'medium' },
  { id: genId('supplier', 6), name: 'TelecomProvider', description: 'Internet and telecom services', category: 'Connectivity', criticality: 'critical', risk_level: 'low' },
  { id: genId('supplier', 7), name: 'SaaS Collaboration', description: 'Collaboration platform', category: 'SaaS', criticality: 'high', risk_level: 'low' },
  { id: genId('supplier', 8), name: 'LogisticsPartner', description: 'Shipping and delivery', category: 'Logistics', criticality: 'high', risk_level: 'medium' },
  { id: genId('supplier', 9), name: 'PaymentGateway Inc', description: 'Payment processing', category: 'Financial', criticality: 'critical', risk_level: 'low' },
  { id: genId('supplier', 10), name: 'CyberInsurance Ltd', description: 'Cyber risk insurance', category: 'Insurance', criticality: 'medium', risk_level: 'low' },
  { id: genId('supplier', 11), name: 'ConsultingFirm', description: 'IT consulting services', category: 'Professional Services', criticality: 'low', risk_level: 'low' },
  { id: genId('supplier', 12), name: 'SecurityAudit Co', description: 'Security audit and pen testing', category: 'Security', criticality: 'medium', risk_level: 'low' }
];

// ============================================================================
// RELATIONSHIPS (400+)
// ============================================================================
let relId = 1;
export const sampleRelationships = [
  // Application to Infrastructure (hosted_on)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('infra', 1), type: 'hosted_on', description: 'ERP hosted on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('infra', 2), type: 'hosted_on', description: 'CRM hosted on app servers' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('infra', 1), type: 'hosted_on', description: 'Customer Portal on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('infra', 2), type: 'hosted_on', description: 'HR System on app servers' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('infra', 2), type: 'hosted_on', description: 'Financial mgmt on app servers' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('infra', 1), type: 'hosted_on', description: 'E-Commerce on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 7), target: genId('infra', 2), type: 'hosted_on', description: 'Payment gateway on app servers' },
  { id: genId('rel', relId++), source: genId('app', 11), target: genId('infra',

 28), type: 'hosted_on', description: 'Email on mail servers' },
  { id: genId('rel', relId++), source: genId('app', 16), target: genId('infra', 32), type: 'hosted_on', description: 'Data warehouse on analytics DB' },
  { id: genId('rel', relId++), source: genId('app', 21), target: genId('infra', 2), type: 'hosted_on', description: 'IAM on app servers' },
  { id: genId('rel', relId++), source: genId('app', 23), target: genId('infra', 23), type: 'hosted_on', description: 'SIEM on security platform' },
  { id: genId('rel', relId++), source: genId('app', 26), target: genId('infra', 21), type: 'hosted_on', description: 'Monitoring on monitoring server' },
  { id: genId('rel', relId++), source: genId('app', 27), target: genId('infra', 10), type: 'hosted_on', description: 'Backup on backup storage' },
  { id: genId('rel', relId++), source: genId('app', 31), target: genId('infra', 18), type: 'hosted_on', description: 'Git on dev servers' },
  { id: genId('rel', relId++), source: genId('app', 32), target: genId('infra', 25), type: 'hosted_on', description: 'CI/CD on Kubernetes' },
  { id: genId('rel', relId++), source: genId('app', 34), target: genId('infra', 7), type: 'hosted_on', description: 'API Gateway on gateway nodes' },
  { id: genId('rel', relId++), source: genId('app', 36), target: genId('infra', 1), type: 'hosted_on', description: 'Mobile banking on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 41), target: genId('infra', 2), type: 'hosted_on', description: 'Supply chain on app servers' },
  { id: genId('rel', relId++), source: genId('app', 51), target: genId('infra', 2), type: 'hosted_on', description: 'Call center on app servers' },
  { id: genId('rel', relId++), source: genId('app', 56), target: genId('infra', 2), type: 'hosted_on', description: 'Compliance on app servers' },
  
  // Application dependencies (depends_on)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('app', 34), type: 'depends_on', description: 'ERP depends on API Gateway' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('app', 34), type: 'depends_on', description: 'CRM depends on API Gateway' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('app', 7), type: 'depends_on', description: 'Portal depends on payment' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('app', 21), type: 'depends_on', description: 'Portal depends on IAM' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('app', 7), type: 'depends_on', description: 'E-commerce depends on payment' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('app', 9), type: 'depends_on', description: 'E-commerce depends on orders' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('app', 10), type: 'depends_on', description: 'Orders depend on inventory' },
  { id: genId('rel', relId++), source: genId('app', 11), target: genId('app', 21), type: 'depends_on', description: 'Email depends on IAM' },
  { id: genId('rel', relId++), source: genId('app', 12), target: genId('app', 21), type: 'depends_on', description: 'Documents depend on IAM' },
  { id: genId('rel', relId++), source: genId('app', 17), target: genId('app', 16), type: 'depends_on', description: 'BI depends on data warehouse' },
  { id: genId('rel', relId++), source: genId('app', 36), target: genId('app', 21), type: 'depends_on', description: 'Mobile banking depends on IAM' },
  { id: genId('rel', relId++), source: genId('app', 36), target: genId('app', 7), type: 'depends_on', description: 'Mobile banking depends on payment' },
  { id: genId('rel', relId++), source: genId('app', 41), target: genId('app', 10), type: 'depends_on', description: 'SCM depends on inventory' },
  { id: genId('rel', relId++), source: genId('app', 46), target: genId('app', 2), type: 'depends_on', description: 'Marketing depends on CRM' },
  { id: genId('rel', relId++), source: genId('app', 52), target: genId('app', 30), type: 'depends_on', description: 'Live chat depends on service desk' },
  
  // Application to Database (depends_on)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('infra', 3), type: 'depends_on', description: 'ERP depends on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('infra', 3), type: 'depends_on', description: 'CRM depends on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('infra', 3), type: 'depends_on', description: 'Portal depends on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('infra', 3), type: 'depends_on', description: 'HR depends on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('infra', 3), type: 'depends_on', description: 'Finance depends on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('infra', 3), type: 'depends_on', description: 'E-commerce depends on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 16), target: genId('infra', 32), type: 'depends_on', description: 'Data warehouse depends on analytics DB' },
  { id: genId('rel', relId++), source: genId('app', 17), target: genId('infra', 4), type: 'depends_on', description: 'BI depends on read replica' },
  
  // Application supports Business Process (supports)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('proc', 1), type: 'supports', description: 'ERP supports order processing' },
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('proc', 7), type: 'supports', description: 'ERP supports financial reporting' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('proc', 2), type: 'supports', description: 'CRM supports customer onboarding' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('proc', 16), type: 'supports', description: 'CRM supports sales pipeline' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('proc', 1), type: 'supports', description: 'Portal supports order processing' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('proc', 6), type: 'supports', description: 'Portal supports customer support' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('proc', 9), type: 'supports', description: 'HR system supports recruitment' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('proc', 8), type: 'supports', description: 'HR system supports payroll' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('proc', 7), type: 'supports', description: 'Finance supports reporting' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('proc', 24), type: 'supports', description: 'Finance supports budget planning' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('proc', 1), type: 'supports', description: 'E-commerce supports orders' },
  { id: genId('rel', relId++), source: genId('app', 7), target: genId('proc', 3), type: 'supports', description: 'Payment gateway supports payment processing' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('proc', 1), type: 'supports', description: 'Order mgmt supports order processing' },
  { id: genId('rel', relId++), source: genId('app', 10), target: genId('proc', 4), type: 'supports', description: 'Inventory supports inventory mgmt' },
  { id: genId('rel', relId++), source: genId('app', 21), target: genId('proc', 19), type: 'supports', description: 'IAM supports security monitoring' },
  { id: genId('rel', relId++), source: genId('app', 23), target: genId('proc', 17), type: 'supports', description: 'SIEM supports incident management' },
  { id: genId('rel', relId++), source: genId('app', 26), target: genId('proc', 27), type: 'supports', description: 'Monitoring supports network operations' },
  { id: genId('rel', relId++), source: genId('app', 27), target: genId('proc', 26), type: 'supports', description: 'Backup supports data backup' },
  { id: genId('rel', relId++), source: genId('app', 30), target: genId('proc', 17), type: 'supports', description: 'Service desk supports incident mgmt' },
  { id: genId('rel', relId++), source: genId('app', 32), target: genId('proc', 28), type: 'supports', description: 'CI/CD supports deployments' },
  
  // Application implements Business Capability (implements)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('cap', 3), type: 'implements', description: 'ERP implements financial management' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('cap', 1), type: 'implements', description: 'CRM implements customer management' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('cap', 1), type: 'implements', description: 'Portal implements customer management' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('cap', 4), type: 'implements', description: 'HR implements human resources' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('cap', 3), type: 'implements', description: 'Finance implements financial mgmt' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('cap', 2), type: 'implements', description: 'E-commerce implements order fulfillment' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('cap', 2), type: 'implements', description: 'Order mgmt implements fulfillment' },
  { id: genId('rel', relId++), source: genId('app', 10), target: genId('cap', 5), type: 'implements', description: 'Inventory implements supply chain' },
  { id: genId('rel', relId++), source: genId('app', 16), target: genId('cap', 13), type: 'implements', description: 'Data warehouse implements analytics' },
  { id: genId('rel', relId++), source: genId('app', 17), target: genId('cap', 13), type: 'implements', description: 'BI implements analytics' },
  { id: genId('rel', relId++), source: genId('app', 21), target: genId('cap', 10), type: 'implements', description: 'IAM implements information security' },
  { id: genId('rel', relId++), source: genId('app', 23), target: genId('cap', 10), type: 'implements', description: 'SIEM implements security' },
  { id: genId('rel', relId++), source: genId('app', 26), target: genId('cap', 9), type: 'implements', description: 'Monitoring implements IT operations' },
  { id: genId('rel', relId++), source: genId('app', 30), target: genId('cap', 8), type: 'implements', description: 'Service desk implements customer service' },
  { id: genId('rel', relId++), source: genId('app', 41), target: genId('cap', 5), type: 'implements', description: 'SCM implements supply chain' },
  { id: genId('rel', relId++), source: genId('app', 46), target: genId('cap', 7), type: 'implements', description: 'Marketing implements marketing & sales' },
  { id: genId('rel', relId++), source: genId('app', 51), target: genId('cap', 8), type: 'implements', description: 'Call center implements customer service' },
  { id: genId('rel', relId++), source: genId('app', 56), target: genId('cap', 11), type: 'implements', description: 'Compliance implements compliance mgmt' },
  
  // Security Controls protect Applications (protects)
  { id: genId('rel', relId++), source: genId('sec', 1), target: genId('app', 3), type: 'protects', description: 'MFA protects customer portal' },
  { id: genId('rel', relId++), source: genId('sec', 1), target: genId('app', 21), type: 'protects', description: 'MFA protects IAM' },
  { id: genId('rel', relId++), source: genId('sec', 1), target: genId('app', 36), type: 'protects', description: 'MFA protects mobile banking' },
  { id: genId('rel', relId++), source: genId('sec', 2), target: genId('app', 1), type: 'protects', description: 'Encryption protects ERP' },
  { id: genId('rel', relId++), source: genId('sec', 2), target: genId('app', 5), type: 'protects', description: 'Encryption protects finance' },
  { id: genId('rel', relId++), source: genId('sec', 2), target: genId('app', 36), type: 'protects', description: 'Encryption protects mobile banking' },
  { id: genId('rel', relId++), source: genId('sec', 3), target: genId('app', 3), type: 'protects', description: 'TLS protects portal' },
  { id: genId('rel', relId++), source: genId('sec', 3), target: genId('app', 6), type: 'protects', description: 'TLS protects e-commerce' },
  { id: genId('rel', relId++), source: genId('sec', 3), target: genId('app', 7), type: 'protects', description: 'TLS protects payment' },
  { id: genId('rel', relId++), source: genId('sec', 5), target: genId('app', 3), type: 'protects', description: 'WAF protects portal' },
  { id: genId('rel', relId++), source: genId('sec', 5), target: genId('app', 6), type: 'protects', description: 'WAF protects e-commerce' },
  { id: genId('rel', relId++), source: genId('sec', 5), target: genId('app', 34), type: 'protects', description: 'WAF protects API gateway' },
  { id: genId('rel', relId++), source: genId('sec', 11), target: genId('app', 1), type: 'protects', description: 'ACL protects ERP' },
  { id: genId('rel', relId++), source: genId('sec', 11), target: genId('app', 2), type: 'protects', description: 'ACL protects CRM' },
  { id: genId('rel', relId++), source: genId('sec', 11), target: genId('app', 5), type: 'protects', description: 'ACL protects finance' },
  { id: genId('rel', relId++), source: genId('sec', 15), target: genId('app',1), type: 'protects', description: 'Antivirus protects ERP' },
  { id: genId('rel', relId++), source: genId('sec', 18), target: genId('app', 11), type: 'protects', description: 'Email security protects email' },
  { id: genId('rel', relId++), source: genId('sec', 25), target: genId('app', 23), type: 'protects', description: 'SIEM protects itself' },
  { id: genId('rel', relId++), source: genId('sec', 35), target: genId('app', 34), type: 'protects', description: 'API security protects gateway' },
  
  // Security Controls protect Infrastructure (protects)
  { id: genId('rel', relId++), source: genId('sec', 4), target: genId('infra', 13), type: 'protects', description: 'Firewall protects network' },
  { id: genId('rel', relId++), source: genId('sec', 6), target: genId('infra', 1), type: 'protects', description: 'IDS protects web cluster' },
  { id: genId('rel', relId++), source: genId('sec', 6), target: genId('infra', 2), type: 'protects', description: 'IDS protects app servers' },
  { id: genId('rel', relId++), source: genId('sec', 6), target: genId('infra', 3), type: 'protects', description: 'IDS protects database' },
  { id: genId('rel', relId++), source: genId('sec', 20), target: genId('infra', 15), type: 'protects', description: 'VPN secures VPN gateway' },
  { id: genId('rel', relId++), source: genId('sec', 21), target: genId('infra', 11), type: 'protects', description: 'Segmentation protects core network' },
  { id: genId('rel', relId++), source: genId('sec', 29), target: genId('infra', 10), type: 'protects', description: 'Backup protects backup storage' },
  
  // Security Controls mitigate Threats (mitigates)
  { id: genId('rel', relId++), source: genId('sec', 1), target: genId('threat', 9), type: 'mitigates', description: 'MFA mitigates password spraying' },
  { id: genId('rel', relId++), source: genId('sec', 2), target: genId('threat', 6), type: 'mitigates', description: 'Encryption mitigates data breach' },
  { id: genId('rel', relId++), source: genId('sec', 4), target: genId('threat', 2), type: 'mitigates', description: 'Firewall mitigates DDoS' },
  { id: genId('rel', relId++), source: genId('sec', 5), target: genId('threat', 3), type: 'mitigates', description: 'WAF mitigates SQL injection' },
  { id: genId('rel', relId++), source: genId('sec', 6), target: genId('threat', 8), type: 'mitigates', description: 'IDS mitigates zero-day exploits' },
  { id: genId('rel', relId++), source: genId('sec', 9), target: genId('threat', 4), type: 'mitigates', description: 'Training mitigates phishing' },
  { id: genId('rel', relId++), source: genId('sec', 10), target: genId('threat', 4), type: 'mitigates', description: 'Phishing sim mitigates phishing' },
  { id: genId('rel', relId++), source: genId('sec', 17), target: genId('threat', 6), type: 'mitigates', description: 'DLP mitigates data breach' },
  { id: genId('rel', relId++), source: genId('sec', 18), target: genId('threat', 4), type: 'mitigates', description: 'Email security mitigates phishing' },
  { id: genId('rel', relId++), source: genId('sec', 18), target: genId('threat', 14), type: 'mitigates', description: 'Email security mitigates BEC' },
  { id: genId('rel', relId++), source: genId('sec', 25), target: genId('threat', 1), type: 'mitigates', description: 'SIEM detects ransomware' },
  { id: genId('rel', relId++), source: genId('sec', 27), target: genId('threat', 1), type: 'mitigates', description: 'IR plan mitigates ransomware' },
  { id: genId('rel', relId++), source: genId('sec', 30), target: genId('threat', 8), type: 'mitigates', description: 'Patching mitigates zero-day' },
  { id: genId('rel', relId++), source: genId('sec', 38), target: genId('threat', 12), type: 'mitigates', description: 'CSPM mitigates cloud misconfig' },
  { id: genId('rel', relId++), source: genId('sec', 45), target: genId('threat', 7), type: 'mitigates', description: 'Vendor risk mitigates supply chain attack' },
  
  // Security Controls mitigate Vulnerabilities (mitigates)
  { id: genId('rel', relId++), source: genId('sec', 1), target: genId('vuln', 2), type: 'mitigates', description: 'MFA mitigates weak passwords' },
  { id: genId('rel', relId++), source: genId('sec', 3), target: genId('vuln', 3), type: 'mitigates', description: 'TLS mitigates missing encryption' },
  { id: genId('rel', relId++), source: genId('sec', 4), target: genId('vuln', 4), type: 'mitigates', description: 'Firewall mitigates open ports' },
  { id: genId('rel', relId++), source: genId('sec', 5), target: genId('vuln', 5), type: 'mitigates', description: 'WAF mitigates SQL injection' },
  { id: genId('rel', relId++), source: genId('sec', 5), target: genId('vuln', 6), type: 'mitigates', description: 'WAF mitigates XSS' },
  { id: genId('rel', relId++), source: genId('sec', 7), target: genId('vuln', 1), type: 'mitigates', description: 'Vuln scanning finds outdated software' },
  { id: genId('rel', relId++), source: genId('sec', 13), target: genId('vuln', 2), type: 'mitigates', description: 'Password policy prevents weak passwords' },
  { id: genId('rel', relId++), source: genId('sec', 22), target: genId('vuln', 14), type: 'mitigates', description: 'Encryption prevents data exposure' },
  { id: genId('rel', relId++), source: genId('sec', 24), target: genId('vuln', 10), type: 'mitigates', description: 'Logging addresses insufficient logging' },
  { id: genId('rel', relId++), source: genId('sec', 30), target: genId('vuln', 1), type: 'mitigates', description: 'Patching fixes outdated software' },
  { id: genId('rel', relId++), source: genId('sec', 32), target: genId('vuln', 11), type: 'mitigates', description: 'Secure dev prevents hardcoded credentials' },
  { id: genId('rel', relId++), source: genId('sec', 35), target: genId('vuln', 8), type: 'mitigates', description: 'API security fixes insecure API' },
  { id: genId('rel', relId++), source: genId('sec', 35), target: genId('vuln', 18), type: 'mitigates', description: 'API sec adds rate limiting' },
  
  // Threats threaten Applications (threatens)
  { id: genId('rel', relId++), source: genId('threat', 1), target: genId('app', 1), type: 'threatens', description: 'Ransomware threatens ERP' },
  { id: genId('rel', relId++), source: genId('threat', 1), target: genId('app', 5), type: 'threatens', description: 'Ransomware threatens finance' },
  { id: genId('rel', relId++), source: genId('threat', 2), target: genId('app', 3), type: 'threatens', description: 'DDoS threatens portal' },
  { id: genId('rel', relId++), source: genId('threat', 2), target: genId('app', 6), type: 'threatens', description: 'DDoS threatens e-commerce' },
  { id: genId('rel', relId++), source: genId('threat', 3), target: genId('app', 1), type: 'threatens', description: 'SQL injection threatens ERP' },
  { id: genId('rel', relId++), source: genId('threat', 3), target: genId('app', 2), type: 'threatens', description: 'SQL injection threatens CRM' },
  { id: genId('rel', relId++), source: genId('threat', 4), target: genId('app', 11), type: 'threatens', description: 'Phishing threatens email' },
  { id: genId('rel', relId++), source: genId('threat', 4), target: genId('app', 21), type: 'threatens', description: 'Phishing threatens IAM' },
  { id: genId('rel', relId++), source: genId('threat', 6), target: genId('app', 3), type: 'threatens', description: 'Data breach threatens portal' },
  { id: genId('rel', relId++), source: genId('threat', 6), target: genId('app', 36), type: 'threatens', description: 'Data breach threatens mobile banking' },
  { id: genId('rel', relId++), source: genId('threat', 11), target: genId('app', 34), type: 'threatens', description: 'API abuse threatens gateway' },
  
  // Threats threaten Infrastructure (threatens)
  { id: genId('rel', relId++), source: genId('threat', 2), target: genId('infra', 1), type: 'threatens', description: 'DDoS threatens web cluster' },
  { id: genId('rel', relId++), source: genId('threat', 12), target: genId('infra', 25), type: 'threatens', description: 'Cloud misconfig threatens Kubernetes' },
  { id: genId('rel', relId++), source: genId('threat', 13), target: genId('infra', 38), type: 'threatens', description: 'IoT compromise threatens IoT gateway' },
  
  // Threats threaten Business Processes (threatens)
  { id: genId('rel', relId++), source: genId('threat', 1), target: genId('proc', 1), type: 'threatens', description: 'Ransomware threatens order processing' },
  { id: genId('rel', relId++), source: genId('threat', 1), target: genId('proc', 7), type: 'threatens', description: 'Ransomware threatens financial reporting' },
  { id: genId('rel', relId++), source: genId('threat', 2), target: genId('proc', 1), type: 'threatens', description: 'DDoS threatens orders' },
  { id: genId('rel', relId++), source: genId('threat', 6), target: genId('proc', 3), type: 'threatens', description: 'Data breach threatens payments' },
  
  // Vulnerabilities affect Applications (affects)
  { id: genId('rel', relId++), source: genId('vuln', 1), target: genId('app', 95), type: 'affects', description: 'Outdated software affects legacy mainframe' },
  { id: genId('rel', relId++), source: genId('vuln', 5), target: genId('app', 1), type: 'affects', description: 'SQL injection affects ERP' },
  { id: genId('rel', relId++), source: genId('vuln', 5), target: genId('app', 2), type: 'affects', description: 'SQL injection affects CRM' },
  { id: genId('rel', relId++), source: genId('vuln', 6), target: genId('app', 3), type: 'affects', description: 'XSS affects portal' },
  { id: genId('rel', relId++), source: genId('vuln', 6), target: genId('app', 6), type: 'affects', description: 'XSS affects e-commerce' },
  { id: genId('rel', relId++), source: genId('vuln', 8), target: genId('app', 34), type: 'affects', description: 'Insecure API affects gateway' },
  { id: genId('rel', relId++), source: genId('vuln', 11), target: genId('app', 31), type: 'affects', description: 'Hardcoded creds affect source control' },
  { id: genId('rel', relId++), source: genId('vuln', 13), target: genId('app', 21), type: 'affects', description: 'Broken auth affects IAM' },
  
  // Vulnerabilities affect Infrastructure (affects)
  { id: genId('rel', relId++), source: genId('vuln', 4), target: genId('infra', 13), type: 'affects', description: 'Open ports affect firewall' },
  { id: genId('rel', relId++), source: genId('vuln', 9), target: genId('infra', 13), type: 'affects', description: 'Misconfig affects firewall' },
  { id: genId('rel', relId++), source: genId('vuln', 19), target: genId('infra', 15), type: 'affects', description: 'Weak ciphers affect VPN' },
  
  // DataStore stores DataObject (stores)
  { id: genId('rel', relId++), source: genId('ds', 1), target: genId('data', 1), type: 'stores', description: 'Customer DB stores PII' },
  { id: genId('rel', relId++), source: genId('ds', 1), target: genId('data', 9), type: 'stores', description: 'Customer DB stores emails' },
  { id: genId('rel', relId++), source: genId('ds', 1), target: genId('data', 10), type: 'stores', description: 'Customer DB stores phone numbers' },
  { id: genId('rel', relId++), source: genId('ds', 1), target: genId('data', 11), type: 'stores', description: 'Customer DB stores addresses' },
  { id: genId('rel', relId++), source: genId('ds', 3), target: genId('data', 18), type: 'stores', description: 'Order DB stores orders' },
  { id: genId('rel', relId++), source: genId('ds', 3), target: genId('data', 19), type: 'stores', description: 'Order DB stores invoices' },
  { id: genId('rel', relId++), source: genId('ds', 3), target: genId('data', 20), type: 'stores', description: 'Order DB stores shipping info' },
  { id: genId('rel', relId++), source: genId('ds', 4), target: genId('data', 2), type: 'stores', description: 'Financial DB stores payment cards' },
  { id: genId('rel', relId++), source: genId('ds', 4), target: genId('data', 3), type: 'stores', description: 'Financial DB stores bank accounts' },
  { id: genId('rel', relId++), source: genId('ds', 4), target: genId('data', 16), type: 'stores', description: 'Financial DB stores statements' },
  { id: genId('rel', relId++), source: genId('ds', 5), target: genId('data', 4), type: 'stores', description: 'HR DB stores employee PII' },
  { id: genId('rel', relId++), source: genId('ds', 5), target: genId('data', 5), type: 'stores', description: 'HR DB stores salaries' },
  { id: genId('rel', relId++), source: genId('ds', 5), target: genId('data', 29), type: 'stores', description: 'HR DB stores performance reviews' },
  { id: genId('rel', relId++), source: genId('ds', 8), target: genId('data', 9), type: 'stores', description: 'Email archive stores emails' },
  { id: genId('rel', relId++), source: genId('ds', 9), target: genId('data', 23), type: 'stores', description: 'Log storage stores security logs' },
  { id: genId('rel', relId++), source: genId('ds', 10), target: genId('data', 23), type: 'stores', description: 'Event store stores security logs' },
  { id: genId('rel', relId++), source: genId('ds', 10), target: genId('data', 24), type: 'stores', description: 'Event store stores incidents' },
  { id: genId('rel', relId++), source: genId('ds', 14), target: genId('data', 12), type: 'stores', description: 'Session store stores credentials' },
  { id: genId('rel', relId++), source: genId('ds', 18), target: genId('data', 30), type: 'stores', description: 'Ticket DB stores support tickets' },
  { id: genId('rel', relId++), source: genId('ds', 19), target: genId('data', 25), type: 'stores', description: 'Audit log stores compliance records' },
  { id: genId('rel', relId++), source: genId('ds', 24), target: genId('data', 17), type: 'stores', description: 'Contract DB stores contracts' },
  { id: genId('rel', relId++), source: genId('ds', 25), target: genId('data', 25), type: 'stores', description: 'Compliance DB stores compliance data' },
  
  // Application processes DataObject (processes)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('data', 16), type: 'processes', description: 'ERP processes financial statements' },
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('data', 18), type: 'processes', description: 'ERP processes orders' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('data', 1), type: 'processes', description: 'CRM processes customer PII' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('data', 9), type: 'processes', description: 'CRM processes emails' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('data', 1), type: 'processes', description: 'Portal processes customer PII' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('data', 18), type: 'processes', description: 'Portal processes orders' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('data', 4), type: 'processes', description: 'HR processes employee data' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('data', 5), type: 'processes', description: 'HR processes salaries' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('data', 16), type: 'processes', description: 'Finance processes statements' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('data', 28), type: 'processes', description: 'Finance processes budgets' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('data', 18), type: 'processes', description: 'E-commerce processes orders' },
  { id: genId('rel', relId++), source: genId('app', 7), target: genId('data', 2), type: 'processes', description: 'Payment processes card data' },
  { id: genId('rel', relId++), source: genId('app', 7), target: genId('data', 3), type: 'processes', description: 'Payment processes bank accounts' },
  { id: genId('rel', relId++), source: genId('app', 11), target: genId('data', 9), type: 'processes', description: 'Email processes emails' },
  { id: genId('rel', relId++), source: genId('app', 16), target: genId('data', 32), type: 'processes', description: 'Warehouse processes analytics' },
  { id: genId('rel', relId++), source: genId('app', 21), target: genId('data', 12), type: 'processes', description: 'IAM processes credentials' },
  { id: genId('rel', relId++), source: genId('app', 23), target: genId('data', 23), type: 'processes', description: 'SIEM processes logs' },
  { id: genId('rel', relId++), source: genId('app', 23), target: genId('data', 24), type: 'processes', description: 'SIEM processes incidents' },
  { id: genId('rel', relId++), source: genId('app', 36), target: genId('data', 2), type: 'processes', description: 'Mobile banking processes payment data' },
  
  // Person/Org owns entities (owns)
  { id: genId('rel', relId++), source: genId('person', 1), target: genId('app', 1), type: 'owns', description: 'CIO owns ERP' },
  { id: genId('rel', relId++), source: genId('person', 1), target: genId('app', 21), type: 'owns', description: 'CIO owns IAM' },
  { id: genId('rel', relId++), source: genId('person', 1), target: genId('app', 26), type: 'owns', description: 'CIO owns monitoring' },
  { id: genId('rel', relId++), source: genId('person', 2), target: genId('app', 23), type: 'owns', description: 'CISO owns SIEM' },
  { id: genId('rel', relId++), source: genId('person', 2), target: genId('app', 24), type: 'owns', description: 'CISO owns vuln scanner' },
  { id: genId('rel', relId++), source: genId('person', 2), target: genId('policy', 1), type: 'owns', description: 'CISO owns security policy' },
  { id: genId('rel', relId++), source: genId('person', 3), target: genId('app', 5), type: 'owns', description: 'CFO owns finance system' },
  { id: genId('rel', relId++), source: genId('person', 3), target: genId('app', 7), type: 'owns', description: 'CFO owns payment gateway' },
  { id: genId('rel', relId++), source: genId('person', 4), target: genId('app', 4), type: 'owns', description: 'HR Director owns HR system' },
  { id: genId('rel', relId++), source: genId('person', 5), target: genId('app', 2), type: 'owns', description: 'Sales Director owns CRM' },
  { id: genId('rel', relId++), source: genId('person', 5), target: genId('app', 6), type: 'owns', description: 'Sales Director owns e-commerce' },
  { id: genId('rel', relId++), source: genId('person', 7), target: genId('app', 56), type: 'owns', description: 'Compliance officer owns compliance system' },
  { id: genId('rel', relId++), source: genId('person', 7), target: genId('policy', 3), type: 'owns', description: 'Compliance owns data protection policy' },
  { id: genId('rel', relId++), source: genId('org', 1), target: genId('proc', 17), type: 'owns', description: 'IT owns incident management' },
  { id: genId('rel', relId++), source: genId('org', 2), target: genId('proc', 19), type: 'owns', description: 'Security owns security monitoring' },
  { id: genId('rel', relId++), source: genId('org', 3), target: genId('proc', 7), type: 'owns', description: 'Finance owns reporting' },
  { id: genId('rel', relId++), source: genId('org', 4), target: genId('proc', 9), type: 'owns', description: 'HR owns recruitment' },
  { id: genId('rel', relId++), source: genId('org', 5), target: genId('proc', 16), type: 'owns', description: 'Sales owns sales pipeline' },
  
  // Application complies_with Compliance Requirement (complies_with)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('comp', 1), type: 'complies_with', description: 'ERP complies with NIS 2' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('comp', 2), type: 'complies_with', description: 'CRM complies with GDPR' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('comp', 2), type: 'complies_with', description: 'Portal complies with GDPR' },
  { id: genId('rel', relId++), source: genId('app', 4), target: genId('comp', 2), type: 'complies_with', description: 'HR complies with GDPR' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('comp', 7), type: 'complies_with', description: 'Finance complies with SOX' },
  { id: genId('rel', relId++), source: genId('app', 5), target: genId('comp', 1), type: 'complies_with', description: 'Finance complies with NIS 2' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('comp', 2), type: 'complies_with', description: 'E-commerce complies with GDPR' },
  { id: genId('rel', relId++), source: genId('app', 7), target: genId('comp', 4), type: 'complies_with', description: 'Payment complies with PCI DSS' },
  { id: genId('rel', relId++), source: genId('app', 7), target: genId('comp', 1), type: 'complies_with', description: 'Payment complies with NIS 2' },
  { id: genId('rel', relId++), source: genId('app', 21), target: genId('comp', 1), type: 'complies_with', description: 'IAM complies with NIS 2' },
  { id: genId('rel', relId++), source: genId('app', 23), target: genId('comp', 1), type: 'complies_with', description: 'SIEM complies with NIS 2' },
  { id: genId('rel', relId++), source: genId('app', 36), target: genId('comp', 2), type: 'complies_with', description: 'Mobile banking complies with GDPR' },
  { id: genId('rel', relId++), source: genId('app', 36), target: genId('comp', 4), type: 'complies_with', description: 'Mobile banking complies with PCI DSS' },
  { id: genId('rel', relId++), source: genId('app', 56), target: genId('comp', 1), type: 'complies_with', description: 'Compliance system complies with NIS 2' },
  { id: genId('rel', relId++), source: genId('policy', 1), target: genId('comp', 1), type: 'complies_with', description: 'Security policy complies with NIS 2' },
  { id: genId('rel', relId++), source: genId('policy', 1), target: genId('comp', 3), type: 'complies_with', description: 'Security policy complies with ISO 27001' },
  { id: genId('rel', relId++), source: genId('policy', 3), target: genId('comp', 2), type: 'complies_with', description: 'Data protection policy complies with GDPR' },
  { id: genId('rel', relId++), source: genId('sec', 47), target: genId('comp', 2), type: 'complies_with', description: 'Privacy controls comply with GDPR' },
  
  // Application depends on Supplier (depends_on)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('supplier', 1), type: 'depends_on', description: 'ERP depends on cloud provider' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('supplier', 1), type: 'depends_on', description: 'Portal depends on cloud provider' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('supplier', 1), type: 'depends_on', description: 'E-commerce depends on cloud' },
  { id: genId('rel', relId++), source: genId('app', 7), target: genId('supplier', 9), type: 'depends_on', description: 'Payment depends on payment gateway' },
  { id: genId('rel', relId++), source: genId('app', 11), target: genId('supplier', 7), type: 'depends_on', description: 'Email depends on SaaS' },
  { id: genId('rel', relId++), source: genId('app', 13), target: genId('supplier', 7), type: 'depends_on', description: 'Collaboration depends on SaaS' },
  { id: genId('rel', relId++), source: genId('app', 21), target: genId('supplier', 2), type: 'depends_on', description: 'IAM depends on auth vendor' },
  { id: genId('rel', relId++), source: genId('app', 27), target: genId('supplier', 3), type: 'depends_on', description: 'Backup depends on backup vendor' },

  // Application communicates_with Application (communicates_with)
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('app', 2), type: 'communicates_with', description: 'ERP integrates with CRM' },
  { id: genId('rel', relId++), source: genId('app', 1), target: genId('app', 5), type: 'communicates_with', description: 'ERP integrates with finance' },
  { id: genId('rel', relId++), source: genId('app', 2), target: genId('app', 11), type: 'communicates_with', description: 'CRM integrates with email' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('app', 1), type: 'communicates_with', description: 'Portal integrates with ERP' },
  { id: genId('rel', relId++), source: genId('app', 3), target: genId('app', 2), type: 'communicates_with', description: 'Portal integrates with CRM' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('app', 1), type: 'communicates_with', description: 'E-commerce integrates with ERP' },
  { id: genId('rel', relId++), source: genId('app', 6), target: genId('app', 8), type: 'communicates_with', description: 'E-commerce integrates with catalog' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('app', 10), type: 'communicates_with', description: 'Orders integrate with inventory' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('app', 42), type: 'communicates_with', description: 'Orders integrate with logistics' },
  { id: genId('rel', relId++), source: genId('app', 17), target: genId('app', 16), type: 'communicates_with', description: 'BI queries data warehouse' },
  { id: genId('rel', relId++), source: genId('app', 30), target: genId('app', 11), type: 'communicates_with', description: 'Service desk integrates with email' },
  { id: genId('rel', relId++), source: genId('app', 46), target: genId('app', 2), type: 'communicates_with', description: 'Marketing integrates with CRM' },
  { id: genId('rel', relId++), source: genId('app', 71), target: genId('app', 1), type: 'communicates_with', description: 'Integration platform connects to ERP' },
  { id: genId('rel', relId++), source: genId('app', 71), target: genId('app', 2), type: 'communicates_with', description: 'Integration platform connects to CRM' },
  { id: genId('rel', relId++), source: genId('app', 71), target: genId('app', 5), type: 'communicates_with', description: 'Integration platform connects to finance' },
  
  // Additional infrastructure dependencies
  { id: genId('rel', relId++), source: genId('app', 8), target: genId('infra', 1), type: 'hosted_on', description: 'Catalog on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('infra', 2), type: 'hosted_on', description: 'Orders on app servers' },
  { id: genId('rel', relId++), source: genId('app', 10), target: genId('infra', 2), type: 'hosted_on', description: 'Inventory on app servers' },
  { id: genId('rel', relId++), source: genId('app', 12), target: genId('infra', 2), type: 'hosted_on', description: 'Documents on app servers' },
  { id: genId('rel', relId++), source: genId('app', 13), target: genId('infra', 1), type: 'hosted_on', description: 'Collaboration on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 14), target: genId('infra', 28), type: 'hosted_on', description: 'Calendar on mail servers' },
  { id: genId('rel', relId++), source: genId('app', 15), target: genId('infra', 1), type: 'hosted_on', description: 'Knowledge base on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 17), target: genId('infra', 2), type: 'hosted_on', description: 'BI on app servers' },
  { id: genId('rel', relId++), source: genId('app', 18), target: genId('infra', 2), type: 'hosted_on', description: 'Reporting on app servers' },
  { id: genId('rel', relId++), source: genId('app', 19), target: genId('infra', 2), type: 'hosted_on', description: 'Dashboard on app servers' },
  { id: genId('rel', relId++), source: genId('app', 20), target: genId('infra', 32), type: 'hosted_on', description: 'ETL on analytics DB' },
  { id: genId('rel', relId++), source: genId('app', 22), target: genId('infra', 23), type: 'hosted_on', description: 'Firewall mgmt on security platform' },
  { id: genId('rel', relId++), source: genId('app', 24), target: genId('infra', 23), type: 'hosted_on', description: 'Vuln scanner on security platform' },
  { id: genId('rel', relId++), source: genId('app', 25), target: genId('infra', 22), type: 'hosted_on', description: 'Endpoint protection on security server' },
  { id: genId('rel', relId++), source: genId('app', 28), target: genId('infra', 8), type: 'hosted_on', description: 'DR orchestration on DR site' },
  { id: genId('rel', relId++), source: genId('app', 29), target: genId('infra', 2), type: 'hosted_on', description: 'Asset mgmt on app servers' },
  { id: genId('rel', relId++), source: genId('app', 30), target: genId('infra', 2), type: 'hosted_on', description: 'Service desk on app servers' },
  { id: genId('rel', relId++), source: genId('app', 33), target: genId('infra', 25), type: 'hosted_on', description: 'Container registry on Kubernetes' },
  { id: genId('rel', relId++), source: genId('app', 35), target: genId('infra', 26), type: 'hosted_on', description: 'Microservices on Docker' },
  { id: genId('rel', relId++), source: genId('app', 37), target: genId('infra', 1), type: 'hosted_on', description: 'Mobile app backend on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 38), target: genId('infra', 1), type: 'hosted_on', description: 'Customer loyalty on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 39), target: genId('infra', 1), type: 'hosted_on', description: 'Push notification on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 40), target: genId('infra', 1), type: 'hosted_on', description: 'Mobile analytics on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 42), target: genId('infra', 2), type: 'hosted_on', description: 'Logistics on app servers' },
  { id: genId('rel', relId++), source: genId('app', 43), target: genId('infra', 2), type: 'hosted_on', description: 'Procurement on app servers' },
  { id: genId('rel', relId++), source: genId('app', 44), target: genId('infra', 2), type: 'hosted_on', description: 'Vendor portal on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 45), target: genId('infra', 2), type: 'hosted_on', description: 'Contract mgmt on app servers' },
  { id: genId('rel', relId++), source: genId('app', 46), target: genId('infra', 2), type: 'hosted_on', description: 'Marketing automation on app servers' },
  { id: genId('rel', relId++), source: genId('app', 47), target: genId('infra', 2), type: 'hosted_on', description: 'Social media on app servers' },
  { id: genId('rel', relId++), source: genId('app', 48), target: genId('infra', 1), type: 'hosted_on', description: 'Campaign mgmt on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 49), target: genId('infra', 2), type: 'hosted_on', description: 'Email marketing on app servers' },
  { id: genId('rel', relId++), source: genId('app', 50), target: genId('infra', 2), type: 'hosted_on', description: 'Lead scoring on app servers' },
  { id: genId('rel', relId++), source: genId('app', 52), target: genId('infra', 1), type: 'hosted_on', description: 'Live chat on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 53), target: genId('infra', 2), type: 'hosted_on', description: 'Feedback on app servers' },
  { id: genId('rel', relId++), source: genId('app', 54), target: genId('infra', 2), type: 'hosted_on', description: 'FAQ on web cluster' },
  { id: genId('rel', relId++), source: genId('app', 55), target: genId('infra', 2), type: 'hosted_on', description: 'Survey on app servers' },
  { id: genId('rel', relId++), source: genId('app', 57), target: genId('infra', 2), type: 'hosted_on', description: 'Audit log on app servers' },
  { id: genId('rel', relId++), source: genId('app', 58), target: genId('infra', 2), type: 'hosted_on', description: 'Risk mgmt on app servers' },
  { id: genId('rel', relId++), source: genId('app', 59), target: genId('infra', 2), type: 'hosted_on', description: 'Policy mgmt on app servers' },
  { id: genId('rel', relId++), source: genId('app', 60), target: genId('infra', 2), type: 'hosted_on', description: 'GRC on app servers' },
  { id: genId('rel', relId++), source: genId('app', 61), target: genId('infra', 38), type: 'hosted_on', description: 'IoT platform on IoT gateway' },
  { id: genId('rel', relId++), source: genId('app', 62), target: genId('infra', 38), type: 'hosted_on', description: 'IoT analytics on IoT gateway' },
  { id: genId('rel', relId++), source: genId('app', 63), target: genId('infra', 2), type: 'hosted_on', description: 'Device mgmt on app servers' },
  { id: genId('rel', relId++), source: genId('app', 64), target: genId('infra', 30), type: 'hosted_on', description: 'Fleet tracking on infrastructure' },
  
  // More database dependencies
  { id: genId('rel', relId++), source: genId('app', 8), target: genId('infra', 3), type: 'depends_on', description: 'Catalog depends on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('infra', 3), type: 'depends_on', description: 'Orders depend on primary DB' },
  { id: genId('rel', relId++), source: genId('app', 10), target: genId('infra', 3), type: 'depends_on', description: 'Inventory depends on DB' },
  { id: genId('rel', relId++), source: genId('app', 12), target: genId('infra', 3), type: 'depends_on', description: 'Documents depend on DB' },
  { id: genId('rel', relId++), source: genId('app', 13), target: genId('infra', 3), type: 'depends_on', description: 'Collaboration depends on DB' },
  { id: genId('rel', relId++), source: genId('app', 19), target: genId('infra', 4), type: 'depends_on', description: 'Dashboard depends on replica' },
  { id: genId('rel', relId++), source: genId('app', 20), target: genId('infra', 32), type: 'depends_on', description: 'ETL depends on analytics DB' },
  { id: genId('rel', relId++), source: genId('app', 30), target: genId('infra', 3), type: 'depends_on', description: 'Service desk depends on DB' },
  { id: genId('rel', relId++), source: genId('app', 46), target: genId('infra', 3), type: 'depends_on', description: 'Marketing depends on DB' },
  
  // More security protections
  { id: genId('rel', relId++), source: genId('sec', 11), target: genId('app', 4), type: 'protects', description: 'ACL protects HR' },
  { id: genId('rel', relId++), source: genId('sec', 11), target: genId('app', 7), type: 'protects', description: 'ACL protects payment' },
  { id: genId('rel', relId++), source: genId('sec', 11), target: genId('app', 21), type: 'protects', description: 'ACL protects IAM' },
  { id: genId('rel', relId++), source: genId('sec', 15), target: genId('app', 2), type: 'protects', description: 'Antivirus protects CRM' },
  { id: genId('rel', relId++), source: genId('sec', 15), target: genId('app', 4), type: 'protects', description: 'Antivirus protects HR' },
  { id: genId('rel', relId++), source: genId('sec', 17), target: genId('app', 1), type: 'protects', description: 'DLP protects ERP' },
  { id: genId('rel', relId++), source: genId('sec', 17), target: genId('app', 5), type: 'protects', description: 'DLP protects finance' },
  { id: genId('rel', relId++), source: genId('sec', 22), target: genId('ds', 1), type: 'protects', description: 'DB encryption protects customer DB' },
  { id: genId('rel', relId++), source: genId('sec', 22), target: genId('ds', 4), type: 'protects', description: 'DB encryption protects financial DB' },
  { id: genId('rel', relId++), source: genId('sec', 22), target: genId('ds', 5), type: 'protects', description: 'DB encryption protects HR DB' },
  { id: genId('rel', relId++), source: genId('sec', 40), target: genId('infra', 1), type: 'protects', description: 'Security hardening protects web cluster' },
  { id: genId('rel', relId++), source: genId('sec', 40), target: genId('infra', 2), type: 'protects', description: 'Hardening protects app servers' },
  { id: genId('rel', relId++), source: genId('sec', 40), target: genId('infra', 3), type: 'protects', description: 'Hardening protects database' },
  
  // More data processing relationships
  { id: genId('rel', relId++), source: genId('app', 8), target: genId('data', 27), type: 'processes', description: 'Catalog processes product data' },
  { id: genId('rel', relId++), source: genId('app', 9), target: genId('data', 18), type: 'processes', description: 'Orders process order data' },
  { id: genId('rel', relId++), source: genId('app', 10), target: genId('data', 27), type: 'processes', description: 'Inventory processes product data' },
  { id: genId('rel', relId++), source: genId('app', 13), target: genId('data', 21), type: 'processes', description: 'Collaboration processes documents' },
  { id: genId('rel', relId++), source: genId('app', 14), target: genId('data', 26), type: 'processes', description: 'Calendar processes calendar data' },
  { id: genId('rel', relId++), source: genId('app', 17), target: genId('data', 32), type: 'processes', description: 'BI processes analytics' },
  { id: genId('rel', relId++), source: genId('app', 18), target: genId('data', 33), type: 'processes', description: 'Reporting processes reports' },
  { id: genId('rel', relId++), source: genId('app', 26), target: genId('data', 23), type: 'processes', description: 'Monitoring processes logs' },
  { id: genId('rel', relId++), source: genId('app', 30), target: genId('data', 30), type: 'processes', description: 'Service desk processes tickets' },
  { id: genId('rel', relId++), source: genId('app', 42), target: genId('data', 20), type: 'processes', description: 'Logistics processes shipping info' },
  { id: genId('rel', relId++), source: genId('app', 43), target: genId('data', 17), type: 'processes', description: 'Procurement processes contracts' },
  { id: genId('rel', relId++), source: genId('app', 46), target: genId('data', 1), type: 'processes', description: 'Marketing processes customer PII' },
  { id: genId('rel', relId++), source: genId('app', 53), target: genId('data', 31), type: 'processes', description: 'Feedback processes surveys' },
  { id: genId('rel', relId++), source: genId('app', 56), target: genId('data', 25), type: 'processes', description: 'Compliance processes compliance data' },
  { id: genId('rel', relId++), source: genId('app', 57), target: genId('data', 23), type: 'processes', description: 'Audit log processes logs' },
  
  // Additional business process relationships
  { id: genId('rel', relId++), source: genId('app', 41), target: genId('proc', 20), type: 'supports', description: 'SCM supports supplier mgmt' },
  { id: genId('rel', relId++), source: genId('app', 42), target: genId('proc', 11), type: 'supports', description: 'Logistics supports delivery' },
  { id: genId('rel', relId++), source: genId('app', 43), target: genId('proc', 20), type: 'supports', description: 'Procurement supports supplier mgmt' },
  { id: genId('rel', relId++), source: genId('app', 45), target: genId('proc', 21), type: 'supports', description: 'Contract mgmt supports contract mgmt' },
  { id: genId('rel', relId++), source: genId('app', 58), target: genId('proc', 22), type: 'supports', description: 'Risk mgmt supports risk mgmt' },
  { id: genId('rel', relId++), source: genId('app', 59), target: genId('proc', 23), type: 'supports', description: 'Policy mgmt supports policy mgmt' }
];

// Helper function to add type to entities
const addType = (entities, typeName) => entities.map(e => ({ ...e, type: typeName }));

// Export all data
export const sampleData = {
  metamodel: {
    perspectives: [
      { name: 'ApplicationSystem', color: '#3b82f6', icon: 'Server' },
      { name: 'InfrastructureNode', color: '#8b5cf6', icon: 'HardDrive' },
      { name: 'BusinessProcess', color: '#10b981', icon: 'Activity' },
      { name: 'BusinessCapability', color: '#6366f1', icon: 'Target' },
      { name: 'SecurityControl', color: '#ef4444', icon: 'Shield' },
      { name: 'DataStore', color: '#f59e0b', icon: 'Database' },
      { name: 'DataObject', color: '#ec4899', icon: 'FileText' },
      { name: 'ThreatScenario', color: '#dc2626', icon: 'AlertTriangle' },
      { name: 'Vulnerability', color: '#f97316', icon: 'AlertOctagon' },
      { name: 'OrganizationalUnit', color: '#14b8a6', icon: 'Building' },
      { name: 'Person', color: '#06b6d4', icon: 'User' },
      { name: 'Policy', color: '#8b5cf6', icon: 'FileText' },
      { name: 'ComplianceRequirement', color: '#84cc16', icon: 'CheckCircle' },
      { name: 'Supplier', color: '#f43f5e', icon: 'Truck' }
    ],
    relationshipTypes: [
      { name: 'supports', validFrom: ['ApplicationSystem'], validTo: ['BusinessProcess'] },
      { name: 'depends_on', validFrom: ['ApplicationSystem', 'InfrastructureNode'], validTo: ['ApplicationSystem', 'InfrastructureNode', 'Supplier'] },
      { name: 'implements', validFrom: ['ApplicationSystem'], validTo: ['BusinessCapability'] },
      { name: 'hosted_on', validFrom: ['ApplicationSystem'], validTo: ['InfrastructureNode'] },
      { name: 'protects', validFrom: ['SecurityControl'], validTo: ['ApplicationSystem', 'InfrastructureNode', 'DataStore'] },
      { name: 'mitigates', validFrom: ['SecurityControl'], validTo: ['ThreatScenario', 'Vulnerability'] },
      { name: 'threatens', validFrom: ['ThreatScenario'], validTo: ['ApplicationSystem', 'InfrastructureNode', 'BusinessProcess'] },
      { name: 'affects', validFrom: ['Vulnerability'], validTo: ['ApplicationSystem', 'InfrastructureNode'] },
      { name: 'stores', validFrom: ['DataStore'], validTo: ['DataObject'] },
      { name: 'processes', validFrom: ['ApplicationSystem'], validTo: ['DataObject'] },
      { name: 'owns', validFrom: ['Person', 'OrganizationalUnit'], validTo: ['ApplicationSystem', 'BusinessProcess', 'Policy'] },
      { name: 'complies_with', validFrom: ['ApplicationSystem', 'SecurityControl', 'Policy'], validTo: ['ComplianceRequirement'] },
      { name: 'communicates_with', validFrom: ['ApplicationSystem'], validTo: ['ApplicationSystem'] },
      { name: 'uses', validFrom: ['BusinessProcess'], validTo: ['ApplicationSystem'] }
    ]
  },
  entities: [
    ...addType(sampleApplicationSystems, 'ApplicationSystem'),
    ...addType(sampleInfrastructureNodes, 'InfrastructureNode'),
    ...addType(sampleBusinessProcesses, 'BusinessProcess'),
    ...addType(sampleBusinessCapabilities, 'BusinessCapability'),
    ...addType(sampleSecurityControls, 'SecurityControl'),
    ...addType(sampleDataStores, 'DataStore'),
    ...addType(sampleDataObjects, 'DataObject'),
    ...addType(sampleThreatScenarios, 'ThreatScenario'),
    ...addType(sampleVulnerabilities, 'Vulnerability'),
    ...addType(sampleOrganizationalUnits, 'OrganizationalUnit'),
    ...addType(samplePersons, 'Person'),
    ...addType(samplePolicies, 'Policy'),
    ...addType(sampleComplianceRequirements, 'ComplianceRequirement'),
    ...addType(sampleSuppliers, 'Supplier')
  ],
  relationships: sampleRelationships
};

export default sampleData;


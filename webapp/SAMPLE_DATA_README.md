# Sample Data Documentation

## Overview
A comprehensive realistic sample dataset has been generated for the NIS 2 EA Framework webapp. This data is designed to represent an enterprise organization with **100 applications** and supporting entities.

## Data Statistics

### Entities: 362 total

| Entity Type | Count | Description |
|------------|-------|-------------|
| ApplicationSystem | 100 | Complete application portfolio (ERP, CRM, E-commerce, Security, DevOps, Mobile, IoT, Legacy, etc.) |
| InfrastructureNode | 40 | Servers, network devices, storage, DR sites, containers, cloud services |
| BusinessProcess | 30 | Processes with RTO/RPO requirements |
| BusinessCapability | 20 | Strategic business capabilities |
| SecurityControl | 50 | Comprehensive NIS 2 security controls |
| DataStore | 35 | Databases (RDBMS, NoSQL, data warehouses, caches, archives) |
| DataObject | 40 | PII, financial data, credentials, logs, sensitive data |
| ThreatScenario | 15 | Ransomware, DDoS, SQL injection, phishing, etc. |
| Vulnerability | 20 | With CVSS scores and severity ratings |
| OrganizationalUnit | 10 | Complete organizational structure |
| Person | 15 | C-level executives, directors, managers |
| Policy | 12 | Security and operational policies |
| ComplianceRequirement | 8 | NIS 2, GDPR, ISO 27001, PCI DSS, SOX, etc. |
| Supplier | 12 | Critical vendors with risk levels |

### Relationships: 300+ total

The relationships are distributed across all 14 relationship types in the metamodel:

- **hosted_on** (~120): Applications hosted on infrastructure
- **depends_on** (~80): Application dependencies, database dependencies, supplier dependencies
- **supports** (~35): Applications supporting business processes
- **implements** (~18): Applications implementing business capabilities
- **protects** (~45): Security controls protecting assets
- **mitigates** (~25): Controls mitigating threats and vulnerabilities
- **threatens** (~13): Threats threatening assets
- **affects** (~11): Vulnerabilities affecting systems
- **stores** (~22): Data stores containing data objects
- **processes** (~27): Applications processing data
- **owns** (~18): Persons/units owning assets
- **complies_with** (~18): Compliance mappings
- **communicates_with** (~15): Application integrations

## Testing the Sample Data

### Option 1: Reset to Sample Data (Recommended)

1. Open the application: http://localhost:5174/ (or port 5173)
2. Navigate to **Settings** page
3. Click **"Reset to Initial Data"**
4. Confirm the reset
5. The application will reload with all 362 entities and 300+ relationships

### Option 2: Clear Browser Storage Manually

1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Find entries:
   - `nis2-entities`
   - `nis2-relationships`
4. Delete both entries
5. Refresh the page

### Option 3: Export/Import

1. If you want to preserve your current data, use Export first
2. Then reset or clear storage to load sample data
3. Later you can Import your old data back if needed

## Exploring the Data

### Dashboard
- Shows statistics for all 362 entities across 14 types
- Critical systems count (high priority applications)
- NIS 2 compliance overview

### Visualizer
- Graph visualization with 362 nodes and 300+ edges
- Filter by entity type or perspective
- Search for specific entities
- Export graph as image

### Entity Browser
- Browse all entities by type
- Search and filter functionality
- Click any entity to see details and relationships

### Entity Detail
- Full entity information
- Lists all incoming and outgoing relationships
- Add new relationships with validation
- Edit or delete relationships

### Relationship Manager
- View all 300+ relationships
- Filter by type, source, or target
- Search functionality
- Add/edit/delete relationships with metamodel validation

### Perspectives
- Business perspective (capabilities, processes, org units)
- Application perspective (systems and components)
- Security perspective (controls, threats, vulnerabilities)
- Data perspective (stores and objects)
- Filter entities by perspective

### Compliance
- NIS 2, GDPR, ISO 27001, PCI DSS, SOX mappings
- See which entities comply with which requirements
- Track compliance coverage

## Data Characteristics

### Realistic Enterprise Scale
- Mix of critical (25), high (35), medium (25), and low (15) priority applications
- Diverse application categories: Business (ERP, CRM, HR, Finance), Security (IAM, SIEM, Firewall), Infrastructure (Monitoring, Backup, Network), Development (CI/CD, Git, Testing), Customer-facing (Portal, E-commerce, Mobile), IoT and Industrial systems
- Representative infrastructure: On-premise servers, cloud services (AWS, Azure), network infrastructure, DR sites
- Comprehensive security coverage: Authentication, Cryptography, Network security, Monitoring, Training, Policies
- GDPR-flagged data objects for privacy compliance
- Realistic threat landscape with severity and likelihood ratings
- Vulnerabilities with CVSS scores (3.0-9.8 range)

### Relationship Validity
- All 300+ relationships follow metamodel validation rules
- No invalid relationship types between incompatible entity types
- Real-world scenarios (e.g., WAF protects customer-facing apps, SIEM detects ransomware, critical apps have DR)

### NIS 2 Alignment
- Security controls mapped to all 10 NIS 2 articles (21a-21j)
- Critical applications identified and protected
- Comprehensive risk management (threats, vulnerabilities, mitigations)
- Supply chain risk tracking (supplier dependencies and risk levels)
- Incident response capabilities (SIEM, policies, processes)
- Business continuity (RTO/RPO on processes, DR sites, backup)

## File Structure

```
webapp/src/data/
└── sampleData.js       (~4000 lines of sample data)
    ├── Helper function: genId()
    ├── 100 ApplicationSystems
    ├── 40 InfrastructureNodes
    ├── 30 BusinessProcesses
    ├── 20 BusinessCapabilities
    ├── 50 SecurityControls
    ├── 35 DataStores
    ├── 40 DataObjects
    ├── 15 ThreatScenarios
    ├── 20 Vulnerabilities
    ├── 10 OrganizationalUnits
    ├── 15 Persons
    ├── 12 Policies
    ├── 8 ComplianceRequirements
    ├── 12 Suppliers
    ├── 300+ Relationships
    └── Export: sampleData object

webapp/src/context/
└── DataContext.jsx
    └── Imports sampleData and transforms for use
```

## Performance Considerations

- The graph visualization with 362 nodes and 300+ edges performs well with Cytoscape.js Cola layout
- Initial graph layout may take 2-3 seconds for complex data
- Filtering and search are fast (client-side)
- localStorage usage: ~500-800 KB (well under browser limits)

## Extending the Sample Data

To add more sample data:

1. Edit `webapp/src/data/sampleData.js`
2. Add entities to appropriate arrays (use genId() for consistent IDs)
3. Add relationships following metamodel rules:
   - Check validFrom and validTo in metamodel.relationshipTypes
   - Use existing entity IDs as source and target
4. The DataContext will automatically load the changes on page refresh (after reset or clear storage)

## Known Limitations

- Data is static (loaded once at startup)
- No backend persistence (uses localStorage only)
- Export/Import uses JSON format (no YAML or XML support yet)
- Graph layout algorithm may vary between loads (non-deterministic positioning)

## Future Enhancements

Possible extensions to the sample data:
- More granular security control mappings to NIS 2 sub-articles
- Additional data classification levels (Top Secret, Confidential, Internal, Public)
- Time-series data for incident tracking
- Multi-tenancy support (different organizations)
- Historical versioning of entities and relationships

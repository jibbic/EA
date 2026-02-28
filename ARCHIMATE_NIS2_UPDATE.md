# ArchiMate & NIS2 Implementation Update

## Overview
This update transforms the NIS2-EA-Framework to use the **complete ArchiMate 3.1 metamodel** with integrated **NIS2 compliance tracking and analysis**.

## What's New

### 1. Complete ArchiMate 3.1 Metamodel

**File**: `webapp/src/data/archimateMetamodel.js`

The application now uses the full ArchiMate 3.1 specification including:

#### Layers
- **Business Layer**: Business capabilities, processes, actors, roles, services
- **Application Layer**: Application components, interfaces, functions, services, data objects
- **Technology Layer**: Nodes, devices, networks, system software, technology services
- **Motivation Layer**: Stakeholders, goals, principles, requirements
- **Strategy Layer**: Capabilities, resources
- **Physical Layer**: Equipment, facilities
- **Implementation & Migration Layer**: Work packages, gaps

#### Entity Types (60+)
All major ArchiMate entity types are defined with:
- Icons, colors, and visual styling
- NIS2 relevance flags (`nis2_required: true/false`)
- NIS2 article mappings
- Required attributes for compliance
- Descriptions and categorization

Examples:
- `BusinessRole` - Required for Article 20 (Governance) and Article 21 (Risk management roles)
- `Contract` - Required for Article 21 & 28 (Supply chain security)
- `ApplicationComponent` - Required for Article 21 & 23 (IT systems inventory, Asset register)
- `DataObject` - Required for Article 21 & 32 (Data protection, GDPR alignment)
- `Node` - Required for Article 21 & 23 (Infrastructure security)

#### Relationship Types
All ArchiMate 3.1 relationships:
- **Structural**: Composition, Aggregation, Assignment, Realization
- **Dependency**: Serving, Access, Influence
- **Dynamic**: Flow, Triggering
- **Other**: Specialization, Association

Each relationship includes:
- Arrow styling and symbols
- Validation rules (validFrom/validTo entity types)
- NIS2 usage descriptions
- Required vs. optional for compliance

### 2. NIS2 Compliance Framework

**File**: `webapp/src/data/archimateMetamodel.js` (nis2_compliance section)

Complete mapping of NIS2 requirements:

#### Articles Covered
1. **Article 20**: Governance
   - Management body approval
   - CISO/Security Officer roles
   - Governance framework

2. **Article 21**: Cybersecurity risk-management measures (10 checks)
   - Critical systems identification
   - Risk assessments
   - Security controls
   - Business continuity (RTO/RPO)
   - Incident response
   - Supply chain security
   - Network segmentation
   - Encryption
   - Access control
   - Multi-factor authentication

3. **Article 23**: Supervision and enforcement
   - Asset inventory
   - Configuration management
   - Audit trails

4. **Article 28**: Supply chain security
   - Supplier requirements
   - Third-party risk assessments
   - Contractual obligations
   - Supplier monitoring

5. **Article 32**: GDPR correspondence
   - Personal data identification
   - Data protection measures
   - Privacy by design
   - Data retention policies

#### Compliance Levels
- **Compliant** (≥80%): Green, CheckCircle icon
- **Partial** (50-79%): Yellow, AlertCircle icon
- **Non-compliant** (<50%): Red, XCircle icon
- **Not Applicable**: Gray, MinusCircle icon

### 3. Compliance Analyzer

**File**: `webapp/src/utils/nis2ComplianceAnalyzer.js`

Intelligent analysis engine that:
- Scans all entities and relationships
- Evaluates each compliance check
- Calculates weighted scores
- Identifies missing information
- Generates actionable recommendations

**Functions**:
- `analyzeAllCompliance()` - Full compliance analysis
- `analyzeArticleCompliance(articleId)` - Single article analysis
- `getMissingNIS2Requirements(entity)` - Entity-level gaps
- `getEntityComplianceBadge(entity)` - Visual compliance status

### 4. New Components

#### ComplianceDashboard
**File**: `webapp/src/pages/ComplianceDashboard.jsx`
**Route**: `/nis2-compliance`

Full-featured compliance dashboard with:
- **Overall Compliance Score**: Percentage and level indicator
- **Article Cards**: Expandable sections for each NIS2 article
  - Article score and compliance level
  - Progress bar
  - Detailed compliance checks with pass/partial/fail status
  - Specific findings (what exists, what's missing)
  - Issues and recommendations
- **Export Functionality**: Download compliance report as JSON
- **Real-time Analysis**: Auto-updates when data changes
- **Visual Legend**: Compliance levels with colors and icons

### 5. Enhanced Existing Components

#### DataContext Updates
**File**: `webapp/src/context/DataContext.jsx`

New Features:
- ArchiMate metamodel integration
- Automatic compliance analysis on data change
- New context values:
  - `complianceAnalysis` - Full analysis results
  - `getComplianceBadge(entity)` - Get entity compliance badge
  - `getMissingRequirements(entity)` - Get missing NIS2 attributes
  - `getArticleCompliance(articleId)` - Get specific article status
  - `refreshComplianceAnalysis()` - Force refresh
- **Data Version 3.0**: Automatic cache invalidation

#### EntityBrowser Updates
**File**: `webapp/src/pages/EntityBrowser.jsx`

New Features:
- **NIS2 Compliance Badges** on entity cards
  - Shield icon for NIS2-required entities
  - CheckCircle if complete
  - AlertTriangle with count of missing attributes
  - Color-coded by compliance status
  - Tooltip with details

#### EntityDetail Updates
**File**: `webapp/src/pages/EntityDetail.jsx`

New Section: **NIS2 Compliance**
- Shows if entity is NIS2-required
- Lists applicable NIS2 articles
- **Missing Attributes Section**:
  - Lists each missing NIS2 attribute
  - Explains why it's needed
  - Visual indicators (yellow alerts)
- **Complete Status**:
  - Green confirmation when all attributes present
- Note that NIS2 fields are recommended, not mandatory

#### Layout Navigation
**File**: `webapp/src/components/Layout.jsx`

Updated:
- Navigation link updated to point to new NIS2 Compliance Dashboard

### 6. Visual Design

#### Color Coding
- **NIS2 Required Entities**: Blue shield icon
- **Complete**: Green (#10B981)
- **Incomplete**: Yellow/Orange (#F59E0B)
- **Critical Issues**: Red (#EF4444)

#### Icons (from lucide-react)
- `Shield` - NIS2 compliance
- `CheckCircle` - Complete/Pass
- `AlertCircle` - Partial compliance
- `XCircle` - Failed check
- `AlertTriangle` - Missing required items
- `MinusCircle` - Not applicable

## Usage Guide

### For Architects

1. **View Compliance Status**
   - Navigate to "NIS2 Compliance" in sidebar
   - See overall compliance percentage
   - Expand articles to see detailed checks

2. **Identify Gaps**
   - Red/Yellow article cards show areas needing work
   - Click to expand and see specific issues
   - Missing attributes listed with explanations

3. **Complete Required Information**
   - Browse entities (Entity Browser)
   - NIS2-required entities show shield badge
   - Incomplete entities show warning count
   - Click entity → See "NIS2 Compliance" section
   - Click "Edit" to add missing attributes

4. **Track Progress**
   - Compliance analysis auto-updates
   - Watch overall score improve
   - Export reports for documentation

### For Auditors

1. **Generate Compliance Report**
   - Go to NIS2 Compliance Dashboard
   - Click "Export Report" button
   - JSON file contains:
     - Overall compliance score
     - Article-by-article breakdown
     - All checks with pass/fail status
     - Evidence (what exists)
     - Gaps (what's missing)

2. **Review Evidence**
   - Each check shows details of found elements
   - Example: "32 systems with criticality classification"
   - Example: "5/12 contracts with security requirements"

3. **Verify Compliance**
   - Green checks = requirement met
   - Yellow = partial compliance
   - Red = requirement not met
   - Specific gaps listed for remediation

## Technical Details

### Data Version Management

The system uses versioned data storage:
```javascript
const DATA_VERSION = '3.0';
```

When upgrading:
- Old cached data automatically invalidated
- Fresh data loaded from sample data
- Users don't need to manually clear cache

### Metamodel Structure

Entity types defined with:
```javascript
{
  id: "BusinessRole",
  name: "Business Role",
  layer: "business",
  shape: "rectangle",
  icon: "UserCog",
  nis2_required: true,
  nis2_mappings: ["Article 20", "Article 21"],
  required_attributes_nis2: ["name", "responsibilities"]
}
```

### Compliance Checks

Each check evaluates:
```javascript
{
  id: "critical_systems",
  description: "All critical systems identified",
  weight: 10,  // Percentage weight in article score
  score: 0-100,  // Calculated score
  status: "pass" | "partial" | "fail",
  details: [],  // What was found
  issues: []   // What's missing
}
```

### Relationship Validation

Relationships validated against metamodel:
```javascript
relationship: {
  id: "serving",
  validFrom: ["ApplicationComponent", "Node"],
  validTo: ["BusinessProcess", "ApplicationService"],
  nis2_required: true
}
```

## Migration Notes

### From Version 2.0 to 3.0

**Breaking Changes**: None for users
**Data Changes**: 
- Metamodel structure enhanced
- New entity types available
- New relationship types available

**Backward Compatibility**:
- Old entity types still work
- Old relationships preserved
- Legacy metamodel merged with ArchiMate

### New Required Attributes

Some entity types now have recommended NIS2 attributes:
- `ApplicationComponent`: criticality, owner, data_classification, version
- `BusinessProcess`: criticality, rto, rpo, owner
- `Contract`: supplier, criticality, security_requirements, review_date
- `DataObject`: classification, gdpr_relevant, encryption_required
- `Node`: criticality, location, patching_status, monitoring_enabled

These are **not mandatory** but highlighted for compliance.

## Best Practices

### 1. Document Critical Systems First
- Focus on entities with `criticality: 'critical'` or `'high'`
- These have highest impact on compliance score

### 2. Complete NIS2-Required Entities
- Look for shield badges in Entity Browser
- Prioritize entities with AlertTriangle icons
- Add missing attributes via Edit function

### 3. Establish Key Relationships
- Link systems to business processes (serving)
- Link actors to processes (assignment)
- Link data objects to systems (access)
- Link suppliers to systems (serving)

### 4. Regular Compliance Reviews
- Export reports monthly
- Track score trends
- Use gaps as backlog items
- Verify evidence before audits

### 5. Use ArchiMate Properly
- Follow ArchiMate relationship rules
- Use correct entity types for concepts
- Maintain consistency in naming
- Document thoroughly

## Troubleshooting

### Compliance Score Seems Low
- Many checks evaluate completeness of documentation
- Add more entities (systems, processes, controls)
- Complete attributes on existing entities
- Establish relationships between entities

### Missing Attributes Not Showing
- Refresh page to ensure latest data
- Check if entity type is NIS2-required
- Look in EntityDetail page for full details

### Compliance Dashboard Empty
- Ensure entities exist in system
- Wait for analysis to complete
- Check browser console for errors

### Old Data Showing
- Data version system should auto-clear
- Manually clear via Settings → Reset Data
- Check localStorage in browser DevTools

## Future Enhancements

Possible additions:
- CSV/PDF export for reports
- Compliance trends over time
- Automated recommendations
- Integration with external tools
- Custom compliance frameworks
- Evidence attachment system
- Automatic evidence collection

## Support

For issues or questions:
1. Check browser console for errors
2. Verify data version is 3.0
3. Try Reset Data in Settings
4. Review this documentation

## References

- **ArchiMate 3.1 Specification**: https://pubs.opengroup.org/architecture/archimate3-doc/
- **NIS2 Directive**: Directive (EU) 2022/2555
- **Implementation Guide**: See IMPLEMENTATION_GUIDE.md

---

**Version**: 3.0  
**Date**: 2024  
**Author**: GitHub Copilot with Claude Sonnet 4.5

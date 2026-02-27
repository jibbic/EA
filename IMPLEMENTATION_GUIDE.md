# NIS 2 EA Framework - Implementeringsguide

## Översikt

Denna guide beskriver hur du implementerar NIS 2 EA Framework i din organisation, steg för steg.

## Fas 1: Förberedelser (Vecka 1-2)

### 1.1 Etablera Projektorganisation

**Nyckelroller**:
```yaml
project_organization:
  steering_committee:
    - CISO
    - CIO
    - Business representatives
    - Legal/Compliance
  
  project_team:
    project_manager: "Overall coordination"
    enterprise_architect: "Framework implementation"
    security_architect: "Security perspective"
    business_analyst: "Business perspective"
    technical_leads: "Technical documentation"
  
  working_groups:
    - Business Architecture Team
    - Application Architecture Team
    - Technology Architecture Team
    - Security Architecture Team
    - Data Architecture Team
```

**Kick-off Activities**:
- [ ] Nominera projektteam
- [ ] Genomför kick-off workshop
- [ ] Etablera projektplan och milestones
- [ ] Sätt upp dokumentationsrepository (SharePoint, Confluence, etc.)
- [ ] Definiera arbetssätt och möten

### 1.2 Gap Analysis

**Nulägesanalys**:
```yaml
gap_analysis:
  current_state_assessment:
    - question: "Finns komplett systemförteckning?"
      answers: [yes, partial, no]
      
    - question: "Finns dokumenterade kritikalitetsklassificeringar?"
      answers: [yes, partial, no]
      
    - question: "Finns dokumenterad riskbedömning?"
      answers: [yes, partial, no]
      
    - question: "Är säkerhetskontroller dokumenterade?"
      answers: [yes, partial, no]
      
    - question: "Finns dokumenterade Business Continuity Plans?"
      answers: [yes, partial, no]
```

**Output från Gap Analysis**:
- Lista över vad som saknas
- Prioriterad backlog
- Estimerad effort för att nå compliance

### 1.3 Verktygsval

**Alternativ för att implementera metamodellen**:

**Option 1: Spreadsheets (Enklast, minst struktur)**
- Excel/Google Sheets
- ✅ Lätt att komma igång
- ✅ Ingen kostnad
- ❌ Svårt att underhålla relationer
- ❌ Ingen automatik
- **Rekommenderas för**: Små organisationer (<50 system)

**Option 2: Dedicated EA Tool (Best practice)**
- Archi (gratis, open source)
- Sparx Enterprise Architect
- BiZZdesign
- Ardoq
- LeanIX
- ✅ Stödjer metamodeller
- ✅ Visuell modellering
- ✅ Rapportering
- ❌ Kostnad (utom Archi)
- ❌ Learning curve
- **Rekommenderas för**: Medelstora till stora organisationer

**Option 3: CMDB/ITSM Tool**
- ServiceNow
- Jira + Confluence
- ✅ Integration med IT operations
- ✅ Workflow support
- ❌ Mindre flexibel metamodell
- **Rekommenderas för**: Organisationer som redan har CMDB

**Option 4: Custom Database/Application**
- PostgreSQL + Custom web app
- ✅ Helt flexibel
- ❌ Hög development effort
- **Rekommenderas för**: Organisationer med dev resources

**Rekommendation**: Börja enkelt (Option 1-2), migrera till mer sofistikerade verktyg vid behov.

## Fas 2: Business Architecture (Vecka 3-4)

### 2.1 Identifiera Business Capabilities

**Workshop Agenda** (4 timmar):
```
09:00-09:30  Introduktion till business capabilities
09:30-11:00  Brainstorming - identifiera capabilities
11:00-12:00  Gruppera och strukturera capabilities
             Lunch
13:00-14:30  Prioritera och klassificera capabilities
14:30-15:00  Sammanfattning och nästa steg
```

**Deltagare**:
- Business leaders från alla enheter
- Enterprise Architect (facilitator)
- Business Analyst (dokumentation)

**Output**:
```yaml
# Exempel output
capabilities:
  - id: cap-001
    name: "Kundsupport"
    criticality: high
    owner: org-customer-service
    
  - id: cap-002
    name: "Orderhantering"
    criticality: critical
    owner: org-sales
```

### 2.2 Dokumentera Kritiska Processer

**Business Impact Analysis (BIA) Workshop** (1 dag per kritisk capability):

```yaml
bia_template:
  process_name: "Handle Customer Order"
  
  step1_impact_analysis:
    questions:
      - "Vad händer om processen är nere i 1 timme?"
      - "Vad händer om processen är nere i 4 timmar?"
      - "Vad händer om processen är nere i 1 dag?"
      - "Vad händer om processen är nere i 1 vecka?"
    
    impact_categories:
      financial: "Förlorad försäljning, böter, etc."
      regulatory: "Regelbrott, rapporteringskrav"
      reputational: "Förtroendeskada, negativ press"
      operational: "Stoppad verksamhet, manuellt arbete"
  
  step2_rto_rpo:
    recovery_time_objective: "4h"
    recovery_point_objective: "1h"
    justification: "Baserat på impact analysis"
  
  step3_dependencies:
    - system: app-order-system
      dependency_type: critical
    - system: app-inventory-system
      dependency_type: high
```

**Output**:
- Dokumenterade kritiska processer med RTO/RPO
- Business Impact Analysis rapport
- Process-till-system mappning

### 2.3 Organisationsstruktur och Roller

**Data Collection**:
- Importera från HR-system
- Komplettera med roller och ansvar

**Kritiska roller att dokumentera**:
- System Owners (alla kritiska system)
- System Custodians (alla system)
- CISO
- DPO (Data Protection Officer)
- Incident Response Team
- Business Continuity Manager

## Fas 3: Application Architecture (Vecka 5-8)

### 3.1 System Discovery

**Discovery-metoder**:

**Method 1: CMDB Export**
```powershell
# Om ni har CMDB (tex ServiceNow)
# Exportera alla Applications med attribut
# Import till ramverkets verktyg
```

**Method 2: Network Scanning**
```powershell
# Identifiera alla servrar och tjänster
# Nmap, Qualys, eller liknande
# Komplettera med manual verifikation
```

**Method 3: Workshops**
```yaml
workshop_per_department:
  duration: 2h
  participants:
    - Department head
    - IT representatives
    - Key users
  
  agenda:
    - Identifiera alla system som enheten använder
    - Prioritera systemens viktighet
    - Identifiera systemägare
```

### 3.2 System Documentation

**Prioriterad approach**:

**Iteration 1: High-level inventory (Alla system)**
```yaml
system_basic_info:
  required_fields:
    - id
    - name
    - system_type
    - owner
    - custodian
    - criticality (preliminary)
    - lifecycle_status
```

**Iteration 2: Detailed documentation (Kritiska system)**
- Använd full system-documentation template
- Fokus på system med criticality = critical eller high
- Genomför med systemägare och teknisk förvaltare

**Iteration 3: Complete documentation (Alla system)**
- Dokumentera även medium/low criticality
- Mindre detalj för low criticality

**Tidsestimering**:
- Basic info: 15 min per system
- Detailed documentation: 2-4 timmar per system
- Review och validering: 30 min per system

### 3.3 Dependencies Mapping

**Dependency Workshop** (per kritiskt system):
```yaml
dependency_workshop:
  duration: 1h per system
  participants:
    - System Owner
    - System Custodian
    - Enterprise Architect
  
  activities:
    - Identifiera uppströms beroenden (vad systemet beror på)
    - Identifiera nedströms beroenden (vad som beror på systemet)
    - Klassificera beroendetyp (critical/high/medium/low)
    - Dokumentera failure scenarios
```

## Fas 4: Technology Architecture (Vecka 9-10)

### 4.1 Infrastructure Inventory

**Automated Discovery**:
```powershell
# Cloud inventory (AWS exempel)
aws ec2 describe-instances --region eu-north-1 --output json

# On-premise (om ni har CMDB)
# Exportera alla servers/infrastructure
```

**Manual Inventory**:
```yaml
inventory_spreadsheet:
  columns:
    - Server Name
    - Type (Physical/VM/Container)
    - OS
    - OS Version
    - Location
    - Hosted Applications
    - Last Patched
    - Criticality
```

### 4.2 Network Documentation

**Network Diagram Creation**:
- Använd verktyg som Draw.io, Visio, Lucidchart
- Dokumentera alla nätverk och säkerhetszoner
- Identifiera firewalls och säkerhetskontroller

**Network Segmentation Verification**:
```yaml
segmentation_checklist:
  - [ ] DMZ finns och är skyddad av firewall
  - [ ] Produktionsnätverk separerat från management
  - [ ] Database-nätverk har begränsad åtkomst
  - [ ] External-to-internal traffic går genom firewall
  - [ ] Firewall-regler är dokumenterade
```

### 4.3 Patch Management Status

**Patch Assessment**:
```powershell
# Samla in patch status för alla servrar
# Identifiera overdue patches
# Skapa remediation plan
```

## Fas 5: Security Architecture (Vecka 11-14)

### 5.1 Security Control Inventory

**Control Identification Workshop**:
```yaml
control_inventory_workshop:
  duration: 1 day
  participants:
    - CISO
    - Security Team
    - IT Operations
    - Network Team
  
  method:
    - Gå igenom NIS 2 Artikel 21.2 krav
    - För varje krav, identifiera implementerade kontroller
    - Dokumentera kontrollerna i metamodellen
    - Identifiera gaps
```

**Mandatory Controls (NIS 2)**:
```yaml
nis2_control_checklist:
  article_21_2_a_incident_management:
    - [ ] Incident Response Plan
    - [ ] SIEM / Log Management
    - [ ] Incident Response Team
  
  article_21_2_b_business_continuity:
    - [ ] Backup (daily)
    - [ ] DR Plan
    - [ ] BCP tested
  
  article_21_2_c_supply_chain:
    - [ ] Supplier assessments
    - [ ] Supplier contracts with security clauses
  
  # ... (fortsätt för alla krav)
```

### 5.2 Risk Assessment

**Risk Assessment Process**:

**Step 1: Asset Identification** (Redan gjort i tidigare faser)

**Step 2: Threat Identification**
```yaml
threat_identification_workshop:
  method: "Brainstorming + Threat Intelligence"
  
  common_threats:
    - Ransomware
    - Phishing
    - DDoS
    - Insider Threat
    - Supply Chain Attack
    - Physical Security Breach
    - Data Breach
    - Malware
```

**Step 3: Vulnerability Assessment**
```yaml
vulnerability_sources:
  - Automated vulnerability scans (Nessus, Qualys, etc.)
  - Penetration test results
  - Security audits
  - CVE databases
  - Vendor security advisories
```

**Step 4: Risk Calculation**
```yaml
risk_calculation:
  risk_score = impact × likelihood
  
  impact_scale:
    critical: 5
    high: 4
    medium: 3
    low: 2
    very_low: 1
  
  likelihood_scale:
    very_high: 5
    high: 4
    medium: 3
    low: 2
    very_low: 1
  
  risk_matrix:
    critical_risk: score >= 16
    high_risk: score 10-15
    medium_risk: score 5-9
    low_risk: score <= 4
```

**Step 5: Risk Treatment**
- För varje high/critical risk: Definiera mitigation plan
- Assign owner och deadline
- Track till closure

### 5.3 Incident Response Readiness

**Incident Response Plan**:
```yaml
incident_response_plan_template:
  
  1_preparation:
    - Incident Response Team established
    - Roles and responsibilities defined
    - Contact lists maintained
    - Tools and access prepared
  
  2_detection_and_analysis:
    - Monitoring tools configured
    - Alerting rules defined
    - Incident classification criteria
  
  3_containment:
    - Containment procedures per incident type
    - Isolation procedures
  
  4_eradication:
    - Root cause analysis
    - Remove threat
  
  5_recovery:
    - Restore from backup
    - Verify system integrity
  
  6_post_incident:
    - Lessons learned
    - Update procedures
    - Report to management
```

**NIS 2 Incident Reporting Process**:
```yaml
nis2_incident_reporting:
  
  step1_incident_detection:
    timeframe: "Immediate"
    responsible: "SOC / Monitoring team"
  
  step2_classification:
    timeframe: "Within 1 hour"
    responsible: "Incident Response Manager"
    classify_as:
      - Significant: Report to authority
      - Non-significant: Internal only
  
  step3_early_warning:
    timeframe: "Within 24 hours"
    responsible: "CISO"
    recipient: "National CERT / Supervisory Authority"
    content: "High-level incident information"
  
  step4_incident_notification:
    timeframe: "Within 72 hours"
    responsible: "CISO"
    content: "Detailed incident report"
  
  step5_final_report:
    timeframe: "Within 1 month"
    responsible: "CISO"
    content: "Complete analysis and lessons learned"
```

## Fas 6: Data Architecture (Vecka 15-16)

### 6.1 Data Inventory

**Data Discovery Workshop**:
```yaml
data_discovery_workshop:
  per_system: true
  participants:
    - System Owner
    - Data Protection Officer
    - Enterprise Architect
  
  questions:
    - "Vilka typeer av data hanteras?"
    - "Finns personuppgifter?"
    - "Finns känsliga personuppgifter (GDPR Art 9)?"
    - "Vad är dataklassificeringsnivå?"
    - "Vad är legal basis (GDPR)?"
    - "Hur länge sparas data?"
```

### 6.2 Data Flow Mapping

**Data Flow Workshop** (per kritiskt system):
```yaml
data_flow_mapping:
  method: "Whiteboard session"
  
  steps:
    1: "Rita systemet i mitten"
    2: "Identifiera alla inkommande dataflöden"
    3: "Identifiera alla utgående dataflöden"
    4: "För varje flöde, dokumentera:"
       - Dataobjekt
       - Encryption
       - Authentication
       - Trust boundary crossing
```

### 6.3 GDPR Compliance Check

**GDPR Data Processing Register** (Art 30):
```yaml
gdpr_article_30_register:
  
  for_each_processing_activity:
    - Processing activity name
    - Purpose
    - Legal basis
    - Data categories
    - Data subjects
    - Recipients
    - Third country transfers (if any)
    - Retention period
    - Security measures
```

## Fas 7: Integration och Validering (Vecka 17-18)

### 7.1 Cross-perspective Validation

**Validation Workshop**:
```yaml
validation_activities:
  
  business_to_application:
    verify: "All critical processes have supporting systems"
    
  application_to_technology:
    verify: "All systems have documented infrastructure"
    
  security_to_all:
    verify: "All critical assets have security controls"
    
  data_to_all:
    verify: "All personal data flows documented"
```

### 7.2 Completeness Check

**Checklist per Perspective**:
```yaml
completeness_check:
  
  business:
    - [ ] All business capabilities documented
    - [ ] All critical processes with RTO/RPO
    - [ ] All organizational units documented
    - [ ] All key roles assigned
  
  application:
    - [ ] All systems inventoried
    - [ ] Criticality set for all systems
    - [ ] Owners assigned for all systems
    - [ ] Dependencies mapped for critical systems
  
  technology:
    - [ ] All infrastructure inventoried
    - [ ] Patch status tracked
    - [ ] Network segmentation documented
  
  security:
    - [ ] Security controls documented
    - [ ] Risk assessment completed
    - [ ] Incident response plan exists
  
  data:
    - [ ] Data objects classified
    - [ ] Critical data flows documented
    - [ ] GDPR register complete
```

### 7.3 NIS 2 Compliance Mapping

**Compliance Matrix**:
```yaml
nis2_compliance_matrix:
  
  for_each_requirement:
    requirement_id: "NIS2-21.2.a"
    requirement_text: "Incident handling"
    
    mapped_entities:
      - SecurityControl: ctrl-siem-01
      - Policy: policy-incident-response
      - Process: proc-incident-handling
    
    evidence:
      - "Incident Response Plan v2.1"
      - "SIEM configured and monitored 24/7"
      - "Incident log with 2025-2026 incidents"
    
    status: compliant
    gap_if_any: null
    remediation_plan_if_gap: null
```

## Fas 8: Rapportering och Governance (Vecka 19-20)

### 8.1 Management Dashboards

**Rapporter att skapa**:

1. **Executive Summary**
   - NIS 2 compliance status (% compliant)
   - Top risks
   - Critical systems status
   - Recent incidents

2. **System Portfolio Overview**
   - Total systems: X
   - Critical: Y
   - High: Z
   - Patch status overview

3. **Security Posture**
   - Security controls coverage
   - Vulnerability status
   - Incident trends

4. **Data Protection Status**
   - GDPR compliance
   - Data classification status
   - Personal data inventory

### 8.2 Ongoing Governance

**Governance Process**:
```yaml
governance_processes:
  
  monthly_review:
    meeting: "EA Review Board"
    participants:
      - Enterprise Architect
      - Security Architect
      - Representatives from IT Operations
    
    agenda:
      - Review new/changed systems
      - Update criticality assessments
      - Review security control effectiveness
      - Track remediation plans
  
  quarterly_assessment:
    meeting: "Risk & Compliance Committee"
    participants:
      - CISO
      - CIO
      - Business representatives
      - Compliance Officer
    
    agenda:
      - Quarterly risk assessment review
      - Compliance status review
      - Approve major changes
      - Budget for security improvements
  
  annual_activities:
    - Comprehensive risk assessment
    - Full compliance audit
    - BCP/DR tests for all critical systems
    - Security control effectiveness testing
```

### 8.3 Continuous Improvement

**Improvement Backlog**:
```yaml
continuous_improvement:
  
  track_metrics:
    - "Time to document new system"
    - "% systems with complete documentation"
    - "% NIS 2 compliance"
    - "Number of open security findings"
  
  improvement_areas:
    automation:
      - Automate system discovery (integration with CMDB)
      - Automate compliance reporting
      - Automate patch status tracking
    
    quality:
      - Improve documentation templates
      - Training for system owners
      - Quality assurance process
```

## Framgångsfaktorer

### Kritiska Framgångsfaktorer

1. **Management Support** ✅
   - CISO och CIO måste stödja initiativet
   - Budget och resurser

2. **Cross-functional Team** ✅
   - Inkludera business, IT, security
   - Dedikerad tid för teamet

3. **Realistisk Tidsplan** ✅
   - Räkna med 4-6 månader för första versionen
   - Iterativ approach

4. **Verktyg som Stödjer Processen** ✅
   - Välj rätt verktyg för er organisation
   - Integration med befintliga verktyg

5. **Tydligt Ansvar** ✅
   - Enterprise Architect äger ramverket
   - System Owners ansvariga för sin dokumentation

6. **Kontinuerlig Förbättring** ✅
   - Governance-process etablerad
   - Regelbunden review

## Vanliga Fallgropar

### Undvik Dessa Misstag

❌ **"Boil the ocean"**: Försöka dokumentera allt perfekt från dag 1
✅ **Gör så**: Iterativ approach, börja med kritiska system

❌ **Dokumentation för dokumentationens skull**: Ingen använder det
✅ **Gör så**: Fokusera på vad som behövs för compliance och beslutsstöd

❌ **För komplext**: Metamodell med 200 entiteter
✅ **Gör så**: Använd denna metamodell (lagom komplex)

❌ **Ingen governance**: Dokumentation blir inaktuell
✅ **Gör så**: Etablera governance-process från dag 1

❌ **Bara IT-perspektiv**: Glöm business
✅ **Gör så**: Business-driven approach, IT följer business

## Sammanfattning - Din 20-veckors Plan

| Vecka | Fas | Aktivitet |
|-------|-----|-----------|
| 1-2 | Förberedelse | Projektorganisation, Gap analysis, Verktygsval |
| 3-4 | Business | Capabilities, Processer, BIA, Roller |
| 5-8 | Application | System discovery, Documentation, Dependencies |
| 9-10 | Technology | Infrastructure inventory, Network, Patch status |
| 11-14 | Security | Controls, Risk assessment, Incident response |
| 15-16 | Data | Data inventory, Data flows, GDPR |
| 17-18 | Integration | Cross-validation, Completeness, NIS 2 mapping |
| 19-20 | Rapportering | Dashboards, Governance, Continuous improvement |

**Lycka till med implementeringen!**

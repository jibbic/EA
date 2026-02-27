# NIS 2 EA Framework - Filöversikt

Detta dokument listar alla filer i ramverket och deras syfte.

## Rotfiler

### README.md
**Syfte**: Huvuddokumentation och översikt av ramverket  
**Målgrupp**: Alla användare  
**Innehåll**:
- Ramverkets syfte och struktur
- NIS 2 kärnkrav
- Snabb start-guide
- Perspektiv och struktur
- Mappning till etablerade EA-ramverk

### IMPLEMENTATION_GUIDE.md
**Syfte**: Steg-för-steg guide för att implementera ramverket  
**Målgrupp**: Projektledare, EA-team som ska implementera  
**Innehåll**:
- 20-veckors implementeringsplan
- Fas-för-fas instruktioner
- Workshops och aktiviteter
- Verktygsval och rekommendationer
- Framgångsfaktorer och fallgropar

### VISUALIZATION_GUIDE.md
**Syfte**: Guide för att visualisera metamodellen och data  
**Målgrupp**: EA-team, tekniska teams  
**Innehåll**:
- Verktygsrekommendationer (Archi, Mermaid, Draw.io, etc.)
- Exempel på olika diagram-typer
- ArchiMate-mappning
- Dashboard-templates
- Best practices för visualisering

### QUICK_REFERENCE.md
**Syfte**: Snabbreferens för metamodellen och NIS 2-krav  
**Målgrupp**: Alla användare som behöver snabb uppslagsinfo  
**Innehåll**:
- Översikt av alla entiteter i metamodellen
- NIS 2 compliance checklista
- Kritikalitets- och dataklassificering
- Snabb implementeringsplan
- Vanliga frågor

## /metamodel/

### core-metamodel.yaml
**Syfte**: Kärnmetamodell med alla entiteter, attribut och relationer  
**Målgrupp**: EA-team, utvecklare av verktyg  
**Innehåll**:
- Definitionen av hela metamodellen i YAML-format
- Alla entiteter i alla lager (Business, Application, Technology, Security, Data, Governance)
- Attribut för varje entitet
- Relationstyper mellan entiteter
- NIS 2-relevans förklarad för varje entitet

**Användning**: Detta är "source of truth" för metamodellen. Kan användas för:
- Implementera i EA-verktyg
- Generera databas-schema
- Validera dokumentation
- Tool integration

### nis2-mappings.yaml
**Syfte**: Detaljerad mappning mellan metamodellens entiteter och NIS 2-direktiv  
**Målgrupp**: Compliance-team, Auditorer, Projektledare  
**Innehåll**:
- Artikel 21 (Cybersäkerhetsriskhanteringsåtgärder) - alla delkrav
- Artikel 23 (Incidentrapportering) - rapporteringskrav
- Mappning av varje krav till metamodell-entiteter
- Evidence-krav för varje compliance-requirement
- Compliance maturity model
- Minimal compliance checklist

**Användning**:
- Förstå vilka entiteter som behövs för varje NIS 2-krav
- Identifiera compliance-gaps
- Planera audit-förberedelser
- Generera compliance-rapporter

### relationships.yaml (implicit i core-metamodel.yaml)
**Sökte**: Alla relationstyper mellan entiteter  
**Innehåll**: Definierat i sektionen "relationships" i core-metamodel.yaml
- supports, depends_on, implements, hosted_on
- protects, mitigates, threatens, affects
- stores, processes, owns, complies_with

## /perspectives/

### business-architecture.md
**Syfte**: Detaljerad guide för Business Architecture-perspektivet  
**Målgrupp**: Business Analysts, Enterprise Architects, Processägare  
**Innehåll**:
- Business Capabilities
- Business Processes (inkl. RTO/RPO)
- Organizational Units och Persons/Roles
- Business Impact Analysis (BIA)
- Business Continuity Planning
- Dokumentationsflow och checklistor

**När användas**: När du ska dokumentera verksamhetsperspektivet

### application-architecture.md
**Syfte**: Detaljerad guide för Application Architecture-perspektivet  
**Målgrupp**: Solution Architects, System Owners, IT-ledning  
**Innehåll**:
- Application Systems
- Application Components
- Application Interfaces
- Application Portfolio Management
- Application Lifecycle (inkl. SSDLC)
- Dependencies och SPOF-analys
- Security by Design
- Checklistor för systemdokumentation

**När användas**: När du ska inventera och dokumentera IT-system

### technology-architecture.md
**Syfte**: Detaljerad guide för Technology Architecture-perspektivet  
**Målgrupp**: Infrastructure Architects, IT Operations, Network team  
**Innehåll**:
- Infrastructure Nodes (servers, VMs, containers)
- Networks och nätverkssegmentering
- Technology Platforms (OS, databaser, middleware)
- Locations (datacenter, cloud regions)
- Patch Management
- Cloud Architecture (IaaS/PaaS/SaaS)
- Infrastructure as Code
- Checklistor

**När användas**: När du ska dokumentera infrastruktur och plattformar

### security-architecture.md
**Syfte**: Detaljerad guide för Security Architecture-perspektivet  
**Målgrupp**: Security Architects, CISO, Security Team, SOC  
**Innehåll**:
- Security Controls (alla NIS 2-kontroller)
- Threat Scenarios
- Vulnerabilities och sårbarhetshantering
- Security Incidents och incidenthantering
- Risk Assessments
- Compliance Requirements
- Security Frameworks (NIST CSF, ISO 27001, CIS, MITRE ATT&CK)
- Defense in Depth
- Security Monitoring (SIEM, IDS/IPS, EDR)
- Security Metrics
- Omfattande checklistor

**När användas**: När du ska dokumentera säkerhet, genomföra riskbedömning, eller förbereda för audit

### data-architecture.md
**Syfte**: Detaljerad guide för Data Architecture-perspektivet  
**Målgrupp**: Data Architects, DPO, Database Administrators  
**Innehåll**:
- Data Objects (inkl. GDPR-klassificering)
- Data Stores (databaser, filsystem, cloud storage)
- Data Flows (inkl. trust boundaries)
- Encryption Strategy (at rest, in transit)
- Data Loss Prevention (DLP)
- Backup & Recovery Strategy
- Data Governance (ownership, retention, deletion)
- GDPR Data Mapping (Art. 30 register)
- Checklistor

**När användas**: När du ska dokumentera data, dataflöden, eller GDPR-compliance

## /templates/

### system-documentation.yaml
**Syfte**: Fullständig mall för att dokumentera ett IT-system  
**Målgrupp**: System Owners, System Custodians, EA-team  
**Innehåll**: En omfattande YAML-template med alla sektioner och attribut för systemdokumentation:
- Basic Info
- Classification (criticality, RTO/RPO)
- Ownership
- Business Context
- Technical Architecture
- Security
- Data
- Operations (backup, patch, monitoring)
- Vendors
- Compliance
- Incident History
- Business Continuity
- Documentation links
- Metadata

**Användning**:
- Kopiera template
- Byt ut placeholder-värden med faktisk data
- Dokumentera system enligt strukturen
- Review med systemägare

### component-documentation.yaml (implicit i system-documentation.yaml)
**Komponent**: Finns som del av system-documentation under "components"  
**Användning**: För att dokumentera komponenter inom ett system (frontend, backend, databas, etc.)

### risk-assessment.yaml (implicit i nis2-mappings.yaml)
**Template**: Finns som exempel under RiskAssessment i mappings  
**Användning**: För att dokumentera riskbedömningar

## /examples/

### sample-system.yaml
**Syfte**: Fullständigt realistiskt exempel på ett dokumenterat system  
**Målgrupp**: Alla som ska dokumentera system  
**Innehåll**: Komplett dokumentation av "Customer Self-Service Portal" som exempel:
- Alla sektioner ifyllda med realistiska värden
- Visar hur kritikalitet sätts
- Visar hur beroenden dokumenteras
- Visar hur säkerhet dokumenteras
- Visar hur compliance mappas
- Visar hur incident history dokumenteras
- Visar hur BCP/DR planer refereras

**Användning**:
- Använd som referens när du dokumenterar egna system
- Se vad "fullständig dokumentation" innebär
- Förstå detaljeringsnivån som förväntas för kritiska system

## Fil-dependencies

```
README.md
  ↓ references
  ├── metamodel/core-metamodel.yaml
  ├── metamodel/nis2-mappings.yaml
  └── perspectives/*.md

IMPLEMENTATION_GUIDE.md
  ↓ references
  ├── perspectives/*.md (för varje fas)
  ├── templates/system-documentation.yaml
  └── VISUALIZATION_GUIDE.md

perspectives/*.md
  ↓ references
  ├── metamodel/core-metamodel.yaml (för entiteter)
  ├── metamodel/nis2-mappings.yaml (för compliance)
  └── templates/system-documentation.yaml

examples/sample-system.yaml
  ↓ implements
  └── templates/system-documentation.yaml
```

## Hur använda ramverket

### För första gången användare:

1. **Börja med**: [README.md](README.md)
   - Förstå ramverkets syfte och struktur

2. **Läs**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
   - Få en snabb översikt av metamodellen och NIS 2-krav

3. **Planera implementering**: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
   - Följ 20-veckors planen

4. **Djupdykningar**: [perspectives/](perspectives/)
   - Läs relevant perspektiv när du arbetar med det området

5. **Dokumentera system**: [templates/system-documentation.yaml](templates/system-documentation.yaml)
   - Använd template + [examples/sample-system.yaml](examples/sample-system.yaml) som referens

### För olika roller:

**Enterprise Architect**:
- README.md → IMPLEMENTATION_GUIDE.md → core-metamodel.yaml → Alla perspectives

**CISO / Security Lead**:
- README.md → security-architecture.md → nis2-mappings.yaml

**System Owner**:
- QUICK_REFERENCE.md → business-architecture.md → application-architecture.md → system-documentation.yaml (template)

**Compliance Officer**:
- README.md → nis2-mappings.yaml → QUICK_REFERENCE.md (compliance checklist)

**Project Manager**:
- README.md → IMPLEMENTATION_GUIDE.md → QUICK_REFERENCE.md

**Infrastructure Team**:
- technology-architecture.md → system-documentation.yaml (infrastructure sections)

**Data Protection Officer (DPO)**:
- data-architecture.md → nis2-mappings.yaml (GDPR sections)

## Filstorlekar och komplexitet

| Fil | Storlek | Komplexitet | Tid att läsa |
|-----|---------|-------------|--------------|
| README.md | Medium | Låg | 15 min |
| QUICK_REFERENCE.md | Liten | Låg | 10 min |
| IMPLEMENTATION_GUIDE.md | Stor | Medium | 45 min |
| VISUALIZATION_GUIDE.md | Medium | Medium | 30 min |
| core-metamodel.yaml | Mycket stor | Hög | 60 min (referens) |
| nis2-mappings.yaml | Stor | Medium | 45 min |
| business-architecture.md | Stor | Medium | 40 min |
| application-architecture.md | Stor | Medium | 45 min |
| technology-architecture.md | Stor | Medium | 40 min |
| security-architecture.md | Mycket stor | Hög | 60 min |
| data-architecture.md | Stor | Medium | 50 min |
| system-documentation.yaml | Stor | Medium | 20 min (template) |
| sample-system.yaml | Mycket stor | Medium | 30 min |

**Total lästid för hela ramverket**: ~7-8 timmar

**Rekommenderad approach**: Läs inte allt på en gång. Börja med README + QUICK_REFERENCE (25 min), sedan djupdyk i relevanta delar när du behöver dem.

## Versionshantering

**Nuvarande version**: 1.0  
**Release date**: 2026-02-26  
**Nästa planerade review**: 2026-08-26

**Ändringslogg**:
- 2026-02-26: Version 1.0 - Initial release

**Förslag på förbättringar**:
Skicka förslag till ramverkets ägare (Enterprise Architecture team).

---

**Lycka till med NIS 2-implementeringen!**

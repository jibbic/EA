# Application Architecture Perspektiv

## Översikt

Application Architecture-perspektivet beskriver organisationens IT-system, applikationer och deras inbördes relationer. Detta är det mest synliga skiktet för verksamheten.

## Syfte inom NIS 2-kontext

- Inventering av alla IT-system som hanterar eller stödjer kritiska funktioner
- Dokumentation av systemberoenden för att förstå påverkan vid avbrott
- Identifiering och klassificering av kritiska system
- Grund för säkerhetsåtgärder och kontroller

## Huvudkomponenter

### 1. Application System

**Definition**: Ett komplett IT-system eller applikation som levererar funktionalitet.

**Systemtyper**:
- **Business Application**: System som direkt stödjer affärsprocesser (ERP, CRM, etc.)
- **Infrastructure Service**: System för IT-drift (Active Directory, DNS, monitoring)
- **Integration Platform**: Integrationslösningar (ESB, API Gateway, message queue)
- **Database**: Databassystem
- **Other**: Övriga systemtyper

**Kritiska attribut för NIS 2**:

```yaml
id: app-001
name: "Customer Portal"
description: "Web portal för kunder att hantera sina ärenden"

# Systemtyp och status
system_type: business_application
lifecycle_status: production
version: "3.2.1"
deployment_date: "2024-06-15"

# Kritikalitet (från BIA)
criticality: critical  # Baserat på Business Impact Analysis
data_classification: confidential

# Ägande och ansvar
owner: org-unit-customer-service  # Affärsmässig ägare
custodian: person-it-manager       # Teknisk förvaltare
vendor: supplier-software-vendor   # Extern leverantör (om relevant)

# Säkerhet
last_security_review: "2026-01-10"
contains_personal_data: true
```

**Kritikalitetsklassificering**:
- **Critical**: RTO < 4h, påverkar kritiska affärsprocesser direkt
- **High**: RTO 4-24h, viktigt för verksamheten
- **Medium**: RTO 24-72h, stödjer verksamhet
- **Low**: RTO > 72h, minimal påverkan

### 2. Application Component

**Definition**: En del av ett applikationssystem med specifik funktion.

**Komponenttyper**:
- Frontend (användargrän ssnitt)
- Backend (affärslogik)
- API (programmeringsgränssnitt)
- Microservice (självständig mikrotjänst)
- Database (datalagring)
- Queue (meddelandekö)
- Cache (cachning)

**Varför dokumentera komponenter?**

För kritiska system (critical/high) är det viktigt att förstå inre struktur för:
- **Incident response**: Veta vilken komponent som påverkas
- **Security patching**: Identifiera sårbara komponenter
- **Architecture reviews**: Förstå systemets komplexitet

**Exempel**:
```yaml
# Frontend Component
id: comp-001
name: "Customer Portal Web UI"
description: "React-baserat användargränssnitt"
parent_system: app-001
component_type: frontend
technology_stack:
  - "React 18"
  - "TypeScript"
  - "Material-UI"
criticality: high
hosted_on: infra-web-cluster-01

# Backend Component
id: comp-002
name: "Customer Portal API"
description: "REST API för kundportal"
parent_system: app-001
component_type: backend
technology_stack:
  - "Java 17"
  - "Spring Boot 3"
  - "PostgreSQL driver"
criticality: critical
hosted_on: infra-app-cluster-01
```

### 3. Application Interface

**Definition**: Ett gränssnitt mellan två system eller komponenter.

**Gränssnittstyper**:
- **API**: REST, SOAP, GraphQL
- **File Transfer**: SFTP, FTP, shared folders
- **Database**: Direkta databasanslutningar
- **Message Queue**: Kafka, RabbitMQ, Azure Service Bus
- **Email**: Email-baserad integration
- **Other**: Övriga typer

**Kritiska säkerhetsattribut**:

```yaml
id: if-001
name: "Customer Portal to CRM Integration"
description: "Synkroniserar kunddata mellan portal och CRM"

# Källa och mål
source: app-customer-portal
target: app-crm-system

# Tekniska detaljer
interface_type: api
protocol: "REST over HTTPS"
data_format: "JSON"

# Säkerhet - KRITISKT för NIS 2!
authentication_method: "OAuth 2.0 Client Credentials"
encryption: true  # Kryptering i transit
data_classification: confidential

# Dataflöde
direction: bidirectional  # eller: source_to_target, target_to_source
frequency: "Real-time"
data_volume: "~1000 transactions/hour"
```

**Varför är gränssnitt kritiska för NIS 2?**
- **Attack surface**: Externa gränssnitt är attackytor
- **Data leakage risk**: Data flödar mellan system
- **Authentication weaknesses**: Svag autentisering = sårbarhet
- **Trust boundaries**: Data korsar säkerhetszoner

**Trust Boundary Analysis**:
```yaml
interface: if-web-to-api
crosses_trust_boundary: true
source_security_zone: internet
target_security_zone: dmz
security_controls:
  - "WAF (Web Application Firewall)"
  - "API rate limiting"
  - "OAuth 2.0 authentication"
  - "TLS 1.3 encryption"
```

## Application Portfolio Management

### Application Inventory

**Minimikrav för NIS 2**: Komplett inventering av alla system.

**Inventeringsprocess**:
1. **Discovery**: Identifiera alla system
   - Workshops med IT och verksamhet
   - Nätverksskanning
   - CMDB (Configuration Management Database)
   - Asset management tools

2. **Documentation**: Dokumentera varje system
   - Använd system-documentation template
   - Fyll i alla obligatoriska fält
   - För kritiska system: Detaljerad dokumentation

3. **Classification**: Klassificera kritikalitet
   - Genomför Business Impact Analysis
   - Sätt kritikalitet baserat på RTO/RPO
   - Validera med verksamhetsägare

4. **Maintenance**: Håll inventeringen uppdaterad
   - Review varje kvartal
   - Automatisk discovery där möjligt
   - Change management process

### Application Lifecycle

**Livscykelstadier**:
1. **Planning**: System planeras
2. **Development**: Under utveckling
3. **Production**: I drift
4. **Maintenance**: Underhållsläge (inget nyutveckling)
5. **Retirement**: Ska avvecklas

**NIS 2-perspektiv på lifecycle**:

| Stadium | Säkerhetskrav |
|---------|---------------|
| Planning | Security requirements definition, Threat modeling |
| Development | Secure coding, Code review, Security testing |
| Production | Monitoring, Patching, Incident response |
| Maintenance | Security updates, Vulnerability management |
| Retirement | Secure decommissioning, Data deletion |

**Secure Development Lifecycle (SSDLC)**:
```yaml
application: app-new-system
lifecycle_status: development

security_activities:
  requirements_phase:
    - threat_modeling_completed: true
    - security_requirements_defined: true
    - privacy_impact_assessment: true
  
  design_phase:
    - security_architecture_review: true
    - authentication_design: "OAuth 2.0 + MFA"
    - encryption_design: "TLS 1.3, AES-256"
  
  implementation_phase:
    - secure_coding_standards: "OWASP Top 10"
    - code_review: "peer review + automated SAST"
    - dependency_scanning: "daily"
  
  testing_phase:
    - security_testing: "DAST + penetration testing"
    - vulnerability_assessment: "before production"
  
  deployment_phase:
    - security_hardening: true
    - security_monitoring: "integrated with SIEM"
```

## Application Dependencies

### Dependency Mapping

**Varför är beroenden kritiska?**
- **Cascade failures**: Ett system faller, andra påverkas
- **Business continuity**: Förstå påverkan vid avbrott
- **Risk management**: Beroenden = risker

**Beroendetyper**:
```yaml
system: app-customer-portal

depends_on:
  # Kritiskt beroende - om detta faller, kan inte portalen fungera
  - system_id: app-authentication-service
    dependency_type: critical
    failure_impact: "Complete service outage"
  
  # Högt beroende - påverkar huvudfunktionalitet
  - system_id: app-crm
    dependency_type: high
    failure_impact: "Cannot create/update customer data"
  
  # Medium beroende - påverkar viss funktionalitet
  - system_id: app-payment-gateway
    dependency_type: medium
    failure_impact: "Cannot process payments"
  
  # Lågt beroende - minimal påverkan
  - system_id: app-analytics
    dependency_type: low
    failure_impact: "No analytics data collected"
```

**Dependency Graph**:
```
Business Process: "Handle Customer Order"
         ↓
    [Customer Portal]
         ↓
    ├── [Authentication Service] (critical)
    ├── [CRM System] (high)
    ├── [Inventory System] (high)
    ├── [Payment Gateway] (medium)
    └── [Email Service] (medium)
         ↓
    ├── [Database Cluster] (critical)
    ├── [Active Directory] (critical)
    └── [Network Infrastructure] (critical)
```

### Single Points of Failure (SPOF)

**SPOF Analysis**:
```yaml
system: app-customer-portal

single_points_of_failure:
  - component: "Authentication Service"
    impact: "Complete outage"
    mitigation: "Deploy redundant auth service"
    mitigation_status: planned
    target_date: "2026-06-01"
  
  - component: "Primary Database"
    impact: "Data unavailable"
    mitigation: "Database clustering with failover"
    mitigation_status: implemented
    last_test: "2026-01-15"
```

## Integration Patterns

### Common Integration Patterns

1. **Synchronous API**:
```yaml
pattern: synchronous_api
protocol: REST
pros:
  - "Real-time response"
  - "Simple to implement"
cons:
  - "Tight coupling"
  - "Availability dependency"
security_considerations:
  - "Authentication on every call"
  - "Rate limiting required"
  - "Timeout handling"
```

2. **Asynchronous Messaging**:
```yaml
pattern: async_messaging
protocol: Message Queue (Kafka)
pros:
  - "Loose coupling"
  - "Better resilience"
cons:
  - "Eventual consistency"
  - "More complex"
security_considerations:
  - "Message encryption"
  - "Access control to topics"
  - "Message integrity"
```

3. **File-based Integration**:
```yaml
pattern: file_transfer
protocol: SFTP
pros:
  - "Large data volumes"
  - "Simple technology"
cons:
  - "Batch processing only"
  - "Latency"
security_considerations:
  - "File encryption"
  - "Secure transfer (SFTP)"
  - "Access control"
  - "Audit logging"
```

## Application Security

### Security by Design

**Obligatoriska säkerhetsaspekter** (NIS 2 Artikel 21.2):

1. **Authentication & Authorization**:
```yaml
application: app-customer-portal

authentication:
  method: "OAuth 2.0"
  identity_provider: "Azure AD"
  mfa_required: true
  mfa_type: "TOTP or Push notification"
  session_timeout: "30 minutes"
  
authorization:
  model: "RBAC"
  roles:
    - name: "Customer"
      permissions: ["read_own_data", "update_own_profile"]
    - name: "Support Agent"
      permissions: ["read_customer_data", "create_ticket"]
    - name: "Admin"
      permissions: ["all"]
```

2. **Data Protection**:
```yaml
data_protection:
  encryption_at_rest:
    enabled: true
    algorithm: "AES-256"
    key_management: "Azure Key Vault"
  
  encryption_in_transit:
    enabled: true
    protocol: "TLS 1.3"
    certificate_provider: "DigiCert"
  
  data_masking:
    pii_masked_in_logs: true
    pii_masked_in_ui: true  # for support agents
```

3. **Input Validation**:
```yaml
input_validation:
  sql_injection_protection: "Parameterized queries"
  xss_protection: "Output encoding"
  csrf_protection: "Anti-CSRF tokens"
  file_upload_validation: "Type and size limits"
```

4. **Logging & Monitoring**:
```yaml
logging:
  security_events_logged: true
  logged_events:
    - "Authentication attempts"
    - "Authorization failures"
    - "Data access"
    - "Configuration changes"
  log_retention: "1 year"
  log_destination: "SIEM (Splunk)"
```

## Checklista - Application Architecture för NIS 2

### Grundläggande (Alla System)
- [ ] Alla applikationssystem inventerade
- [ ] System-ID tilldelat varje system
- [ ] Namn och beskrivning dokumenterad
- [ ] Systemtyp klassificerad
- [ ] Lifecycle-status dokumenterad
- [ ] Affärsmässig ägare tilldelad
- [ ] Teknisk förvaltare tilldelad
- [ ] Version dokumenterad

### Kritikalitet och Klassificering
- [ ] Kritikalitet satt baserat på BIA
- [ ] Dataklassificering dokumenterad
- [ ] Personuppgifter identifierade (GDPR)
- [ ] RTO/RPO dokumenterat för kritiska system
- [ ] Business impact dokumenterat

### Teknisk Dokumentation
- [ ] Teknisk arkitektur dokumenterad
- [ ] Komponenter dokumenterade (för kritiska system)
- [ ] Hosting-miljö dokumenterad (on-prem/cloud)
- [ ] Teknologiplattformar dokumenterade
- [ ] Gränssnitt till andra system dokumenterade

### Säkerhet
- [ ] Senaste säkerhetsgenomgång dokumenterad
- [ ] Autentiseringsmetod dokumenterad
- [ ] MFA-status dokumenterad (för kritiska system)
- [ ] Kryptering dokumenterad (at rest & in transit)
- [ ] Säkerhetskontroller som skyddar systemet listade

### Beroenden
- [ ] Beroenden till andra system dokumenterade
- [ ] Beroendetyp klassificerad (critical/high/medium/low)
- [ ] Reverse dependencies identifierade (vilka beror på detta system)
- [ ] Single points of failure identifierade

### Leverantörer
- [ ] Primär leverantör dokumenterad (om extern)
- [ ] Support-avtal dokumenterat
- [ ] Säkerhetsbedömning av leverantör genomförd

### Drift och Underhåll
- [ ] Backup-konfiguration dokumenterad
- [ ] Monitoring konfigurerad
- [ ] Patch management process tillämpas
- [ ] Senaste patch-datum dokumenterat
- [ ] Drift-dokumentation (runbook) tillgänglig

### Compliance
- [ ] Tillämpliga regleringar identifierade
- [ ] Compliance-status dokumenterad
- [ ] Audit-resultat dokumenterade

## Exempel - Komplett System

Se [system-documentation.yaml](../templates/system-documentation.yaml) för en fullständig mall.

## Integration med Andra Perspektiv

- **Business Architecture**: Applikationer implementerar capabilities och stödjer processer
- **Technology Architecture**: Applikationer körs på infrastruktur
- **Security Architecture**: Säkerhetskontroller skyddar applikationer
- **Data Architecture**: Applikationer processar och lagrar data

## Sammanfattning

Application Architecture är bryggan mellan verksamhet och teknologi. För NIS 2:

1. **Inventera allt**: Komplett förteckning krävs
2. **Klassificera kritikalitet**: Baserat på BIA
3. **Dokumentera beroenden**: Förstå påverkan
4. **Säkerhet by design**: Integrera säkerhet i hela livscykeln
5. **Underhåll dokumentationen**: Kontinuerlig uppdatering

Varje kritiskt system ska ha fullständig dokumentation enligt system-documentation mallen.

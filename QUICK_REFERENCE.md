# NIS 2 EA Framework - Quick Reference

## Metamodellens Huvudentiteter

### Business Layer
| Entitet | Beskrivning | Kritiska Attribut |
|---------|-------------|-------------------|
| **BusinessCapability** | Vad organisationen kan göra | criticality, owner, status |
| **BusinessProcess** | Strukturerad aktivitet | RTO, RPO, criticality, owner |
| **OrganizationalUnit** | Organisationsenhet | head, responsibilities |
| **Person** | Individ | roles, organizational_unit |
| **Role** | Roll med ansvar | responsibilities, required_competencies |

### Application Layer
| Entitet | Beskrivning | Kritiska Attribut |
|---------|-------------|-------------------|
| **ApplicationSystem** | IT-system | criticality, owner, custodian, last_security_review |
| **ApplicationComponent** | Del av system | component_type, criticality, hosted_on |
| **ApplicationInterface** | Gränssnitt mellan system | authentication_method, encryption, data_classification |

### Technology Layer
| Entitet | Beskrivning | Kritiska Attribut |
|---------|-------------|-------------------|
| **InfrastructureNode** | Server/VM/Container | os_version, last_patched, patch_status, location |
| **Network** | Nätverkssegment | security_zone, firewall_protected, ip_range |
| **TechnologyPlatform** | OS/Platform | version, support_end_date, vendor |
| **Location** | Fysisk plats | country, physical_security_level |

### Security Layer
| Entitet | Beskrivning | Kritiska Attribut |
|---------|-------------|-------------------|
| **SecurityControl** | Säkerhetskontroll | control_type, control_category, effectiveness |
| **ThreatScenario** | Identifierat hot | likelihood, impact, threat_category |
| **Vulnerability** | Sårbarhet | cvss_score, severity, status, remediation_deadline |
| **SecurityIncident** | Säkerhetsincident | severity, status, reported_to_authority |
| **RiskAssessment** | Riskbedömning | assessment_date, risk_level, methodology |
| **ComplianceRequirement** | Compliance-krav | source, compliance_status, evidence |

### Data Layer
| Entitet | Beskrivning | Kritiska Attribut |
|---------|-------------|-------------------|
| **DataObject** | Datatyp | classification, personal_data, retention_period |
| **DataStore** | Lagringsplats | encryption_at_rest, backup_configured, access_controls |
| **DataFlow** | Dataflöde | encryption_in_transit, crosses_trust_boundary |

### Governance Layer
| Entitet | Beskrivning | Kritiska Attribut |
|---------|-------------|-------------------|
| **Policy** | Policy/regel | policy_type, owner, status, last_review |
| **Supplier** | Leverantör | criticality, security_rating, nis2_entity |

## NIS 2 Compliance Checklist

### Artikel 21.2 - Cybersäkerhetsriskhanteringsåtgärder

- [ ] **21.2.a - Incidenthantering**
  - Incident Response Plan
  - SIEM / Centraliserad loggning
  - Incident Response Team
  - Incident log

- [ ] **21.2.b - Business Continuity**
  - Daily backups (tested)
  - RTO/RPO dokumenterat
  - DR Plan (tested annually)
  - BCP för kritiska processer

- [ ] **21.2.c - Supply Chain Security**
  - Leverantörsinventering
  - Säkerhetsbedömningar
  - DPA (Data Processing Agreements)

- [ ] **21.2.d - Secure Development**
  - SSDLC policy
  - Security review process
  - Patch management (SLA definierat)

- [ ] **21.2.e - Control Assessment**
  - Security control testing (annually)
  - Penetration testing
  - Effectiveness assessment

- [ ] **21.2.f - Cyber Hygiene & Training**
  - Security awareness training (annually)
  - Security policies
  - Acceptable Use Policy

- [ ] **21.2.g - Cryptography**
  - Encryption at rest (confidential data)
  - Encryption in transit (all external)
  - Key management process

- [ ] **21.2.h - Access Control**
  - RBAC implemented
  - Access reviews (quarterly)
  - Asset inventory
  - HR security screening

- [ ] **21.2.i - Multi-Factor Authentication**
  - MFA for privileged users (100%)
  - MFA implementation documented

- [ ] **21.2.j - Secure Communications**
  - Encrypted email
  - Secure conferencing

- [ ] **21.2.k - Emergency Communications**
  - Emergency communication plan
  - Backup communication methods

### Artikel 23 - Incidentrapportering

- [ ] **24h Early Warning**
  - Process dokumenterad
  - Contact to authority established

- [ ] **72h Detailed Report**
  - Template förberedd
  - Incident classification criteria

- [ ] **Final Report (1 month)**
  - Process dokumenterad

## Kritikalitetsklassificering

### Klassificeringsmatris

| Kritikalitet | RTO | RPO | Kännetecken |
|-------------|-----|-----|-------------|
| **Critical** | < 4h | < 1h | Stoppar kritisk verksamhet, stor ekonomisk påverkan |
| **High** | 4-24h | 1-4h | Påverkar viktiga funktioner, medelstor ekonomisk påverkan |
| **Medium** | 1-3 dagar | 4-24h | Stödjer verksamhet, begränsad påverkan |
| **Low** | > 3 dagar | > 24h | Minimal påverkan, kan vänta |

## Dataklassificering

| Klassificering | Definition | Kryptering | Exempel |
|---------------|------------|------------|---------|
| **Secret** | Hemlig, mycket begränsad åtkomst | Obligatorisk | Affärshemligheter, strategiska planer |
| **Confidential** | Konfidentiell, begränsad åtkomst | Obligatorisk | Kunddata, finansiell data |
| **Internal** | Intern, ej för externa | Rekommenderad | Interna dokument, processer |
| **Public** | Publik information | Ej nödvändig | Marknadsföringsmaterial, pressreleaser |

## Säkerhetskontroll-kategorier

| Kategori | Kontrolltyp | Exempel |
|----------|------------|---------|
| **Access Control** | Preventive | MFA, RBAC, PAM |
| **Encryption** | Preventive | TLS, AES-256, Key management |
| **Monitoring** | Detective | SIEM, IDS/IPS, Log management |
| **Backup** | Corrective | Daily backup, DR, Restore testing |
| **Patch Management** | Preventive | Automated patching, Vulnerability scanning |
| **Network Security** | Preventive | Firewall, Network segmentation, WAF |
| **Incident Response** | Corrective | IR Plan, SOC, Forensics |
| **Training** | Administrative | Security awareness, Phishing simulation |

## Snabb Implementeringsplan

### Vecka 1-2: Förberedelser
- Projektorganisation
- Gap analysis
- Verktygsval

### Vecka 3-4: Business Architecture
- Business Capabilities workshop
- BIA (Business Impact Analysis)
- RTO/RPO dokumentation

### Vecka 5-8: Application Architecture
- System discovery
- System documentation (börja med kritiska)
- Dependencies mapping

### Vecka 9-10: Technology Architecture
- Infrastructure inventory
- Network documentation
- Patch status assessment

### Vecka 11-14: Security Architecture
- Security controls inventory
- Risk assessment
- Incident response readiness

### Vecka 15-16: Data Architecture
- Data inventory
- Data flows mapping
- GDPR compliance check

### Vecka 17-18: Integration & Validation
- Cross-perspective validation
- Completeness check
- NIS 2 compliance mapping

### Vecka 19-20: Rapportering & Governance
- Management dashboards
- Governance process
- Continuous improvement plan

## Kontaktpunkter för Frågor

### Enterprise Architecture
- Framework-frågor
- Metamodell-tolkning
- Verktygsval

### Security Architecture
- Säkerhetskontroller
- Risk management
- Incident response

### Compliance
- NIS 2-tolkning
- GDPR-koppling
- Audit-förberedelse

### IT Operations
- Systemdokumentation
- Infrastructure inventory
- Patch management

## Användbara Länkar

### Externa Resurser
- **NIS 2 Directive**: EUR-Lex 32022L2555
- **ENISA NIS 2 Guidelines**: https://www.enisa.europa.eu/
- **Swedish MSB**: https://www.msb.se/ (för svenska organisationer)
- **TOGAF**: https://www.opengroup.org/togaf
- **ArchiMate**: https://www.opengroup.org/archimate-forum
- **ISO 27001**: https://www.iso.org/isoiec-27001-information-security.html

### Verktyg
- **Archi (Free EA tool)**: https://www.archimatetool.com/
- **Draw.io**: https://www.drawio.com/
- **Mermaid**: https://mermaid.js.org/

## Vanliga Frågor

**Q: Måste vi dokumentera ALLA system?**
A: Ja, för komplett NIS 2 compliance. Men börja med kritiska system först.

**Q: Hur ofta behöver vi uppdatera dokumentationen?**
A: Minst vid förändringar + årlig review. Rekommenderat: Kvartalsvisa reviews.

**Q: Vilken detaljeringsgrad krävs?**
A: Kritiska system: Fullständig (använd system-documentation template)
   Medium/Low: Grundläggande information räcker

**Q: Vad händer om vi inte uppfyller NIS 2?**
A: Sanktioner från tillsynsmyndighet, inklusive böter. Viktigare: Ökad risk för incidents.

**Q: Kan vi använda AI för att generera dokumentation?**
A: AI kan hjälpa, men kräver human review. Faktakontroll kritisk.

**Q: Hur hanterar vi legacy-system utan dokumentation?**
A: Prioritera: Reverse engineer kritiska system först, planera modernisering eller avveckling.

**Q: Behöver vi ett dyrt EA-verktyg?**
A: Nej, kan börja med Excel/Confluence. Verktyg hjälper men är inte obligatoriskt.

## Lycka till!

För frågor eller förtydliganden, kontakta ditt EA-team eller projektledare.

---

**Framework Version**: 1.0  
**Senast uppdaterad**: 2026-02-26  
**Nästa review**: 2026-08-26

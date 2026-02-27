# Security Architecture Perspektiv

## Översikt

Security Architecture-perspektivet är det mest centrala för NIS 2-compliance. Det beskriver säkerhetskontroller, hot, sårbarheter, risker och incidenter.

## Syfte inom NIS 2-kontext

NIS 2 Artikel 21 kräver specifikt:
- Riskbedömning och riskhantering
- Implementering av säkerhetskontroller
- Sårbarhetshantering
- Incidenthantering och rapportering
- Kontinuerlig övervakning och testning

## Huvudkomponenter

### 1. Security Controls (Säkerhetskontroller)

**Definition**: En säkerhetsåtgärd eller kontroll som reducerar risk.

**Kontrolltyper**:
- **Preventive**: Förhindrar att hot realiseras (ex: brandvägg, MFA)
- **Detective**: Upptäcker säkerhetsincidenter (ex: IDS, SIEM, loggning)
- **Corrective**: Korrigerar efter incident (ex: backup restore, patch)
- **Administrative**: Policies, procedurer, utbildning

**Kontrollkategorier enligt NIS 2**:
- Access Control (åtkomstkontroll)
- Encryption (kryptering)
- Monitoring (övervakning)
- Backup (säkerhetskopiering)
- Patch Management (patchhantering)
- Network Security (nätverkssäkerhet)
- Incident Response (incidenthantering)
- Training (utbildning)

**Dokumentationskrav**:
```yaml
id: ctrl-001
name: "Multi-faktor autentisering för VPN"
description: "Kräver MFA för all extern åtkomst via VPN"
control_type: preventive
control_category: access_control
implementation_status: implemented
owner: person-security-manager
last_tested: 2026-01-15
test_method: "Penetration test av extern åtkomst"
effectiveness: effective
protects:
  - app-001
  - app-005
  - network-dmz
mitigates:
  - threat-001  # Unauthorized access
  - threat-006  # Credential theft
```

**NIS 2-specifika kontroller (Artikel 21.2)**:

| Krav | Kontrolltyp | Exempel |
|------|-------------|---------|
| 21.2.a Incidenthantering | Detective, Corrective | SIEM, IDS, Incident Response Plan |
| 21.2.b Business Continuity | Corrective | Backup, DR-site, Redundans |
| 21.2.c Supply Chain Security | Preventive | Supplier assessment, SLA |
| 21.2.d Secure Development | Preventive | SSDLC, Code review, Security testing |
| 21.2.e Control Assessment | Detective | Security audit, Penetration testing |
| 21.2.f Cyber Hygiene & Training | Preventive, Administrative | Security awareness, Policy |
| 21.2.g Cryptography | Preventive | Encryption at rest/transit, Key management |
| 21.2.h Access Control | Preventive, Detective | RBAC, Access review, Asset management |
| 21.2.i Multi-Factor Auth | Preventive | MFA implementation |
| 21.2.j Secure Communications | Preventive | Encrypted email, Secure conferencing |
| 21.2.k Emergency Communications | Corrective | Backup communication channels |

### 2. Threat Scenarios (Hotscenarios)

**Definition**: Ett identifierat hot som kan påverka organisationen.

**Hotkategorier**:
- Malware (virus, trojaner)
- Ransomware
- Phishing / Social Engineering
- DDoS (Distributed Denial of Service)
- Insider Threat (illojal personal)
- Supply Chain Attack
- Physical Security Breach

**Dokumentationskrav**:
```yaml
id: threat-001
name: "Ransomware-attack mot produktionssystem"
description: "Attackerare krypterar kritiska system och kräver lösensumma"
threat_category: ransomware
likelihood: high
impact: critical
threat_sources:
  - "Cybercrime organizations"
  - "State-sponsored actors"
threat_actors: "External malicious actors"
attack_vectors:
  - "Phishing email"
  - "Vulnerable external services"
  - "Compromised supplier"
threatens:
  - app-erp-system
  - app-production-control
mitigated_by:
  - ctrl-backup-001
  - ctrl-email-filtering
  - ctrl-patch-management
residual_risk: medium
```

### 3. Vulnerabilities (Sårbarheter)

**Definition**: En svaghet i system eller processer som kan exploateras.

**Sårbarhetskällor**:
- Software vulnerabilities (CVE)
- Misconfiguration
- Weak authentication
- Unpatched systems
- Social engineering susceptibility

**Dokumentationskrav**:
```yaml
id: vuln-001
name: "Log4Shell vulnerability in application server"
description: "CVE-2021-44228 - Remote code execution i Log4j"
cve_id: "CVE-2021-44228"
cvss_score: 10.0
severity: critical
affected_asset: infra-app-server-05
status: mitigated
discovered_date: 2026-01-10
discovered_by: "Vulnerability scan"
remediation_deadline: 2026-01-12
remediation_action: "Patched to Log4j 2.17.1"
closed_date: 2026-01-11
mitigated_by: ctrl-patch-001
```

**Sårbarhetshanteringsprocess**:
1. **Discovery**: Identifiera sårbarheter (automatiska scanners, threat intel)
2. **Assessment**: Bedöm allvarlighetsgrad och påverkan
3. **Prioritization**: Prioritera baserat på CVSS och tillgångskritikalitet
4. **Remediation**: Åtgärda (patch, workaround, kompensation)
5. **Verification**: Verifiera att sårbarheten är åtgärdad
6. **Documentation**: Dokumentera i vulnerability register

**SLA för sårbarhetsåtgärd (exempel)**:
- Critical (CVSS 9.0-10.0): 48 timmar
- High (CVSS 7.0-8.9): 7 dagar
- Medium (CVSS 4.0-6.9): 30 dagar
- Low (CVSS 0.1-3.9): 90 dagar

### 4. Security Incidents (Säkerhetsincidenter)

**Definition**: En händelse som hotar konfidentialitet, integritet eller tillgänglighet.

**Incidenttyper**:
- Malware infection
- Unauthorized access
- Data breach
- Denial of Service (DoS)
- Policy violation
- Physical security breach

**Dokumentationskrav (NIS 2 Artikel 23)**:
```yaml
id: incident-001
title: "Ransomware-attack mot filserver"
description: "Krypterad filserver med lösenkrav på 1M USD"
incident_type: malware
severity: critical
status: resolved
detected_date: 2026-02-15T03:24:00Z
detected_by: "EDR alert"
reported_date: 2026-02-15T04:00:00Z
contained_date: 2026-02-15T06:30:00Z
resolved_date: 2026-02-18T14:00:00Z
affected_systems:
  - infra-fileserver-01
  - app-document-management
impact_assessment:
  data_loss: none
  downtime: 72h
  financial_impact: 50000 EUR
  data_breach: false
root_cause: "Phishing email with malicious attachment"
remediation_actions:
  - "Isolated affected servers"
  - "Restored from backup"
  - "Strengthened email filtering"
lessons_learned: "Need for better email security awareness training"
reported_to_authority: true
authority_report_date: 2026-02-15T10:00:00Z
authority: "CERT-SE"
```

**NIS 2 Incidentrapportering (Artikel 23)**:
1. **Early Warning (24h)**: Första varning till myndighet inom 24 timmar
2. **Incident Notification (72h)**: Detaljerad rapport inom 72 timmar
3. **Final Report (1 månad)**: Slutrapport med rot-orsak och åtgärder

**Signifikanta incidenter (ska rapporteras)**:
- Kritiska system påverkade
- Betydande påverkan på tjänsteleverans
- Påverkar många användare/kunder
- Risk för spridning till andra organisationer
- Datatbrott med personuppgifter
- Omfattande finansiell påverkan

### 5. Risk Assessments (Riskbedömningar)

**Definition**: Systematisk identifiering och bedömning av risker.

**Riskbedömningsprocess**:
```
1. Asset Identification → Identifiera tillgångar
2. Threat Identification → Identifiera hot
3. Vulnerability Assessment → Bedöm sårbarheter
4. Impact Analysis → Analysera konsekvenser
5. Likelihood Assessment → Bedöm sannolikhet
6. Risk Calculation → Beräkna risk (Impact × Likelihood)
7. Risk Evaluation → Jämför med risk appetite
8. Risk Treatment → Beslut om åtgärd
```

**Dokumentationskrav**:
```yaml
id: risk-assessment-2026-q1
name: "Q1 2026 Risk Assessment - Critical Systems"
description: "Kvartalsmässig riskbedömning av kritiska system"
scope:
  - app-erp-system
  - app-customer-portal
  - infra-production-network
assessment_date: 2026-01-20
assessor: person-ciso
methodology: "ISO 27005"
identified_risks:
  - risk-001
  - risk-002
  - risk-003
overall_risk_level: medium
key_findings:
  - "Ransomware risk high due to external connectivity"
  - "Supply chain risk medium from critical vendor"
mitigation_plan: "Implement enhanced backup and email filtering"
next_assessment: 2026-04-20
```

**Risk Treatment Options**:
- **Mitigate**: Implementera kontroller för att reducera risken
- **Accept**: Acceptera risken (dokumentera beslut)
- **Transfer**: Överför risk (försäkring, outsourcing)
- **Avoid**: Undvik riskabel aktivitet

### 6. Compliance Requirements

**Definition**: Krav från NIS 2 och andra regleringar.

**Dokumentationskrav**:
```yaml
id: comp-req-nis2-21-2-a
requirement_id: "NIS2-21.2.a"
name: "Incidenthantering"
description: "Policies och procedurer för incidenthantering"
source: nis2
category: "Risk Management"
compliance_status: compliant
evidence:
  - "Incident Response Policy v2.1"
  - "Incident Response Playbook"
  - "Incident log 2025-2026"
  - "Incident response drill 2025-12-10"
complied_by:
  - policy-incident-response
  - ctrl-siem-001
  - proc-incident-handling
last_assessment: 2026-02-01
assessor: person-compliance-officer
next_assessment: 2027-02-01
```

## Security Architecture Frameworks

Denna metamodell är kompatibel med:

1. **NIST Cybersecurity Framework (CSF)**
   - Identify → Asset inventory, Risk assessment
   - Protect → Security controls (preventive)
   - Detect → Security controls (detective)
   - Respond → Incident response
   - Recover → Business continuity

2. **ISO/IEC 27001**
   - Mappning av kontroller till Annex A kontroller
   - ISMS (Information Security Management System) struktur

3. **CIS Controls**
   - 18 kritiska säkerhetskontroller
   - Prioritering baserat på effectiveness

4. **MITRE ATT&CK**
   - Threat scenarios mappade till tactics & techniques
   - Detection och mitigation strategies

## Defense in Depth (Djupförsvar)

Säkerhetskontroller ska implementeras i lager:

```
Layer 1: Perimeter Security
  - Firewall
  - IDS/IPS
  - DDoS protection

Layer 2: Network Security
  - Network segmentation
  - VLANs
  - Access Control Lists

Layer 3: Endpoint Security
  - Antivirus/EDR
  - Host-based firewall
  - Application whitelisting

Layer 4: Application Security
  - Secure coding
  - Input validation
  - Authentication & Authorization

Layer 5: Data Security
  - Encryption at rest
  - Encryption in transit
  - Data Loss Prevention

Layer 6: User Security
  - MFA
  - Security awareness
  - Privileged access management
```

## Security Monitoring (Säkerhetsövervakning)

**Obligatoriska monitoring-kontroller**:
- **SIEM (Security Information & Event Management)**: Centraliserad loggning
- **IDS/IPS (Intrusion Detection/Prevention)**: Nätverk anomali detection
- **EDR (Endpoint Detection & Response)**: Endpoint threat detection
- **Vulnerability Scanning**: Kontinuerlig sårbarhetsscanning
- **Threat Intelligence**: Externa hot-feeds

**Security Operations Center (SOC)**:
```yaml
security_monitoring:
  siem: splunk-enterprise
  log_sources:
    - firewalls
    - servers
    - applications
    - cloud_services
  monitoring_coverage: 24/7
  alert_response_sla:
    critical: 15min
    high: 1h
    medium: 4h
    low: 24h
  incident_escalation_process: documented
```

## Checklista för Security Architecture

### Kritiska Säkerhetskontroller (NIS 2 Minimum)
- [ ] Multi-faktor autentisering implementerad för kritiska system
- [ ] Kryptering at rest för konfidentiell data
- [ ] Kryptering in transit för alla externa gränssnitt
- [ ] Backup av kritiska system (testad restore)
- [ ] Patch management process (dokumenterad och följd)
- [ ] Network segmentation (DMZ, produktions separation)
- [ ] Centraliserad loggning (SIEM)
- [ ] Intrusion detection (IDS/IPS)
- [ ] Endpoint protection (EDR/antivirus)
- [ ] Security awareness training (årligt för all personal)

### Processer och Dokumentation
- [ ] Incident Response Plan dokumenterad
- [ ] Incident Response Team definierat
- [ ] Incident response playbooks för vanliga scenarier
- [ ] Incidentrapportering till myndighet (process dokumenterad)
- [ ] Riskbedömning genomförd (minst årligen)
- [ ] Sårbarhetsscanning kontinuerlig
- [ ] Sårbarhetshanteringsprocess med SLA
- [ ] Security control testing (årligt minimum)
- [ ] Business Continuity Plan testad
- [ ] Disaster Recovery Plan testad

### Dokumentation och Efterlevnad
- [ ] Alla security controls dokumenterade i repository
- [ ] Control effectiveness-tester dokumenterade
- [ ] Alla incidenter dokumenterade med root cause
- [ ] Risk register uppdaterat
- [ ] Vulnerability register aktuellt
- [ ] Compliance-status spårad för alla NIS 2-krav
- [ ] Security metrics definierade och spårade

## Security Metrics (Säkerhetsmått)

För att mäta säkerhetsnivå och compliance:

```yaml
security_metrics:
  
  vulnerability_management:
    - metric: "Time to patch critical vulnerabilities"
      target: "< 48h"
      current: "36h"
      status: green
      
    - metric: "% of systems with critical vulnerabilities"
      target: "< 1%"
      current: "0.5%"
      status: green
  
  incident_management:
    - metric: "Mean Time to Detect (MTTD)"
      target: "< 1h"
      current: "45min"
      status: green
      
    - metric: "Mean Time to Respond (MTTR)"
      target: "< 4h"
      current: "6h"
      status: yellow
      
  access_control:
    - metric: "% users with MFA enabled"
      target: "100%"
      current: "98%"
      status: yellow
      
  compliance:
    - metric: "% NIS 2 requirements compliant"
      target: "100%"
      current: "95%"
      status: yellow
```

## Sammanfattning

Security Architecture är kärnan i NIS 2-compliance. Fokusera på:

1. **Implementera kontroller**: Artikel 21.2 listar specifika kontroller
2. **Kontinuerlig monitoring**: Upptäck och respondera på incidenter
3. **Sårbarhetshantering**: Systematisk process med SLA
4. **Riskbedömning**: Årlig minimum, dokumenterad
5. **Incident readiness**: Plan, övning, rapportering
6. **Mät och förbättra**: Metrics för säkerhetsnivå

Alla kontroller, hot, sårbarheter och incidenter MÅSTE dokumenteras strukturerat för att uppvisa compliance.

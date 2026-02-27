# Business Architecture Perspektiv

## Översikt

Business Architecture-perspektivet beskriver organisationens verksamhet, processer, förmågor och organisation. Detta perspektiv är fundamentalt för att förstå VARFÖR IT-system och säkerhet behövs.

## Syfte inom NIS 2-kontext

- Identifiera kritiska verksamhetsprocesser som måste skyddas
- Förstå affärskritikalitet för att prioritera säkerhetsåtgärder
- Dokumentera ansvar och roller för cybersäkerhet
- Säkerställa verksamhetskontinuitet (Business Continuity Planning)

## Huvudkomponenter

### 1. Business Capabilities (Affärsförmågor)

**Definition**: En förmåga representerar VAD organisationen kan göra för att skapa värde.

**Exempel**:
- Kundsupport
- Orderhantering
- Produktutveckling
- Ekonomistyrning

**Dokumentationskrav**:
- Namn och beskrivning
- Kritikalitetsklassificering (critical/high/medium/low)
- Ägande organisationsenhet
- Status (active/planned/retired)

**NIS 2-relevans**: Kritiska förmågor måste identifieras för att förstå vilka system som är mest affärskritiska.

### 2. Business Processes (Affärsprocesser)

**Definition**: En strukturerad uppsättning aktiviteter som transformerar input till output och skapar värde.

**Exempel**:
- Orderhanteringsprocess
- Faktureringsprocess
- Incident management process
- Onboarding av nya medarbetare

**Dokumentationskrav**:
- Processnamn och beskrivning
- Processägare (Person)
- Kritikalitetsklassificering
- **RTO (Recovery Time Objective)**: Maximal acceptabel tid utan processen
- **RPO (Recovery Point Objective)**: Maximal acceptabel dataförlust
- Processsteg (fritext eller BPMN-diagram länk)

**NIS 2-relevans**: 
- RTO/RPO är kritiskt för Business Continuity Planning
- Kritiska processer måste ha dokumenterade återställningsplaner
- Processer driver krav på systemtillgänglighet

**Exempel - Kritisk process**:
```yaml
id: proc-001
name: "E-handel orderhantering"
description: "Process för att ta emot, validera och behandla kundorder online"
process_owner: person-045
criticality: critical
recovery_time_objective: 1h
recovery_point_objective: 5min
supports_capabilities:
  - cap-customer-service
  - cap-sales
```

### 3. Organizational Units (Organisationsenheter)

**Definition**: Organisatoriska enheter som avdelningar, team eller grupper.

**Dokumentationskrav**:
- Namn och beskrivning
- Överordnad enhet (hierarki)
- Enhetschef
- Ansvarsområden

**NIS 2-relevans**: Tydlig ansvarsfördelning för cybersäkerhet krävs enligt NIS 2.

### 4. Persons & Roles (Personer och Roller)

**Definition**: Individer och deras roller inom organisationen.

**Dokumentationskrav för Person**:
- Namn och kontaktuppgifter
- Tilldelade roller
- Organisationsenhet

**Dokumentationskrav för Role**:
- Rollnamn och beskrivning
- Ansvarsområden
- Nödvändiga kompetenser

**Kritiska roller för NIS 2**:
- **CISO (Chief Information Security Officer)**: Övergripande ansvar för cybersäkerhet
- **System Owner**: Affärsmässig ägare av system
- **System Custodian**: Teknisk förvaltare av system
- **Data Protection Officer (DPO)**: Dataskyddsansvar
- **Incident Response Manager**: Ansvarig för incidenthantering
- **Business Continuity Manager**: Ansvarig för verksamhetskontinuitet

**NIS 2-relevans**: Artikel 21 kräver tydliga ansvars- och rollfördelningar.

## Business-till-IT Mappning

För att uppfylla NIS 2 måste kopplingen mellan business och IT vara tydlig:

```
BusinessCapability → ApplicationSystem(s) → InfrastructureNode(s)
```

**Exempel**:
```
Capability: "Kundsupport"
  ↓ implemented_by
Application: "CRM-system"
  ↓ hosted_on
Infrastructure: "CloudServer-EU-West"
  ↓ protected_by
SecurityControl: "Multi-faktor autentisering"
```

## Dokumentationsflow

### Steg 1: Identifiera Business Capabilities
1. Workshop med affärsledning
2. Identifiera alla huvudförmågor
3. Klassificera kritikalitet baserat på affärspåverkan

### Steg 2: Dokumentera Kritiska Processer
1. För varje kritisk capability, identifiera underliggande processer
2. Tilldela processägare
3. **Viktigt**: Definiera RTO/RPO för varje kritisk process genom Business Impact Analysis (BIA)

### Steg 3: Kartlägg Organisation och Roller
1. Dokumentera organisationsstruktur
2. Identifiera nyckelroller för cybersäkerhet
3. Tilldela ansvar för kritiska system och processer

### Steg 4: Länka till IT-system
1. För varje process/capability, identifiera stödjande IT-system
2. Dokumentera beroenden mellan processer och system

## Business Impact Analysis (BIA)

En BIA är obligatorisk för att klassificera kritikalitet och definiera RTO/RPO:

**BIA-process**:
1. Identifiera alla affärsprocesser
2. För varje process, analysera:
   - **Finansiell påverkan** vid avbrott
   - **Regulatorisk påverkan** (böter, sanktioner)
   - **Reputationspåverkan** (varumärkesskada)
   - **Operativ påverkan** (stoppad verksamhet)
3. Baserat på påverkan, sätt kritikalitet och RTO/RPO
4. Dokumentera resultat

**Exempel BIA-resultat**:
```yaml
process: "E-commerce checkout"
financial_impact_per_hour: 50000 EUR
regulatory_impact: high (GDPR, PSD2)
reputational_impact: critical
operational_impact: critical

→ Klassificering: CRITICAL
→ RTO: 1 timme
→ RPO: 5 minuter
```

## Verksamhetskontinuitetsplanering

För kritiska processer krävs:

1. **Business Continuity Plan (BCP)**
   - Hur verksamheten fortsätter vid avbrott
   - Alternativa arbetssätt
   - Manuella processer vid systemavbrott

2. **Disaster Recovery Plan (DRP)**
   - Hur IT-system återställs
   - Backup och restore-procedurer
   - RTO/RPO-uppfyllnad

3. **Test och Övning**
   - Årliga tester av BCP/DRP
   - Dokumenterade testresultat
   - Åtgärder baserat på tester

## Checklistor för Business-perspektivet

### Minimal NIS 2 Compliance
- [ ] Alla business capabilities identifierade och dokumenterade
- [ ] Kritikalitet satt för alla capabilities
- [ ] Alla kritiska business processer dokumenterade
- [ ] RTO/RPO definierat för alla kritiska processer
- [ ] Business Impact Analysis genomförd
- [ ] Processägare tilldelade för alla kritiska processer
- [ ] Organisationsstruktur dokumenterad
- [ ] Nyckelroller för cybersäkerhet identifierade och tillsatta
- [ ] Ansvar för kritiska system tilldelat
- [ ] Business Continuity Plan för kritiska processer
- [ ] BCP/DRP-tester genomförda (årligen)

## Exempel - Komplett Business-dokumentation

```yaml
# Business Capability
id: cap-001
name: "Digital Kundservice"
description: "Förmågan att ge support till kunder via digitala kanaler"
criticality: high
owner: org-unit-customer-service
status: active

# Business Process
id: proc-001
name: "Hantera kundsupportärende"
description: "Process från ärendeskapande till lösning"
process_owner: person-cs-manager
criticality: high
recovery_time_objective: 4h
recovery_point_objective: 15min
implemented_by_capability: cap-001

# Supporting Application
id: app-001
name: "Zendesk Kundsupport"
implements: [cap-001]
supports: [proc-001]
owner: org-unit-customer-service
custodian: person-it-manager
criticality: high

# Organizational Unit
id: org-unit-customer-service
name: "Kundservice"
parent_unit: org-unit-sales-marketing
head: person-cs-director
responsibilities:
  - "Hantera kundrelationer"
  - "Första linjens support"

# Person
id: person-cs-director
name: "Anna Svensson"
email: "anna.svensson@company.com"
roles:
  - role-department-head
  - role-system-owner
organizational_unit: org-unit-customer-service

# Role
id: role-system-owner
name: "System Owner"
description: "Affärsmässig ägare av IT-system"
responsibilities:
  - "Besluta om systemanvändning"
  - "Godkänna större förändringar"
  - "Säkerställa att systemet uppfyller affärsbehov"
required_competencies:
  - "Förståelse för verksamhetsprocesser"
  - "Grundläggande IT-förståelse"
```

## Integration med Andra Perspektiv

- **Application Architecture**: Business processer implementeras av applikationer
- **Security Architecture**: Kritikalitet driver säkerhetskrav
- **Data Architecture**: Business processer genererar och konsumerar data
- **Technology Architecture**: Business-krav driver infrastrukturkrav

## Sammanfattning

Business Architecture-perspektivet är fundamentet för NIS 2-compliance. Utan förståelse för verksamhetens kritikalitet kan säkerheten inte prioriteras rätt. Nyckeln är:

1. **Identifiera kritiskt** - Vad är viktigt för verksamheten?
2. **Kvantifiera krav** - RTO/RPO för kritiska processer
3. **Tilldela ansvar** - Vem äger och ansvarar?
4. **Länka till IT** - Vilka system stödjer vilka processer?

# Livsmedelsverket Enterprise Architecture - Datamodell

## Översikt

Detta är en komplett Enterprise Architecture-modell för Livsmedelsverket baserad på ArchiMate 3.1-standarden. Modellen innehåller ~240 entiteter och 125+ relationer som täcker hela verksamheten.

## Innehåll

### Strategy Layer (27 entiteter)

**Goals (6):**
- Säker mat och bra dricksvatten
- Hållbar livsmedelskonsumtion
- Effektiv myndighetskontroll
- Stark krisberedskap
- Djurskydd och djurhälsa
- Vetenskapligt baserad verksamhet

**Drivers (5):**
- EU-lagstiftning
- Folkhälsokrav
- Digitalisering
- Klimat och miljö
- NIS2-direktivet

**Principles (5):**
- Risk based approach
- Öppenhet och transparens
- Vetenskaplig grund
- Digital först
- Säkerhet och integritet

### Business Layer

**Capabilities - 3 nivåer (35 entiteter):**

**Level 0 - Domäner (7):**
1. Livsmedelssäkerhet
2. Dricksvattensäkerhet
3. Djurskydd och Djurhälsa
4. Näring och Hälsa
5. Krisberedskap
6. Vetenskap och Innovation
7. Verksamhetsstöd

**Level 1 - Funktionella områden (16):**
- Riskvärdering
- Kontroll och Tillsyn
- Tillståndsgivning
- Provtagning och Analys
- Import/Export-kontroll
- Utbrottshantering
- Zoonosövervakning
- Dricksvattenkontroll
- Konsumentinformation
- Regelutveckling
- Matvaneforskning
- IT-drift och Support
- Ekonomiadministration
- HR och Kompetens
- Kemisk analys
- Mikrobiologisk analys

**Level 2 - Specifika förmågor (12):**
- Riskklassning av företag
- Planering av oannonserade kontroller
- Dokumentation av kontroll
- Provtagning vid kontroll
- RASFF-rapportering
- Spårbarhet i livsmedelskedjan
- Veterinärcertifiering
- Importkontroll vid gräns
- Vattenprovtagning
- Kostundersökningar
- Näringsdeklarationer
- Salmonellaövervakning

**Business Processes - 3 nivåer (42 entiteter):**

**Level 1 - Huvudprocesser (10):**
1. Livsmedelskontroll
2. Tillståndshantering
3. Riskbedömning
4. Utbrottsutredning
5. Laboratorieanalys
6. Import/Export-handläggning
7. Dricksvattentillsyn
8. Konsumentvägledning
9. Regelgivning
10. Forskning och Utvärdering

**Level 2 - Delprocesser (20):**
Under Livsmedelskontroll:
- Planera kontroll
- Genomföra platsbesök
- Dokumentera avvikelse
- Fatta åtgärdsbeslut

Under Tillståndshantering:
- Mottaga ansökan
- Granska ansökan
- Fatta tillståndsbeslut

Under Riskbedömning:
- Identifiera fara
- Värdera risk

Under Utbrottsutredning:
- Motta utbrottslarm
- Epidemiologisk utredning
- Rapportera till RASFF

Under Laboratorieanalys:
- Ta prov
- Analysera prov
- Rapportera resultat

Under Import/Export:
- Gränskontroll
- Utfärda exportcertifikat

Under övriga:
- Inspektera vattenverk
- Publicera kostråd
- Besvara konsumentfrågor

**Level 3 - Aktiviteter (12):**
- Hämta företagsdata
- Riskklassa företag
- Boka kontrolltillfälle
- Genomföra intervju
- Inspektera lokaler
- Ta livsmedelprov
- Registrera avvikelse i system
- Fotografera avvikelse
- Skicka provförpackning
- Mikrobiologisk analys
- Kemisk analys
- Godkänna analysresultat

**Organization (19 entiteter):**

Avdelningar (9):
- Livsmedelsverket (huvudorganisation)
- Risk- och nyttovärdering
- Livsmedels- och handelskontroll
- Krisberedskap
- Nationellt laboratorium
- Kommunikation
- IT-avdelningen
- HR-avdelningen
- Ekonomiavdelningen

Roller (10):
- Livsmedelsinspektör
- Riskbedömare
- Laboratorieanalytiker
- Utbrottsutredare
- Tillståndshandläggare
- Import/Export-handläggare
- Kommunikatör
- Forskare
- IT-arkitekt
- Systemförvaltare

### Application Layer (72 applikationer)

**Kontroll & Tillsyn (15):**
1. eKontroll - Huvudsystem för livsmedelskontroll
2. Företagsregistret - Register över livsmedelsföretag
3. Avvikelsehantering - Hantera kontrollavvikelser
4. Riskklassificering - Klassificera företag efter risk
5. Mobil Kontroll-app - Mobilapp för inspektörer
6. Kontrollplan - Planering av årlig kontroll
7. Dokumenthantering Kontroll - Dokumentarkiv
8. Sanktionsregister - Register över sanktioner
9. Djurskyddskontroll - System för djurskyddskontroller
10. GIS Kartverktyg - Geografisk visualisering
11. Mötesbokning Företag - Företag bokar kontrolltid
12. Webbaserad Egenkontroll - Portal för företag
13. Analysresultat-portal - Visa analysresultat
14. Statistik och Rapportering - BI-verktyg
15. Klagomålshantering - Hantera konsumentklagomål

**Krisberedskap & Utbrott (8):**
16. RASFF Sverige - EU:s snabbvarslingssystem (CRITICAL)
17. Utbrottshantering - Utbrottsutredningar (CRITICAL)
18. Epidemiologisk Databas - Spåra smittspridning
19. Kriskoordination - Samordna krishantering (CRITICAL)
20. Återkallelsesystem - Produktåterkallelser
21. Larmcentral - Ta emot akuta larm (CRITICAL)
22. Spårbarhetsdatabas - Spåra livsmedelsprodukter
23. Varningspublicering - Publicera offentliga varningar

**Laboratorieverksamhet (10):**
24. LIMS - Laboratory Information Management System
25. Provhantering - Hantera inkommande prover
26. Mikrobiologi-databas - Mikrobiologiska analysresultat
27. Kemisk Analys - System för kemiska analyser
28. DNA-sekvensering - Genanalys av mikroorganismer
29. Labinstrument Integration - Integration med labutrustning
30. Provspårning - Spåra prover i labbet
31. Kvalitetssäkring Lab - QA/QC-system
32. Metoddatabas - Analysmetoder och procedurer
33. Resultatvalidering - Validera och godkänna resultat

**Tillstånd & Registrering (5):**
34. Tillståndssystemet - E-tjänst för tillståndsansökningar
35. Ärendehantering - Handlägga tillståndsärenden
36. Anläggningsregister - Register över godkända anläggningar
37. Beslutsstöd Tillstånd - Stöd för tillståndsbeslut
38. Dokumentmall-system - Mallar för beslut

**Import/Export (6):**
39. TRACES - EU:s system för import/export (CRITICAL)
40. Gränskontroll - Hantera gränskontroller
41. Exportcertifikat - Utfärda exportcertifikat
42. Importtillstånd - Hantera importtillstånd
43. Veterinärcertifikat - Certifikat för djurprodukter
44. Import/Export-statistik - Statistik över handel

**Dricksvatten (4):**
45. Dricksvattendatabas - Register över vattenverk
46. Vattenprovtagning - Hantera vattenprovtagning
47. Vattenkvalitetsrapportering - Rapportera vattenkvalitet
48. Vattenverk-GIS - Kartlägg vattenverk

**Kommunikation & Information (7):**
49. Livsmedelsverket.se - Huvudwebbplats
50. Hitta Rätt App - Konsumentapp för märkning
51. Nyhetsbrev-system - Skicka nyhetsbrev
52. CMS Webbpublicering - Content Management System
53. Pressmeddelanden - Publicera pressmeddelanden
54. Sociala Medier-verktyg - Hantera sociala medier
55. Kostdatabasen WebAPI - API för näringsdata

**Forskning & Vetenskap (5):**
56. Riksmaten - Nationell kostundersökning
57. Livsmedelsdata - Databas över livsmedel
58. Forskningsdatabas - Forskningsprojekt och publikationer
59. Biobank-system - Hantera biologiska prover
60. Statistikportal - Publicera statistik

**Administration & Verksamhetsstöd (10):**
61. Agresso Ekonomi - Ekonomisystem (CRITICAL)
62. HR-system Primula - Personal- och lönesystem (CRITICAL)
63. Office 365 - Kontorspaket
64. SharePoint - Intranät och samarbete
65. Exchange Email - E-postsystem (CRITICAL)
66. Teams - Samarbetsplattform
67. TimeLog - Tidsrapportering
68. Rekryteringssystem - Hantera rekrytering
69. Utbildningsplattform - Intern utbildning
70. IT-Servicedesk - IT-support och incidenthantering

**Integration & Infrastruktur (2):**
71. Enterprise Service Bus - Integrationslager (CRITICAL)
72. API Gateway - API-hantering

### Data Layer (12 dataobjekt)

- Företagsregister
- Kontrollprotokoll
- Analysresultat
- Tillståndsbeslut
- Avvikelseregister
- Provdatabas
- Utbrottsdata
- Import/Export-data
- Zoonosdata
- Dricksvattendata
- Kostdata
- Näringsdata

### Technology Layer (10 entiteter)

**Nodes:**
- Azure Cloud Platform
- On-Prem Datacenter Uppsala
- SQL Server Databas-cluster
- PostgreSQL Databas
- Azure App Services
- Azure Kubernetes Service

**System Software:**
- Windows Server 2022
- Linux Ubuntu Server

**Communication Networks:**
- Sunet
- VPN-tunnel

### Projects & Portfolios (8 projekt)

1. **eKontroll 2.0** - Uppdatera kontrollsystem (15 MSEK, 2025-2026)
2. **Mobil-först** - Mobilappar för inspektörer (8 MSEK, 2026-2027)
3. **AI Risk-analys** - AI för riskbedömning (12 MSEK, 2026-2028)
4. **LIMS-uppgradering** - Nytt laboratoriesystem (10 MSEK, 2025-2026)
5. **Cloud-migrering** - Flytta till Azure (25 MSEK, 2024-2027)
6. **NIS2-compliance** - Uppfylla NIS2-krav (18 MSEK, 2025-2026)
7. **Digital Först-strategi** - Digitalisera alla tjänster (40 MSEK, 2026-2029)
8. **Integration Platform** - Gemensam integrationsplattform (12 MSEK, 2025-2026)

## Relationer

Modellen innehåller 125+ relationer av följande typer:

- **Realization:** Goals realize drivers, capabilities realize goals, processes realize capabilities, projects realize applications
- **Influence:** Principles influence goals
- **Assignment:** Organizations/roles assigned to processes, technology assigned to applications
- **Serving:** Applications serve processes
- **Access:** Applications access data objects
- **Flow:** Data flow between applications
- **Composition:** Hierarchiska relationer mellan capabilities och processes

## Kritikalitetnivåer

Applikationer är klassificerade enligt:

- **CRITICAL (7):** RASFF, Utbrottshantering, Kriskoordination, Larmcentral, TRACES, Agresso, Exchange, ESB
- **HIGH (32):** Kontrollsystem, register, labsystem
- **MEDIUM (24):** Stödsystem
- **LOW (9):** Informationssystem

## Lifecycle-status

- **Operational (70):** Driftsatta system
- **Development (2):** Under utveckling
- **Planned:** Planerade system (hanteras via Work Packages)

## Användningsområden

Denna modell kan användas för:

1. **NIS2-compliance:** Identifiera kritiska system och beroenden
2. **Riskanalys:** Visualisera sårbarheter
3. **IT-planering:** Planera modernisering
4. **Business Intelligence:** Analysera verksamheten
5. **Kommunikation:** Förklara arkitekturen för stakeholders
6. **Impact Analysis:** Analysera konsekvenser av förändringar
7. **Gap Analysis:** Identifiera saknade förmågor
8. **Roadmap Planning:** Planera utveckling över tid

## Teknisk Implementation

- **Format:** JavaScript object (sampleData.js)
- **Standard:** ArchiMate 3.1
- **Databastyp:** SQLite med IndexedDB-persistence
- **Plattform:** React-applikation
- **Hosting:** Netlify (client-side)
- **Version:** 2.0

## Datavolym

- **Totalt antal entiteter:** ~240
- **Totalt antal relationer:** 125+
- **Filstorlek:** ~503 rader kod
- **Databasstorlek:** ~150 KB (komprimerad)

## Vidare Utveckling

För att utöka modellen kan följande adderas:

- Fler L2/L3 capabilities inom varje domän
- Detaljerade processflöden med events och gateways
- Fler integrationspunkter mellan system
- Mer granulära dataflöden
- Service interfaces för varje applikation
- Contracts och SLA:er
- Location-information för alla komponenter
- Säkerhetsdomäner och zoner (NIS2)
- Compliance-mappings till specifika lagar/förordningar

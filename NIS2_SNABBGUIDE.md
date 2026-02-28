# ArchiMate & NIS2 - Snabbguide

## Vad har uppdaterats?

Jag har nu implementerat **komplett ArchiMate 3.1 metamodell** med **NIS2 compliance-analys** i din applikation.

## Nya funktioner

### 1. Komplett ArchiMate 3.1 Metamodell
- 8 arkitekturlager (Business, Application, Technology, Motivation, Strategy, Physical, Implementation, Migration)
- 60+ entitetstyper från ArchiMate-standarden
- Alla ArchiMate-relationstyper (Composition, Aggregation, Assignment, Realization, Serving, Access, Flow, etc.)
- Varje entitetstyp har information om NIS2-relevans

### 2. NIS2 Compliance Dashboard
**Ny sida**: `/nis2-compliance` (i menyn som "NIS2 Compliance")

**Visar**:
- Övergripande compliance-poäng i procent
- Status per NIS2-artikel (Article 20, 21, 23, 28, 32)
- Detaljerade kontroller för varje artikel
- Vad som finns dokumenterat
- Vad som saknas för full compliance
- Exportfunktion för rapporter

**NIS2-artiklar som analyseras**:
- **Article 20**: Styrning (CISO-roll, ledningens godkännande)
- **Article 21**: Cybersäkerhetsåtgärder (10 kontroller)
  - Kritiska system
  - Riskbedömningar
  - Säkerhetskontroller
  - Kontinuitetsplanering (RTO/RPO)
  - Incidenthantering
  - Leverantörskedjor
  - Nätverkssegmentering
  - Kryptering
  - Åtkomstkontroll
  - MFA
- **Article 23**: Tillsyn (tillgångsinventering, konfigurationshantering)
- **Article 28**: Leverantörskedjesäkerhet
- **Article 32**: GDPR-kopplingar

### 3. NIS2-märkning på entiteter

**I Entitetsbrowsern**:
- Entiteter som krävs för NIS2 har en blå **Shield**-ikon
- Om attribut saknas visas **varningstriangel** med antal saknade attribut
- Om komplett visas **grön bock**
- Färgkodning: Grönt = komplett, Orange = ofullständig

**På Entitetsdetaljsidan**:
- Ny sektion: "NIS2 Compliance"
- Visar vilka NIS2-artiklar entiteten är relevant för
- Listar saknade attribut med förklaringar
- Visar grön bekräftelse om allt är komplett

### 4. Automatisk compliance-analys
- Körs automatiskt när du ändrar data
- Uppdaterar compliance-poäng i realtid
- Identifierar brister och ger rekommendationer

## Hur använder jag det?

### Som arkitekt:

1. **Se compliance-status**
   ```
   Meny → NIS2 Compliance
   ```
   - Se övergripande poäng
   - Expandera artiklar för detaljer

2. **Hitta brister**
   - Röda/gula artikelkort = områden som behöver arbete
   - Klicka för att se specifika problem
   - Saknade attribut listas med förklaringar

3. **Komplettera information**
   - Gå till Entiteter
   - NIS2-kritiska entiteter har sköld-ikon
   - Ofullständiga har varningssymbol med siffra
   - Klicka på entitet → se "NIS2 Compliance"-sektion
   - Klicka "Edit" för att lägga till saknade attribut

4. **Följ upp**
   - Compliance-analys uppdateras automatiskt
   - Se poäng förbättras
   - Exportera rapport för dokumentation

### Exempel: Dokumentera ett kritiskt system

1. **Gå till Entiteter** → Hitta/skapa ApplicationComponent
2. **Fyll i NIS2-rekommenderade fält**:
   - `criticality`: "critical" eller "high"
   - `owner`: Vem som ansvarar
   - `data_classification`: "confidential", "internal", etc.
   - `version`: Versionsnummer
3. **Spara**
4. **Gå till NIS2 Compliance** → se poängen öka!

### Exempel: Dokumentera leverantörsavtal

1. **Skapa Contract-entitet**
2. **Fyll i NIS2-fält**:
   - `supplier`: Leverantörens namn
   - `criticality`: Hur kritisk leverantören är
   - `security_requirements`: Säkerhetskrav i avtalet
   - `review_date`: När avtalet ska ses över
3. **Artikel 28-poängen förbättras**

## Viktiga entitetstyper för NIS2

### Måste dokumenteras (nis2_required: true):
- **BusinessRole** - CISO, säkerhetsansvarig (Article 20, 21)
- **Contract** - Leverantörsavtal (Article 21, 28)
- **ApplicationComponent** - IT-system (Article 21, 23)
- **DataObject** - Data med klassificering (Article 21, 32)
- **Node** - Servrar, infrastruktur (Article 21, 23)
- **SystemSoftware** - OS, middleware (Article 21)
- **CommunicationNetwork** - Nätverk (Article 21)
- **Principle** - Säkerhetsprinciper (Article 21)
- **Requirement** - NIS2-krav (Article 21)
- **Capability** - Förmågor (Article 21)
- **Facility** - Datacenter, lokaler (Article 21)
- **Equipment** - Fysisk utrustning (Article 23)

### Rekommenderade attribut:

**ApplicationComponent**:
- criticality (kritisk/hög/medel/låg)
- owner (ansvarig)
- data_classification (hemlig/konfidentiell/intern/offentlig)
- version

**BusinessProcess**:
- criticality
- rto (Recovery Time Objective)
- rpo (Recovery Point Objective)
- owner

**DataObject**:
- classification
- gdpr_relevant (true/false)
- encryption_required (true/false)

**Node**:
- criticality
- location
- patching_status
- monitoring_enabled

**Contract**:
- supplier
- criticality
- security_requirements
- review_date

## Färgkoder

- **Grönt** (#10B981): Kompletta entiteter, godkända kontroller (≥80%)
- **Gult/Orange** (#F59E0B): Ofullständiga entiteter, delvis uppfyllda (50-79%)
- **Rött** (#EF4444): Kritiska brister (<50%)
- **Blått**: NIS2-relevanta entiteter (Shield-ikon)
- **Grått**: Ej applicerbart

## Compliance-nivåer

- **Compliant (≥80%)**: Full compliance, grönt, CheckCircle
- **Partial (50-79%)**: Delvis, gult, AlertCircle  
- **Non-compliant (<50%)**: Ej uppfyllt, rött, XCircle
- **Not Applicable**: Inte relevant, grått, MinusCircle

## Tips för bättre compliance

1. **Börja med det kritiska**
   - Dokumentera kritiska system först
   - Fokus på `criticality: 'critical'` eller `'high'`

2. **Definiera roller**
   - Skapa BusinessRole för CISO
   - Tilldela ansvar (assignment-relationer)

3. **Dokumentera processer**
   - Incidenthantering
   - Kontinuitet och återhämtning
   - Lägg till RTO/RPO

4. **Hantera leverantörer**
   - Skapa Contract för varje kritisk leverantör
   - Fyll i security_requirements

5. **Klassificera data**
   - Markera känslig data
   - Ange gdpr_relevant
   - Specificera krypteringsbehov

## Exportera rapport

1. **Gå till NIS2 Compliance**
2. **Klicka "Export Report"**
3. **JSON-fil laddas ner** med:
   - Övergripande poäng
   - Alla artiklar och kontroller
   - Pass/fail-status
   - Bevis (vad som finns)
   - Brister (vad som saknas)

## Felsökning

**Låg compliance-poäng?**
- Lägg till fler entiteter
- Komplettera attribut på befintliga
- Skapa relationer mellan entiteter

**Saknade attribut syns inte?**
- Uppdatera sidan
- Kontrollera att entitetstypen är NIS2-required
- Se EntityDetail-sidan för fullständig info

**Dashboard tom?**
- Säkerställ att entiteter finns
- Vänta på analys (vanligtvis omedelbart)
- Kolla webbläsarens console för fel

## Teknisk info

**Nya filer**:
- `webapp/src/data/archimateMetamodel.js` - ArchiMate 3.1 definition
- `webapp/src/utils/nis2ComplianceAnalyzer.js` - Analysmotor
- `webapp/src/pages/ComplianceDashboard.jsx` - Dashboard-sida

**Uppdaterade filer**:
- `webapp/src/context/DataContext.jsx` - ArchiMate-integration, compliance-funktioner
- `webapp/src/pages/EntityBrowser.jsx` - NIS2-badges
- `webapp/src/pages/EntityDetail.jsx` - NIS2 Compliance-sektion
- `webapp/src/components/Layout.jsx` - Navigering
- `webapp/src/App.jsx` - Ny route

**Data version**: 3.0 (automatisk cache-invalidering)

## Mer information

Se [ARCHIMATE_NIS2_UPDATE.md](ARCHIMATE_NIS2_UPDATE.md) för fullständig teknisk dokumentation på engelska.

---

**Lycka till med NIS2-compliance!** 🛡️

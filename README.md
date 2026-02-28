# Enterprise Architecture Framework (ArchiMate 3.1)

## Översikt

Detta ramverk tillhandahåller ett komplett Enterprise Architecture-verktyg baserat på ArchiMate 3.1-standarden. Det möjliggör strukturerad dokumentation, visualisering och analys av organisationens arkitektur över alla skikt.

## Syfte

Ramverket säkerställer att organisationer kan:
- Dokumentera sin enterprise-arkitektur systematiskt enligt ArchiMate 3.1
- Visualisera arkitekturen i olika perspektiv och vyer
- Analysera relationer och beroenden mellan komponenter
- Hantera arkitekturförändringar och projekt
- Stödja beslutsfattande genom strukturerad dokumentation
- Följa etablerade EA best practices

## Kärnelement

Ramverket baseras på ArchiMate 3.1 och omfattar:
1. **Business Layer** - Verksamhetsarkitektur (processer, roller, tjänster)
2. **Application Layer** - Applikationsarkitektur (system, komponenter, gränssnitt)
3. **Technology Layer** - Teknologiarkitektur (infrastruktur, plattformar, nätverk)
4. **Motivation Layer** - Mål, drivkrafter, krav och principer
5. **Strategy Layer** - Kapabiliteter, resurser och värdeströmmar
6. **Physical Layer** - Fysisk utrustning och faciliteter
7. **Implementation & Migration** - Projekt, arbetspaket och gap-analys

## Ramverkets Struktur

### 1. Metamodell
Kärnmetamodellen följer ArchiMate 3.1-standarden med fullständig uppsättning elementtyper och relationstyper. Se `metamodel/archimate-metamodel.yaml`

### 2. Perspektiv (Views)
Ramverket använder ArchiMate-perspektiv:
- **Business Architecture** - Verksamhetsperspektivet (roller, processer, tjänster)
- **Application Architecture** - Applikationsperspektivet (system, komponenter, gränssnitt)
- **Technology Architecture** - Teknologiperspektivet (infrastruktur, plattformar, nätverk)
- **Motivation Architecture** - Mål, krav, intressenter och principer
- **Strategy Architecture** - Kapabiliteter, resurser och värdeströmmar
- **Physical Architecture** - Fysisk infrastruktur och utrustning
- **Implementation & Migration** - Projekt, arbetspaket och gap-analys

### 3. Visualisering
Interaktiva grafer och hierarkiska vyer för att utforska arkitekturen:
- Nätverksvy med Cytoscape
- Hierarkiska trädvyer per skikt
- Projektportföljöversikt med roadmap
- Resursplanering och allokering

### 4. Dokumentationsmallar
Färdiga mallar för att dokumentera olika typer av komponenter enligt ArchiMate. Se `templates/`

## Quick Start

1. **Installera och starta**:
   ```bash
   cd webapp
   npm install
   npm run dev
   ```

2. **Utforska arkitekturen**:
   - Börja på Dashboard för översikt
   - Använd Visualisering för att se relationer
   - Bläddra bland Entiteter för detaljer
   - Utforska olika Arkitekturperspektiv

3. **Dokumentera din arkitektur**:
   - Lägg till entiteter i varje skikt
   - Definiera relationer mellan komponenter
   - Skapa projekt och roadmap
   - Allokera resurser till initiativ

## Mappning till Etablerade EA-Ramverk

Detta ramverk är fullt kompatibelt med:
- **ArchiMate 3.1** (The Open Group modelleringsspråk)
- **TOGAF** (The Open Group Architecture Framework)
- **ISO/IEC 27001** (Informationssäkerhet)
- **COBIT** (IT Governance)

## Struktur

```
/
├── README.md                          # Denna fil
├── metamodel/
│   ├── archimate-metamodel.yaml      # ArchiMate 3.1 metamodell
│   └── core-metamodel.yaml           # Kärnmetamodell
├── perspectives/
│   ├── business-architecture.md      # Verksamhetsperspektiv
│   ├── application-architecture.md   # Applikationsperspektiv
│   ├── technology-architecture.md    # Teknologiperspektiv
│   ├── data-architecture.md          # Dataperspektiv
│   └── security-architecture.md      # Säkerhetsperspektiv
├── templates/
│   └── system-documentation.yaml     # Mall för systemdokumentation
├── examples/
│   └── sample-system.yaml            # Exempel på systemdokumentation
└── webapp/
    ├── src/                          # React-applikation
    ├── package.json                  # Dependencies
    └── vite.config.js                # Vite configuration
```

## Funktioner

### Interaktiv Webbapplikation
- **Dashboard** - Översikt över hela arkitekturen
- **Visualisering** - Interaktiv nätverksvy med Cytoscape
- **Entitetshantering** - CRUD-operationer för alla ArchiMate-element
- **Relationshantering** - Skapa och hantera relationer mellan entiteter
- **Projektportfölj** - Hantera projekt, milstolpar, budget och impact
- **Resursplanering** - Allokera resurser över projekt på månadsnivå
- **Roadmap** - Visualisera tidslinje för projekt och initiativ
- **Perspektivvyer** - Filtrera och utforska per arkitekturskikt

### Datahantering
- Lokal lagring med localStorage
- Import/export av data i JSON-format
- Versionhantering av data
- Sample data för demonstration

## Användning

Se respektive perspektiv-dokumentation i `perspectives/` för detaljerad vägledning om hur varje perspektiv ska dokumenteras enligt ArchiMate 3.1.

## Teknologi

- **React 18** - UI framework
- **Vite** - Build tool
- **Cytoscape.js** - Grafvisualisering
- **Recharts** - Diagrambibliotek
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Ikoner

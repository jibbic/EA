# NIS 2 Enterprise Architecture Ramverk och Metamodell

## Översikt

Detta ramverk tillhandahåller en strukturerad metamodell för att dokumentera system och komponenter i enlighet med NIS 2-direktivets krav, baserat på etablerade EA-principer (Enterprise Architecture).

## Syfte

Ramverket säkerställer att organisationer kan:
- Dokumentera sina system och komponenter systematiskt
- Uppfylla NIS 2:s dokumentationskrav
- Skapa en helhetsbild över IT-landskapet
- Hantera risker och säkerhet strukturerat
- Stödja kontinuerlig compliance och förbättring

## NIS 2 Kärnkrav

NIS 2-direktivet ställer krav på:
1. **Riskhantering** - Identifiera och hantera risker systematiskt
2. **Systemdokumentation** - Fullständig dokumentation av IT-system och komponenter
3. **Säkerhetsåtgärder** - Implementera och dokumentera säkerhetskontroller
4. **Incident Management** - Kapacitet att hantera och rapportera incidenter
5. **Business Continuity** - Säkerställa verksamhetskontinuitet
6. **Supply Chain Security** - Hantera leverantörsrisker
7. **Säkerhetsåtgärder för anskaffning** - Säkerhet i utveckling och inköp
8. **Policies och processer** - Dokumenterade policyer för cybersäkerhet

## Ramverkets Struktur

### 1. Metamodell
Kärnmetamodellen definierar de grundläggande koncepten och deras relationer. Se `metamodel/core-metamodel.yaml`

### 2. Perspektiv (Views)
Ramverket använder fem huvudperspektiv:
- **Business Architecture** - Verksamhetsperspektivet
- **Application Architecture** - Applikationsperspektivet
- **Technology Architecture** - Teknologiperspektivet
- **Security Architecture** - Säkerhetsperspektivet
- **Data Architecture** - Dataperspektivet

### 3. NIS 2 Mappings
Direkt mappning mellan metamodellens element och NIS 2-krav. Se `metamodel/nis2-mappings.yaml`

### 4. Dokumentationsmallar
Färdiga mallar för att dokumentera olika typer av komponenter. Se `templates/`

## Quick Start

1. Börja med att identifiera dina kritiska tillgångar (Business Capabilities)
2. Dokumentera applikationer och system som stödjer dessa
3. Dokumentera den underliggande tekniska infrastrukturen
4. Komplettera med säkerhetskontroller och risker
5. Dokumentera dataflöden och dataskydd
6. Länka samman alla perspektiv

## Mappning till Etablerade EA-Ramverk

Detta ramverk är kompatibelt med:
- **TOGAF** (The Open Group Architecture Framework)
- **ArchiMate** (modelleringsspråk)
- **COBIT** (IT Governance)
- **ISO/IEC 27001** (Informationssäkerhet)

## Struktur

```
/
├── README.md                          # Denna fil
├── metamodel/
│   ├── core-metamodel.yaml           # Kärnmetamodell
│   ├── nis2-mappings.yaml            # NIS 2 mappningar
│   └── relationships.yaml            # Relationstyper
├── perspectives/
│   ├── business-architecture.md      # Verksamhetsperspektiv
│   ├── application-architecture.md   # Applikationsperspektiv
│   ├── technology-architecture.md    # Teknologiperspektiv
│   ├── security-architecture.md      # Säkerhetsperspektiv
│   └── data-architecture.md          # Dataperspektiv
├── templates/
│   ├── system-documentation.yaml     # Mall för systemdokumentation
│   ├── component-documentation.yaml  # Mall för komponentdokumentation
│   └── risk-assessment.yaml          # Mall för riskbedömning
└── examples/
    └── sample-system.yaml            # Exempel på komplett systemdokumentation
```

## Användning

Se respektive perspektiv-dokumentation i `perspectives/` för detaljerad vägledning om hur varje perspektiv ska dokumenteras.

## Compliance-rapportering

Ramverket inkluderar mallar för att generera compliance-rapporter som visar hur NIS 2-kraven uppfylls genom dokumenterade element i metamodellen.

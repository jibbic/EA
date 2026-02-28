# Enterprise Architecture Framework - Web Application

En modern, interaktiv webbapplikation för att visualisera och hantera enterprise-arkitektur enligt ArchiMate 3.1.

## ✨ Funktioner

### 📊 Dashboard
- Översikt över alla entiteter och relationer
- Arkitekturkvalitet och täckningsgrad
- Snabb navigation till olika perspektiv
- Statistik och nyckeltal per skikt

### 🔍 Visualisering
- Interaktiv graf med Cytoscape.js
- Visa relationer mellan entiteter
- Filtrera efter arkitekturskikt
- Exportera som PNG
- Zoom och panorera för detaljerad utforskning
- Klickbara noder med QuickView

### 📁 Entitetshantering
- Bläddra bland alla entiteter
- Sök och filtrera efter typ och skikt
- Detaljvyer för varje entitet
- Se relationer och beroenden
- CRUD-operationer för alla ArchiMate-element

### 🏗️ Arkitekturperspektiv
- **Business Architecture**: Processer, kapabiliteter, organisation
- **Application Architecture**: System och komponenter
- **Technology Architecture**: Infrastruktur och plattformar
- **Motivation Architecture**: Mål, krav och principer
- **Strategy Architecture**: Kapabiliteter och resurser
- **Physical Architecture**: Fysisk utrustning
- **Implementation & Migration**: Projekt och gap-analys

### 📅 Projekt & Portfölj
- Projektportföljöversikt med flera vyer
- Roadmap med tidslinje
- Budget- och impact-analys
- Resursplanering med månadsallokering
- Milstolpar och deliverables

## 🚀 Komma igång

### Förutsättningar
- Node.js 18+ och npm

### Installation

1. Navigera till webapp-mappen:
```powershell
cd webapp
```

2. Installera beroenden:
```powershell
npm install
```

3. Starta utvecklingsservern:
```powershell
npm run dev
```

4. Öppna webbläsaren på `http://localhost:3000`

### Bygga för produktion

```powershell
npm run build
```

Byggda filer hamnar i `dist/`-mappen.

## 🎨 Teknisk Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Visualisering**: Cytoscape.js med Cola layout
- **Ikoner**: Lucide React
- **Data Format**: YAML parsing med js-yaml

## 📐 Arkitektur

```
src/
├── components/          # Återanvändbara komponenter
│   └── Layout.jsx      # Huvudlayout med navigation
├── pages/              # Sidkomponenter
│   ├── Dashboard.jsx   # Översiktsdashboard
│   ├── EntityBrowser.jsx  # Bläddra entiteter
│   ├── EntityDetail.jsx   # Entitetsdetaljer
│   ├── Perspectives.jsx   # Arkitekturperspektiv
│   ├── Visualizer.jsx     # Graf-visualisering
│   └── Compliance.jsx     # NIS 2 compliance
├── context/            # React Context för state
│   └── DataContext.jsx # Global data management
├── App.jsx             # Huvudapplikation med routing
├── main.jsx           # Entry point
└── index.css          # Global CSS
```

## 🎯 Användning

### Navigera i applikationen

1. **Dashboard**: Få en snabb översikt över compliance och statistik
2. **Visualisering**: Se hela arkitekturen som en interaktiv graf
3. **Entiteter**: Bläddra och hantera alla dokumenterade entiteter
4. **Perspektiv**: Utforska olika arkitekturskikt
5. **Compliance**: Kontrollera NIS 2-status och identifiera gap

### Filtrera och söka

- Använd sökfältet för att hitta specifika entiteter
- Filtrera efter arkitekturskikt eller entitetstyp
- Klicka på entiteter för att se detaljer och relationer

### Visualisering

- **Zoom**: Mushjul eller zoom-knappar
- **Panorera**: Dra i bakgrunden
- **Välj nod**: Klicka på en entitet
- **Flytta nod**: Dra en entitet
- **Exportera**: Klicka på nedladdningsknappen

## 🔧 Utbyggnad

### Lägga till nya entiteter

Redigera `src/context/DataContext.jsx` och lägg till i `initialEntities`-objektet:

```javascript
const initialEntities = {
  EntityType: [
    {
      id: 'unique-id',
      name: 'Entity Name',
      description: 'Description',
      // ... fler attribut
    }
  ]
};
```

### Lägga till relationer

```javascript
const initialRelationships = [
  {
    id: 'rel-id',
    source: 'entity-id-1',
    target: 'entity-id-2',
    type: 'relationship_type',
    description: 'Description'
  }
];
```

### Anpassa styling

Editera `tailwind.config.js` för att ändra färgtema och designvariabler.

## 📚 Integration med Framework

Applikationen är byggd för att komplettera NIS 2 EA Framework:

- Läser samma datastruktur som YAML-templates
- Följer samma metamodell och entitetstyper
- Mappningar till NIS 2-artiklar är konsekventa
- Kan användas för att dokumentera enligt templates

## 🛠️ Utveckling

### Lägg till ny sida

1. Skapa komponent i `src/pages/`
2. Lägg till route i `src/App.jsx`
3. Lägg till navigationslänk i `src/components/Layout.jsx`

### Lägg till ny visualisering

Använd Cytoscape.js eller andra React-kompatibla visualiseringsbibliotek.

## 📄 Licens

Del av NIS 2 Enterprise Architecture Framework v1.0

## 🤝 Bidrag

Använd och anpassa fritt enligt organisationens behov!

## 📞 Support

För frågor om NIS 2-direktivet eller arkitekturreferenser, se huvuddokumentationen i `C:\NIS2-EA-Framework\`.

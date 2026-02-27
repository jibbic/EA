# 💾 Lokal Datalagring - NIS 2 EA WebApp

## Översikt

Din webapp använder nu **localStorage** för att spara all data lokalt i webbläsaren. Detta ger dig persistent data utan att behöva en backend-server eller databas.

## ✅ Vad som är implementerat

### 1. Auto-Save med localStorage
- All data sparas **automatiskt** när du gör ändringar
- Data **överlever siduppdateringar** och omstarter av webbläsaren
- Sparar entiteter och relationer i realtid
- Ingen manuell "Spara"-knapp behövs

### 2. Settings-sida (http://localhost:5173/settings)

#### Export till JSON
- Ladda ner all data som en JSON-fil
- Använd för backup eller för att dela data mellan datorer
- Innehåller alla entiteter och relationer
- Filnamn: `nis2-export-YYYY-MM-DD.json`

#### Import från JSON
- Ladda upp en tidigare exporterad JSON-fil
- Återställ data från backup
- **⚠️ OBS:** Ersätter ALL befintlig data

#### Reset till ursprungsdata
- Återställ till exempeldata som fanns från början
- Användbart för demo eller om du vill börja om
- **⚠️ OBS:** Tar bort all din data permanent

#### Statistik
- Antal entiteter per typ
- Antal relationer
- Total lagringsstorlek i webbläsaren

### 3. Metamodell-baserad Validering
- Endast **tillåtna relationer** enligt `core-metamodel.yaml` kan skapas
- UI visar dynamiskt vilka relationstyper som är tillåtna
- Röd varning om ingen relation är tillåten mellan två entitetstyper
- Validering sker före sparning

## 🎯 Så här fungerar det

### Automatisk lagring
```javascript
// När du lägger till en entitet:
addEntity('ApplicationSystem', newEntity);
// → Sparas automatiskt till localStorage

// När du lägger till en relation:
addRelationship(newRelation);
// → Valideras mot metamodell
// → Sparas automatiskt till localStorage
```

### Data-struktur i localStorage
```json
{
  "nis2-entities": {
    "ApplicationSystem": [...],
    "SecurityControl": [...],
    ...
  },
  "nis2-relationships": [
    {
      "id": "rel-001",
      "source": "app-001",
      "target": "infra-001",
      "type": "hosted_on",
      "description": "..."
    }
  ]
}
```

## 📋 Best Practices

### Backup-strategi
1. **Exportera regelbundet** - Gör backup via Settings
2. **Spara JSON-filer** på säker plats (OneDrive, etc.)
3. **Versionshantera** viktiga versioner med datum i filnamnet

### Dela data mellan datorer
1. Exportera från dator A → JSON-fil
2. Kopiera fil till dator B
3. Importera på dator B

### Dela data mellan webbläsare
- Data är **isolerad per webbläsare**
- Chrome och Edge har **separat data**
- Använd Export/Import för att flytta data

## ⚠️ Begränsningar

### Dataförlust-risker
- **Rensa webbläsardata** = all data försvinner
- **Privat läge** (Incognito) = data försvinner när du stänger fönstret
- **Olika dator** = ingen data (importera backup)

### Storleksgräns
- localStorage har typiskt **5-10 MB** gräns
- Mer än tillräckligt för EA-data (tusentals entiteter)
- Nuvarande storlek visas i Settings

### Ingen synkronisering
- Data synkas **inte automatiskt** mellan enheter
- Flera användare ser **inte samma data**
- För team-användning → behövs backend (framtida upgrade)

## 🚀 Framtida uppgraderingar

När ni är redo för produktion kan ni enkelt uppgradera till:

### Alternativ 1: Supabase (snabbast)
```bash
# Installera Supabase client
npm install @supabase/supabase-js

# Migrera DataContext till Supabase
# → Gratis tier: 500 MB databas + auth
# → Automatisk synk mellan användare
```

### Alternativ 2: Node.js + PostgreSQL (full kontroll)
```bash
# Backend API
cd ../backend
npm init -y
npm install express pg cors

# Frontend anropar API istället för localStorage
```

### Alternativ 3: Electron (desktop-app)
```bash
# Wrapper för att läsa/skriva YAML-filer direkt
npm install electron
# → Synka med befintliga YAML-filer i C:\NIS2-EA-Framework\
```

## 🧪 Testa funktionaliteten

1. **Öppna appen**: http://localhost:5173
2. **Lägg till entitet**: Gå till Entiteter → Lägg till
3. **Uppdatera sidan** (F5) → Data finns kvar ✅
4. **Gå till Settings**: http://localhost:5173/settings
5. **Exportera data** → JSON-fil laddas ner
6. **Lägg till mer data**
7. **Importera den gamla filen** → Återställt till tidigare state

## 💡 Tips

### För demo/presentation
- Använd Reset-funktionen för att börja med ren exempeldata
- Exportera din "bästa" version och importera före demos

### För utveckling
- Öppna DevTools → Application → Local Storage
- Se exakt vad som sparas i realtid
- Testa genom att manuellt rensa localStorage

### För backup
- Sätt upp en GitHub repo för JSON-exports
- Automatisera backup med cron/scheduled task:
```powershell
# Spara detta i backup-script.ps1
$exportPath = "C:\NIS2-EA-Backups"
Start-Process chrome "http://localhost:5173/settings"
# Klicka Export manuellt, eller använd Puppeteer för automation
```

## 🆘 Troubleshooting

### "Data försvann efter siduppdatering"
- Kontrollera att du inte är i privat läge
- Kolla DevTools → Application → Local Storage → finns `nis2-entities`?
- Om tom → importera backup

### "Import fungerar inte"
- Kontrollera att JSON-filen är giltig (öppna i editor)
- Måste innehålla `entities` och `relationships` nycklar
- Använd endast exporter från samma version av appen

### "Kan inte lägga till relation"
- Kolla röd varning i modal → ingen tillåten relationstyp
- Se `core-metamodel.yaml` för vilka kombinationer som är tillåtna
- Exempel: SecurityControl → protects → ApplicationSystem ✅
- Exempel: BusinessProcess → protects → ApplicationSystem ❌

## 📚 Mer information

- **DataContext.jsx**: All logik för lagring och validering
- **Settings.jsx**: UI för export/import/reset
- **core-metamodel.yaml**: Definitioner av tillåtna relationer

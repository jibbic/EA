# 🚀 Deployment Guide - NIS 2 EA Framework

## Steg 1: Installera Git (om du inte har det)

Ladda ner och installera Git från: https://git-scm.com/download/win

## Steg 2: Skapa GitHub Repository

1. Gå till https://github.com
2. Klicka på "New repository" (gröna knappen)
3. Namnge repot: `nis2-ea-framework`
4. Välj "Public" (eller "Private" om du vill)
5. **VIKTIGT**: Markera INTE "Initialize with README" (vi har redan filer)
6. Klicka "Create repository"

## Steg 3: Pusha projektet till GitHub

Öppna PowerShell i `C:\NIS2-EA-Framework\` och kör:

```powershell
# Initiera Git repository
git init

# Lägg till alla filer
git add .

# Skapa första commit
git commit -m "Initial commit: NIS 2 EA Framework webapp"

# Lägg till GitHub remote (BYT UT 'dittanvändarnamn' mot ditt faktiska GitHub-användarnamn)
git remote add origin https://github.com/dittanvändarnamn/nis2-ea-framework.git

# Sätt branch-namn till main
git branch -M main

# Pusha till GitHub
git push -u origin main
```

**Tips**: Om du får felmeddelande om autentisering, använd GitHub Personal Access Token:
- Gå till GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token (classic)
- Välj scope: `repo` (full control)
- Kopiera token och använd som lösenord

## Steg 4: Deploya med Netlify

### Alternativ A: Via Netlify Drop (Snabbast!)

1. Gå till `C:\NIS2-EA-Framework\webapp\`
2. Kör: `npm run build`
3. Gå till https://app.netlify.com/drop
4. Dra och släpp `dist/` mappen
5. Klart! Du får en URL direkt

### Alternativ B: Via Git Integration (Automatisk deployment)

1. Gå till https://app.netlify.com (skapa konto om du inte har)
2. Klicka "Add new site" → "Import an existing project"
3. Välj "GitHub"
4. Auktorisera Netlify att accessa GitHub
5. Välj ditt `nis2-ea-framework` repo
6. Netlify detekterar automatiskt:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `webapp`
7. Klicka "Deploy site"

**Netlify kommer nu:**
- Bygga din app automatiskt
- Skapa en gratis URL (t.ex. `random-name-123.netlify.app`)
- Auto-deploya vid varje git push

## Steg 5: Anpassa URL (Valfritt)

1. I Netlify dashboard → "Site settings"
2. "Change site name"
3. Välj ett namn: `nis2-ea-demo` → blir `nis2-ea-demo.netlify.app`

## Steg 6: Testa din live site!

Öppna URL:en du fick från Netlify och testa applikationen.

## 🔄 Uppdatera din live site

Efter första deployment, för att uppdatera:

```powershell
# I C:\NIS2-EA-Framework\
git add .
git commit -m "Beskrivning av ändringar"
git push
```

Netlify bygger och deployar automatiskt!

## ⚠️ Viktigt att veta

- **localStorage data**: Varje användare har sin egen lokala data
- **Ingen databas**: Applikationen använder endast localStorage
- **Data delas INTE** mellan användare
- **Gratis tier**: Obegränsad bandwidth, 100 GB/månad, 300 build-minuter/månad

## 🆘 Felsökning

### Build misslyckas på Netlify
- Kontrollera att `Base directory` är satt till `webapp`
- Verifiera att `netlify.toml` finns i `webapp/` mappen

### 404-fel på routes
- `netlify.toml` innehåller redan rätt redirects
- Om problemet kvarstår, kontrollera att filen finns i `webapp/` katalogen

### Node version-fel
- Netlify använder automatiskt Node 18 (specificerat i `netlify.toml`)

## 📧 Support

Om du stöter på problem:
1. Kolla Netlify build logs
2. Testa bygga lokalt: `npm run build && npm run preview`
3. Verifiera att alla filer är committade: `git status`

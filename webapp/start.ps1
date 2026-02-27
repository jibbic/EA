# Navigera till webapp-mappen och starta applikationen

Write-Host "`n=== NIS 2 EA WebApp Setup ===" -ForegroundColor Cyan
Write-Host "Navigerar till webapp-mappen...`n" -ForegroundColor Yellow

Set-Location "C:\NIS2-EA-Framework\webapp"

# Kontrollera om node_modules existerar
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installerar npm-paket... (detta kan ta några minuter)`n" -ForegroundColor Yellow
    npm install
    Write-Host "`n✓ Installation klar!`n" -ForegroundColor Green
} else {
    Write-Host "✓ npm-paket redan installerade`n" -ForegroundColor Green
}

Write-Host "Startar utvecklingsserver...`n" -ForegroundColor Yellow
Write-Host "Applikationen öppnas snart i din webbläsare på http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nTryck Ctrl+C för att stoppa servern`n" -ForegroundColor Gray

npm run dev

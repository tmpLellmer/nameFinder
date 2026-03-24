# 🚀 Railway Deployment Guide

## Schritt-für-Schritt Anleitung

### 1. Repository auf GitHub pushen

```bash
cd /Users/l19438/Development/name-finder
git init
git add .
git commit -m "Initial commit: Baby Namen App"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/baby-names.git
git push -u origin main
```

### 2. Railway Deployment

1. **Railway Account erstellen:**
   - Gehe zu https://railway.app
   - Melde dich mit GitHub an

2. **Neues Project erstellen:**
   - Klicke auf "New Project"
   - Wähle "Deploy from GitHub repo"
   - Wähle dein `baby-names` Repository

3. **Environment Variables setzen:**
   - Klicke auf das Projekt
   - Gehe zu "Variables"
   - Füge folgende Variablen hinzu:

   ```
   CONTRIBUTOR_PASSWORD=dein-sicheres-passwort
   ADMIN_PASSWORD=dein-admin-passwort
   NODE_ENV=production
   ```

4. **Persistent Volume erstellen (wichtig für SQLite!):**
   - Gehe zu "Settings" → "Volumes"
   - Klicke auf "Add Volume"
   - Mount Path: `/app/data`
   - Das persistiert die SQLite-Datenbank zwischen Deployments

5. **Deploy auslösen:**
   - Railway deployed automatisch
   - Warte auf "Deployed successfully"
   - Klicke auf "View Logs" um den Fortschritt zu sehen

6. **Domain aufrufen:**
   - Railway generiert automatisch eine URL
   - Klicke auf "Settings" → "Generate Domain"
   - Öffne die URL in deinem Browser!

## Passwörter ändern

**WICHTIG:** Ändere die Passwörter vor dem Deployment!

In den Railway Environment Variables:
- `CONTRIBUTOR_PASSWORD`: Passwort für Freunde (zum Namen vorschlagen)
- `ADMIN_PASSWORD`: Dein Admin-Passwort (zum Anzeigen aller Namen)

## Share Link generieren

1. Logge dich als Admin ein
2. Kopiere den generierten Share Link
3. Sende den Link an Freunde per WhatsApp, E-Mail, etc.

Der Link enthält den Token, sodass Freunde sich automatisch anmelden können!
    
## Vorteile dieser Lösung

✅ **Keine externe Datenbank nötig** - SQLite läuft direkt in der App
✅ **Kostenlos** - Railway Free Tier reicht komplett aus
✅ **Einfach** - Keine Datenbank-Konfiguration nötig
✅ **Persistent** - Daten bleiben durch Railway Volumes erhalten
✅ **Schnell** - SQLite ist super schnell für kleine Apps

## Kosten

**Railway Free Tier:**
- $5 kostenlose Credits pro Monat
- Ausreichend für eine kleine App mit ~100 Besuchern/Monat
- **Keine externe Datenbank = Keine zusätzlichen Kosten!**

## Troubleshooting

### App startet nicht?
- Überprüfe die Railway Logs
- Stelle sicher, dass alle Environment Variables gesetzt sind
- Prüfe, ob das Volume `/app/data` gemountet ist

### Namen werden nicht gespeichert?
- Überprüfe die Railway Logs
- Stelle sicher, dass das Persistent Volume korrekt konfiguriert ist
- Path muss `/app/data` sein (nicht `/data`)

### Datenbank geht nach Redeploy verloren?
- Du hast wahrscheinlich kein Persistent Volume erstellt
- Gehe zu Settings → Volumes → Add Volume
- Mount Path: `/app/data`

## Support

Bei Fragen oder Problemen:
- Railway Docs: https://docs.railway.app
- Railway Volumes: https://docs.railway.app/guides/volumes
- Astro Docs: https://docs.astro.build

Viel Erfolg und viel Spaß beim Namen sammeln! 👶💝



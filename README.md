# 👶 Baby Namen Sammler
  
Eine einfache Web-App zum Sammeln von Babynamen-Vorschlägen von Freunden und Familie.

## Features

- 🔐 **Zwei Zugriffsebenen:**
  - Contributor: Können Namen vorschlagen
  - Admin: Kann alle Namen sehen mit Zählern

- 🔗 **Token-basierte Links:**
  - Generiere einen Link zum Teilen
  - Freunde können direkt über den Link zugreifen

- 📊 **Intelligente Zusammenfassung:**
  - Doppelte Namen werden gezählt
  - Zeigt an, wer welchen Namen vorgeschlagen hat
  - Sortiert nach Beliebtheit

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Deployment auf Railway

1. Setze die Environment Variables in Railway

## Environment Variables

```
CONTRIBUTOR_PASSWORD=dein-passwort
ADMIN_PASSWORD=dein-admin-passwort
NODE_ENV=production
```

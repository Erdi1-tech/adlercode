# Adlercode Supabase Migration

Diese Migration ist modular angelegt. Das bestehende statische Frontend bleibt funktionsfaehig, waehrend echte Daten schrittweise aus Supabase geladen werden.

## Zielarchitektur

- Authentifizierung: Supabase Auth
- Datenbank: Supabase PostgreSQL
- Sicherheit: Row Level Security
- Dateien: Supabase Storage
- Live-Daten: Supabase Realtime
- KI spaeter: Edge Functions oder eigener Server, niemals direkt aus dem Browser

## Reihenfolge

1. Supabase-Projekt erstellen.
2. `.env.example` als lokale `.env` kopieren und echte Werte lokal eintragen.
3. `supabase/config.example.js` als `supabase/config.local.js` kopieren und mit URL + anon key fuellen.
4. SQL-Migrationen in dieser Reihenfolge ausfuehren:
   - `database/migrations/001_supabase_core_schema.sql`
   - `database/migrations/002_rls_policies.sql`
   - `database/migrations/003_storage_buckets.sql`
   - `database/migrations/004_realtime_publication.sql`
   - `database/migrations/005_ai_preparation.sql`
5. In Supabase Auth E-Mail/Passwort aktivieren.
6. Redirect URLs setzen:
   - lokale Entwicklung
   - Produktionsdomain
   - `/profil/`
7. Demo-Daten schrittweise migrieren:
   - Ressourcen
   - Experten
   - Werkzeuge
   - Projekte
   - danach Muster, Buecher, Community

## Sicherheitsprinzipien

- Der Browser verwendet nur den Supabase anon key.
- Service role key bleibt ausschliesslich serverseitig.
- Private Inhalte werden per RLS geschuetzt.
- Oeffentliche Inhalte bleiben fuer Gaeste lesbar.
- Nutzer koennen nur eigene private Inhalte bearbeiten.
- Experten koennen nur eigene Experteninhalte bearbeiten.
- Admin-Rechte werden ueber `profiles.is_admin` gesteuert.

## Datenzugriff

UI-Komponenten sollen nicht direkt Supabase abfragen. Stattdessen:

- `services/auth-service.js`
- `services/platform-repository.js`
- `services/supabase-service.js`

So kann spaeter von Demo-Daten auf echte Daten gewechselt werden, ohne das Design oder die Komponenten neu zu bauen.

## KI-Vorbereitung

OpenAI wird spaeter nicht im Browser aufgerufen. Vorgesehen ist:

1. Browser sendet Analyseanfrage an Supabase Edge Function.
2. Edge Function prueft Auth, Rate Limits und Rechte.
3. Edge Function ruft OpenAI mit Server-Key auf.
4. Ergebnis wird in `ratings`, `resources`, `patterns` oder einer spaeteren `ai_analyses` Tabelle gespeichert.

## Noch offen

- Supabase-Projekt manuell erstellen.
- Echte Keys lokal eintragen.
- Migrations ausfuehren.
- Seed-Skript fuer bestehende Demo-Daten bauen.
- Bestehende `localStorage` Auth schrittweise durch Supabase Auth ersetzen.
- Bestehende Ressourcenbank zuerst an `platform-repository.js` anschliessen.

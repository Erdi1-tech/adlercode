# Adlercode Justice Datenstruktur

Diese Struktur ist fuer Supabase/PostgreSQL vorbereitet. Sie legt noch keine echte Backend-Anbindung in der Website an.

## Kernobjekte

- `profiles`: Benutzerprofil, verbunden mit `auth.users`.
- `justice_cases`: Faelle und Fallanalysen.
- `justice_comments`: Kommentare zu Faellen.
- `justice_ratings`: Bewertungen fuer Faelle, Analyseabschnitte oder Kommentare.
- `justice_terms`: Begriffe der Justice-Bibliothek.
- `justice_books`, `justice_films`, `justice_experts`: verknuepfbare Ressourcen.
- `justice_categories`, `justice_tags`: Ordnung und Filter.
- `justice_notifications`: Benachrichtigungen.
- `justice_favorites`: Favoriten fuer Faelle, Begriffe, Buecher, Filme und Experten.

## Wichtige Beziehungen

- Ein Benutzer (`profiles`) kann viele Faelle, Kommentare, Bewertungen, Favoriten und Benachrichtigungen besitzen.
- Ein Fall gehoert optional einem Benutzer und einer Kategorie.
- Ein Fall kann mehrere Tags, Begriffe, Buecher und Filme haben.
- Ein Begriff kann mit anderen Begriffen verknuepft werden.
- Experten koennen mit Begriffen verbunden werden.
- Bewertungen nutzen Metrics wie Verantwortung, Narrativkontrolle, Kommunikation, Rollenwechsel oder Eskalation.

## Globales Verknuepfungssystem

Das moduluebergreifende Herzstueck liegt in:

- `../../database/adlercode-link-system.sql`

Justice-spezifische Join-Tabellen koennen fuer direkte Abfragen genutzt werden. Langfristig sollten neue Querverbindungen jedoch ueber `adler_entities` und `adler_links` laufen, damit Justice, Mind, Business, Politics, Relationships, Health und Academy dieselbe Struktur verwenden.

## Supabase-Hinweise

- `profiles.id` referenziert `auth.users(id)`.
- Row Level Security ist vorbereitet.
- Echte Policies sollten erst beim Backend-Anschluss aktiviert und getestet werden.
- Private Faelle duerfen nur vom Besitzer gelesen werden.
- Oeffentliche Faelle sollten nur sichtbar sein, wenn `visibility = 'public'` und `moderation_status = 'allowed'`.
- Favoriten und Benachrichtigungen sind immer nutzerbezogen.

## Naechster Backend-Schritt

1. Schema in Supabase SQL Editor testen.
2. RLS-Policies konkret anlegen.
3. Views fuer Community-Durchschnitte erstellen.
4. Website-Demo-Daten schrittweise gegen Supabase-Abfragen austauschen.

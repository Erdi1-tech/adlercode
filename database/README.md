# Adlercode Globales Verknuepfungssystem

Dieses System bildet das Herzstueck der Plattform: Jeder Datensatz wird als Entity registriert und kann ueber `adler_links` mit jedem anderen Datensatz verbunden werden.

## Supabase Migration

Die produktionsreife Supabase-Grundlage liegt in `database/migrations/`.

Empfohlene Reihenfolge:

1. `001_supabase_core_schema.sql`
2. `002_rls_policies.sql`
3. `003_storage_buckets.sql`
4. `004_realtime_publication.sql`
5. `005_ai_preparation.sql`

Die technische Migrationsdokumentation liegt unter `docs/SUPABASE_MIGRATION.md`.

Das vorhandene `adlercode-link-system.sql` bleibt als frueher Entwurf des globalen Verknuepfungssystems erhalten. Fuer neue Supabase-Projekte sollte die Migrationsstruktur verwendet werden.

## Prinzip

1. Ein realer Datensatz entsteht, z. B. ein Justice-Fall, ein Begriff, ein Film oder ein Buch.
2. Dieser Datensatz wird in `adler_entities` als einheitliche Entity registriert.
3. Beziehungen zwischen Entities werden in `adler_links` gespeichert.

Dadurch muss nicht fuer jede Kombination eine eigene Tabelle gebaut werden.

## Beispiele

### Fall

Ein Fall kann verknuepft werden mit:

- Begriffen
- Filmen
- Buechern
- Experten
- Kommentaren
- Community-Threads

### Begriff

Ein Begriff kann verknuepft werden mit:

- Modellen
- Faellen
- Buechern
- Filmen
- Experten

### Film

Ein Film kann verknuepft werden mit:

- Charakteren
- Faellen
- Begriffen
- Buechern

## Wichtige Tabellen

- `adler_entities`: einheitliches Register aller Objekte.
- `adler_links`: gerichtete Verbindungen zwischen zwei Entities.
- `adler_link_collections`: persoenliche oder oeffentliche Sammlungen von Entities.
- `adler_entity_links`: View fuer einfache Abfragen von Quelle, Ziel und Linktyp.

## Linktypen

Beispiele:

- `related`
- `mentions`
- `explains`
- `uses_model`
- `similar_pattern`
- `recommended`
- `comment_on`
- `favorite`
- `community_context`

## Warum modular?

Adlercode Mind, Justice, Politics, Business, Relationships, Health und Academy koennen dieselbe Struktur verwenden.

Der Unterschied liegt nur im Inhalt:

- Mind: Filme, Charaktere, Begriffe
- Justice: Faelle, Verantwortung, Rollen
- Business: Unternehmensfaelle, Organisation, Fuehrung
- Politics: Ereignisse, Akteure, Narrative

Die Verknuepfung bleibt immer gleich.

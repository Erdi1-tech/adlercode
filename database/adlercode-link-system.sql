-- Adlercode global linking system
-- Target: Supabase / PostgreSQL
-- Purpose: every record can be linked to every other record through one modular graph layer.

create extension if not exists "pgcrypto";

create type public.adler_entity_type as enum (
  'user',
  'profile',
  'case',
  'analysis',
  'analysis_section',
  'comment',
  'term',
  'model',
  'category',
  'tag',
  'book',
  'film',
  'character',
  'expert',
  'community_thread',
  'notification',
  'module'
);

create type public.adler_link_type as enum (
  'related',
  'mentions',
  'explains',
  'uses_model',
  'similar_pattern',
  'contrasts',
  'supports',
  'challenges',
  'source',
  'recommended',
  'belongs_to',
  'created_by',
  'comment_on',
  'favorite',
  'community_context'
);

create type public.adler_link_visibility as enum ('private', 'public', 'system');

create table if not exists public.adler_entities (
  id uuid primary key default gen_random_uuid(),
  entity_type public.adler_entity_type not null,
  module_key text not null default 'mind',
  source_table text,
  source_id uuid,
  external_id text,
  slug text,
  title text not null,
  summary text,
  url text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (entity_type, source_table, source_id),
  unique (module_key, entity_type, slug)
);

create table if not exists public.adler_links (
  id uuid primary key default gen_random_uuid(),
  source_entity_id uuid not null references public.adler_entities(id) on delete cascade,
  target_entity_id uuid not null references public.adler_entities(id) on delete cascade,
  link_type public.adler_link_type not null default 'related',
  visibility public.adler_link_visibility not null default 'public',
  weight numeric(5,2) not null default 1.00,
  confidence numeric(5,2),
  title text,
  context text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (source_entity_id <> target_entity_id),
  unique (source_entity_id, target_entity_id, link_type)
);

create table if not exists public.adler_link_collections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  module_key text not null default 'mind',
  title text not null,
  description text,
  visibility public.adler_link_visibility not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.adler_link_collection_items (
  collection_id uuid not null references public.adler_link_collections(id) on delete cascade,
  entity_id uuid not null references public.adler_entities(id) on delete cascade,
  position integer not null default 0,
  note text,
  primary key (collection_id, entity_id)
);

create index if not exists idx_adler_entities_type_module on public.adler_entities(entity_type, module_key);
create index if not exists idx_adler_entities_source on public.adler_entities(source_table, source_id);
create index if not exists idx_adler_entities_slug on public.adler_entities(module_key, slug);
create index if not exists idx_adler_links_source on public.adler_links(source_entity_id, link_type);
create index if not exists idx_adler_links_target on public.adler_links(target_entity_id, link_type);
create index if not exists idx_adler_links_visibility on public.adler_links(visibility);

create or replace view public.adler_entity_links as
select
  l.id as link_id,
  l.link_type,
  l.visibility,
  l.weight,
  l.confidence,
  l.context,
  source.id as source_id,
  source.entity_type as source_type,
  source.module_key as source_module,
  source.title as source_title,
  source.url as source_url,
  target.id as target_id,
  target.entity_type as target_type,
  target.module_key as target_module,
  target.title as target_title,
  target.url as target_url,
  l.created_at
from public.adler_links l
join public.adler_entities source on source.id = l.source_entity_id
join public.adler_entities target on target.id = l.target_entity_id;

-- Helper examples:
-- Case -> terms, films, books, experts, comments, community:
-- source entity_type = 'case', target entity_type in ('term','film','book','expert','comment','community_thread')
--
-- Term -> models, cases, books, films, experts:
-- source entity_type = 'term', target entity_type in ('model','case','book','film','expert')
--
-- Film -> characters, cases, terms, books:
-- source entity_type = 'film', target entity_type in ('character','case','term','book')

alter table public.adler_entities enable row level security;
alter table public.adler_links enable row level security;
alter table public.adler_link_collections enable row level security;
alter table public.adler_link_collection_items enable row level security;

-- Suggested RLS policies:
-- adler_entities: public read for public/system entities; owner write for private entities.
-- adler_links: public read when visibility='public'; owner read/write for private links.
-- adler_link_collections: owner read/write unless visibility='public'.
-- adler_link_collection_items: inherited access through parent collection.

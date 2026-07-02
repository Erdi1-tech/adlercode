-- Adlercode Supabase core schema
-- Target: Supabase / PostgreSQL
-- Scope: Auth-linked profiles, platform content, relational linking, comments, ratings, bookmarks and notifications.

create extension if not exists "pgcrypto";
create extension if not exists "citext";

create type public.platform_module as enum ('mind', 'justice', 'politics', 'business', 'relationships', 'health', 'academy', 'global');
create type public.content_visibility as enum ('private', 'public', 'system');
create type public.moderation_status as enum ('allowed', 'review', 'blocked');
create type public.entity_type as enum ('profile', 'resource', 'tool', 'expert', 'book', 'pattern', 'project', 'discussion', 'comment', 'rating', 'category', 'tag', 'notification');
create type public.link_type as enum ('related', 'mentions', 'uses', 'explains', 'recommended', 'belongs_to', 'created_by', 'discusses', 'supports', 'contrasts');
create type public.notification_type as enum ('comment', 'rating', 'bookmark', 'discussion', 'message', 'system');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username citext unique,
  display_name text,
  email citext,
  bio text,
  avatar_url text,
  role text not null default 'member',
  is_expert boolean not null default false,
  is_admin boolean not null default false,
  visibility public.content_visibility not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  module_key public.platform_module not null default 'global',
  name text not null,
  slug text not null,
  description text,
  parent_id uuid references public.categories(id) on delete set null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  module_key public.platform_module not null default 'global',
  name text not null,
  slug text not null,
  description text,
  created_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.patterns (
  id uuid primary key default gen_random_uuid(),
  module_key public.platform_module not null default 'mind',
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null,
  definition text not null,
  summary text,
  visibility public.content_visibility not null default 'public',
  moderation_status public.moderation_status not null default 'allowed',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  module_key public.platform_module not null default 'global',
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null,
  description text,
  resource_type text not null default 'article',
  url text,
  file_path text,
  language text default 'de',
  is_free boolean not null default true,
  visibility public.content_visibility not null default 'public',
  moderation_status public.moderation_status not null default 'allowed',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  module_key public.platform_module not null default 'global',
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null,
  description text,
  use_case text,
  url text,
  visibility public.content_visibility not null default 'public',
  moderation_status public.moderation_status not null default 'allowed',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  module_key public.platform_module not null default 'mind',
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null,
  author text,
  description text,
  cover_path text,
  file_path text,
  stripe_payment_link text,
  price_cents integer,
  currency text not null default 'eur',
  visibility public.content_visibility not null default 'public',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.experts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  module_key public.platform_module not null default 'global',
  name text not null,
  slug text not null,
  description text,
  specialties text[] not null default '{}',
  image_path text,
  website_url text,
  verified boolean not null default false,
  visibility public.content_visibility not null default 'public',
  moderation_status public.moderation_status not null default 'allowed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  module_key public.platform_module not null default 'global',
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null,
  description text,
  status text not null default 'draft',
  visibility public.content_visibility not null default 'public',
  moderation_status public.moderation_status not null default 'allowed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists public.discussions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  module_key public.platform_module not null default 'global',
  title text not null,
  body text,
  visibility public.content_visibility not null default 'public',
  moderation_status public.moderation_status not null default 'allowed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  discussion_id uuid references public.discussions(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  moderation_status public.moderation_status not null default 'allowed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  module_key public.platform_module not null default 'global',
  target_entity_id uuid,
  rating_type text not null,
  values jsonb not null default '{}'::jsonb,
  note text,
  visibility public.content_visibility not null default 'private',
  moderation_status public.moderation_status not null default 'allowed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_entity_id uuid not null,
  note text,
  created_at timestamptz not null default now(),
  unique (user_id, target_entity_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  notification_type public.notification_type not null default 'system',
  title text not null,
  body text,
  target_entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.entities (
  id uuid primary key default gen_random_uuid(),
  entity_type public.entity_type not null,
  module_key public.platform_module not null default 'global',
  source_table text,
  source_id uuid,
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

create table if not exists public.entity_links (
  id uuid primary key default gen_random_uuid(),
  source_entity_id uuid not null references public.entities(id) on delete cascade,
  target_entity_id uuid not null references public.entities(id) on delete cascade,
  link_type public.link_type not null default 'related',
  visibility public.content_visibility not null default 'public',
  weight numeric(5,2) not null default 1.00,
  context text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (source_entity_id <> target_entity_id),
  unique (source_entity_id, target_entity_id, link_type)
);

create table if not exists public.entity_tags (
  entity_id uuid not null references public.entities(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (entity_id, tag_id)
);

do $$
begin
  alter table public.ratings
    add constraint ratings_target_entity_id_fkey
    foreign key (target_entity_id) references public.entities(id) on delete set null;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.bookmarks
    add constraint bookmarks_target_entity_id_fkey
    foreign key (target_entity_id) references public.entities(id) on delete cascade;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter table public.notifications
    add constraint notifications_target_entity_id_fkey
    foreign key (target_entity_id) references public.entities(id) on delete set null;
exception when duplicate_object then null;
end $$;

create index if not exists idx_profiles_username on public.profiles(username);
create index if not exists idx_resources_module_visibility on public.resources(module_key, visibility);
create index if not exists idx_tools_module_visibility on public.tools(module_key, visibility);
create index if not exists idx_experts_module_visibility on public.experts(module_key, visibility);
create index if not exists idx_projects_module_visibility on public.projects(module_key, visibility);
create index if not exists idx_patterns_module_visibility on public.patterns(module_key, visibility);
create index if not exists idx_comments_discussion on public.comments(discussion_id, created_at);
create index if not exists idx_ratings_author on public.ratings(author_id, created_at);
create index if not exists idx_notifications_user on public.notifications(user_id, read_at, created_at);
create index if not exists idx_entities_type_module on public.entities(entity_type, module_key);
create index if not exists idx_entity_links_source on public.entity_links(source_entity_id, link_type);
create index if not exists idx_entity_links_target on public.entity_links(target_entity_id, link_type);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, username, display_name)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'username', ''),
    coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'patterns', 'resources', 'tools', 'books', 'experts',
    'projects', 'discussions', 'comments', 'ratings', 'entities', 'entity_links'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name,
      table_name
    );
  end loop;
end $$;

create or replace view public.entity_links_view as
select
  link.id,
  link.source_entity_id,
  link.target_entity_id,
  link.link_type,
  link.visibility,
  link.weight,
  link.context,
  source.entity_type as source_type,
  source.title as source_title,
  target.entity_type as target_type,
  target.title as target_title,
  target.url as target_url,
  link.created_at
from public.entity_links link
join public.entities source on source.id = link.source_entity_id
join public.entities target on target.id = link.target_entity_id;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'categories', 'tags', 'patterns', 'resources', 'tools', 'books', 'experts',
    'projects', 'discussions', 'comments', 'ratings', 'bookmarks', 'notifications',
    'entities', 'entity_links', 'entity_tags'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

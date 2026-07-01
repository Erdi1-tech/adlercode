-- Adlercode Justice database structure
-- Target: Supabase / PostgreSQL
-- This schema prepares real data persistence without adding API keys or backend code.

create extension if not exists "pgcrypto";

create type public.visibility_status as enum ('private', 'public', 'unlisted');
create type public.moderation_status as enum ('allowed', 'review', 'blocked');
create type public.notification_status as enum ('unread', 'read', 'archived');
create type public.favorite_target_type as enum ('case', 'term', 'book', 'film', 'expert');
create type public.rating_target_type as enum ('case', 'analysis_section', 'comment');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  role text not null default 'member',
  community_rank text not null default 'member',
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.justice_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.justice_tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.justice_terms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_definition text not null,
  long_definition text,
  category_id uuid references public.justice_categories(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  moderation_status public.moderation_status not null default 'allowed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.justice_term_relations (
  id uuid primary key default gen_random_uuid(),
  source_term_id uuid not null references public.justice_terms(id) on delete cascade,
  target_term_id uuid not null references public.justice_terms(id) on delete cascade,
  relation_type text not null default 'related',
  unique (source_term_id, target_term_id, relation_type)
);

create table if not exists public.justice_cases (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text unique,
  summary text,
  category_id uuid references public.justice_categories(id) on delete set null,
  situation text,
  participants text,
  narrative_analysis text,
  system_analysis text,
  moral_analysis text,
  user_comment text,
  visibility public.visibility_status not null default 'private',
  moderation_status public.moderation_status not null default 'review',
  community_rating_count integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.justice_case_tags (
  case_id uuid not null references public.justice_cases(id) on delete cascade,
  tag_id uuid not null references public.justice_tags(id) on delete cascade,
  primary key (case_id, tag_id)
);

create table if not exists public.justice_case_terms (
  case_id uuid not null references public.justice_cases(id) on delete cascade,
  term_id uuid not null references public.justice_terms(id) on delete cascade,
  relation_type text not null default 'mentioned',
  primary key (case_id, term_id, relation_type)
);

create table if not exists public.justice_comments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.justice_cases(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  moderation_status public.moderation_status not null default 'allowed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.justice_rating_metrics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text
);

create table if not exists public.justice_ratings (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  target_type public.rating_target_type not null,
  case_id uuid references public.justice_cases(id) on delete cascade,
  comment_id uuid references public.justice_comments(id) on delete cascade,
  section_key text,
  metric_id uuid not null references public.justice_rating_metrics(id) on delete restrict,
  value integer not null check (value between 0 and 100),
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (author_id, target_type, case_id, comment_id, section_key, metric_id)
);

create table if not exists public.justice_books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  author text,
  description text,
  cover_url text,
  purchase_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.justice_films (
  id uuid primary key default gen_random_uuid(),
  tmdb_id integer unique,
  title text not null,
  release_year integer,
  description text,
  poster_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.justice_experts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  title text,
  bio text,
  website_url text,
  verification_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.justice_case_books (
  case_id uuid not null references public.justice_cases(id) on delete cascade,
  book_id uuid not null references public.justice_books(id) on delete cascade,
  relation_type text not null default 'recommended',
  primary key (case_id, book_id, relation_type)
);

create table if not exists public.justice_case_films (
  case_id uuid not null references public.justice_cases(id) on delete cascade,
  film_id uuid not null references public.justice_films(id) on delete cascade,
  relation_type text not null default 'similar_pattern',
  primary key (case_id, film_id, relation_type)
);

create table if not exists public.justice_expert_terms (
  expert_id uuid not null references public.justice_experts(id) on delete cascade,
  term_id uuid not null references public.justice_terms(id) on delete cascade,
  primary key (expert_id, term_id)
);

create table if not exists public.justice_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_type public.favorite_target_type not null,
  target_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

create table if not exists public.justice_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  type text not null,
  title text not null,
  body text,
  target_type text,
  target_id uuid,
  status public.notification_status not null default 'unread',
  created_at timestamptz not null default now()
);

create index if not exists idx_justice_cases_owner on public.justice_cases(owner_id);
create index if not exists idx_justice_cases_visibility on public.justice_cases(visibility, moderation_status);
create index if not exists idx_justice_comments_case on public.justice_comments(case_id);
create index if not exists idx_justice_ratings_case on public.justice_ratings(case_id);
create index if not exists idx_justice_favorites_user on public.justice_favorites(user_id);
create index if not exists idx_justice_notifications_user_status on public.justice_notifications(user_id, status);
create index if not exists idx_justice_terms_category on public.justice_terms(category_id);

-- Row Level Security preparation.
-- Enable RLS when this schema is applied in Supabase.
alter table public.profiles enable row level security;
alter table public.justice_cases enable row level security;
alter table public.justice_comments enable row level security;
alter table public.justice_ratings enable row level security;
alter table public.justice_favorites enable row level security;
alter table public.justice_notifications enable row level security;

-- Suggested policies:
-- profiles: public read for basic profile fields; owner update only.
-- justice_cases: public read only when visibility='public' and moderation_status='allowed'; owner full access to own cases.
-- justice_comments: public read for comments on public allowed cases; authenticated users insert; author can update/delete own comments.
-- justice_ratings: public aggregate read through views; authenticated users insert/update own ratings.
-- justice_favorites and notifications: owner read/write only.

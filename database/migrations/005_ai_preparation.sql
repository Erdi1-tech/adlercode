-- Adlercode AI preparation
-- Browser clients may create analysis requests. OpenAI calls must happen in Edge Functions or another secure server.

create type public.ai_job_status as enum ('queued', 'processing', 'completed', 'failed', 'cancelled');

create table if not exists public.ai_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_key public.platform_module not null default 'global',
  target_entity_id uuid references public.entities(id) on delete set null,
  job_type text not null,
  status public.ai_job_status not null default 'queued',
  prompt_context jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_analyses (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.ai_jobs(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_key public.platform_module not null default 'global',
  target_entity_id uuid references public.entities(id) on delete set null,
  analysis_type text not null,
  summary text,
  suggested_categories jsonb not null default '[]'::jsonb,
  suggested_tags jsonb not null default '[]'::jsonb,
  detected_patterns jsonb not null default '[]'::jsonb,
  related_entities jsonb not null default '[]'::jsonb,
  model_name text,
  token_usage jsonb not null default '{}'::jsonb,
  visibility public.content_visibility not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_ai_jobs_user_status on public.ai_jobs(user_id, status, created_at);
create index if not exists idx_ai_analyses_user on public.ai_analyses(user_id, created_at);
create index if not exists idx_ai_analyses_target on public.ai_analyses(target_entity_id, analysis_type);

drop trigger if exists set_ai_jobs_updated_at on public.ai_jobs;
create trigger set_ai_jobs_updated_at
  before update on public.ai_jobs
  for each row execute function public.set_updated_at();

drop trigger if exists set_ai_analyses_updated_at on public.ai_analyses;
create trigger set_ai_analyses_updated_at
  before update on public.ai_analyses
  for each row execute function public.set_updated_at();

alter table public.ai_jobs enable row level security;
alter table public.ai_analyses enable row level security;

create policy "users read own ai jobs"
on public.ai_jobs for select
using (user_id = auth.uid() or public.is_admin());

create policy "users create own ai jobs"
on public.ai_jobs for insert
with check (user_id = auth.uid());

create policy "admins update ai jobs"
on public.ai_jobs for update
using (public.is_admin())
with check (public.is_admin());

create policy "read ai analyses by visibility"
on public.ai_analyses for select
using (visibility = 'public' or user_id = auth.uid() or public.is_admin());

create policy "server/admin manage ai analyses"
on public.ai_analyses for all
using (public.is_admin())
with check (public.is_admin());

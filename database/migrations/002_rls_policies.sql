-- Adlercode Supabase Row Level Security policies
-- Keep public discovery open while protecting private user content.

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.is_expert()
returns boolean
language sql
stable
as $$
  select coalesce((select is_expert from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.owns_profile(profile_id uuid)
returns boolean
language sql
stable
as $$
  select auth.uid() = profile_id;
$$;

create policy "profiles public read"
on public.profiles for select
using (visibility = 'public' or id = auth.uid() or public.is_admin());

create policy "profiles owner update"
on public.profiles for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "categories public read"
on public.categories for select
using (true);

create policy "tags public read"
on public.tags for select
using (true);

create policy "admin manage categories"
on public.categories for all
using (public.is_admin())
with check (public.is_admin());

create policy "admin manage tags"
on public.tags for all
using (public.is_admin())
with check (public.is_admin());

create policy "public read patterns"
on public.patterns for select
using (visibility in ('public', 'system') or created_by = auth.uid() or public.is_admin());

create policy "authors manage own patterns"
on public.patterns for all
using (created_by = auth.uid() or public.is_admin())
with check (created_by = auth.uid() or public.is_admin());

create policy "public read resources"
on public.resources for select
using (visibility in ('public', 'system') or created_by = auth.uid() or public.is_admin());

create policy "authors manage own resources"
on public.resources for all
using (created_by = auth.uid() or public.is_admin())
with check (created_by = auth.uid() or public.is_admin());

create policy "public read tools"
on public.tools for select
using (visibility in ('public', 'system') or created_by = auth.uid() or public.is_admin());

create policy "authors manage own tools"
on public.tools for all
using (created_by = auth.uid() or public.is_admin())
with check (created_by = auth.uid() or public.is_admin());

create policy "public read books"
on public.books for select
using (visibility in ('public', 'system') or created_by = auth.uid() or public.is_admin());

create policy "authors manage own books"
on public.books for all
using (created_by = auth.uid() or public.is_admin())
with check (created_by = auth.uid() or public.is_admin());

create policy "public read experts"
on public.experts for select
using (visibility = 'public' or profile_id = auth.uid() or public.is_admin());

create policy "experts manage own expert profile"
on public.experts for all
using (profile_id = auth.uid() or public.is_admin())
with check (profile_id = auth.uid() or public.is_admin());

create policy "public read projects"
on public.projects for select
using (visibility = 'public' or owner_id = auth.uid() or public.is_admin());

create policy "owners manage own projects"
on public.projects for all
using (owner_id = auth.uid() or public.is_admin())
with check (owner_id = auth.uid() or public.is_admin());

create policy "public read discussions"
on public.discussions for select
using (visibility = 'public' or author_id = auth.uid() or public.is_admin());

create policy "authenticated create discussions"
on public.discussions for insert
with check (author_id = auth.uid() or public.is_admin());

create policy "authors manage own discussions"
on public.discussions for update
using (author_id = auth.uid() or public.is_admin())
with check (author_id = auth.uid() or public.is_admin());

create policy "authors delete own discussions"
on public.discussions for delete
using (author_id = auth.uid() or public.is_admin());

create policy "public read comments"
on public.comments for select
using (moderation_status = 'allowed' or author_id = auth.uid() or public.is_admin());

create policy "authenticated create comments"
on public.comments for insert
with check (author_id = auth.uid());

create policy "authors manage own comments"
on public.comments for update
using (author_id = auth.uid() or public.is_admin())
with check (author_id = auth.uid() or public.is_admin());

create policy "authors delete own comments"
on public.comments for delete
using (author_id = auth.uid() or public.is_admin());

create policy "read ratings by visibility"
on public.ratings for select
using (visibility = 'public' or author_id = auth.uid() or public.is_admin());

create policy "authors manage own ratings"
on public.ratings for all
using (author_id = auth.uid() or public.is_admin())
with check (author_id = auth.uid() or public.is_admin());

create policy "users read own bookmarks"
on public.bookmarks for select
using (user_id = auth.uid() or public.is_admin());

create policy "users manage own bookmarks"
on public.bookmarks for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "users read own notifications"
on public.notifications for select
using (user_id = auth.uid() or public.is_admin());

create policy "users update own notifications"
on public.notifications for update
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "public read entities"
on public.entities for select
using (true);

create policy "authors manage own entities"
on public.entities for all
using (created_by = auth.uid() or public.is_admin())
with check (created_by = auth.uid() or public.is_admin());

create policy "public read entity links"
on public.entity_links for select
using (visibility in ('public', 'system') or created_by = auth.uid() or public.is_admin());

create policy "authors manage own entity links"
on public.entity_links for all
using (created_by = auth.uid() or public.is_admin())
with check (created_by = auth.uid() or public.is_admin());

create policy "public read entity tags"
on public.entity_tags for select
using (true);

create policy "admin manage entity tags"
on public.entity_tags for all
using (public.is_admin())
with check (public.is_admin());

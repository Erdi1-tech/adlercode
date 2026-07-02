-- Adlercode Supabase Storage setup
-- Create buckets in Supabase SQL editor or CLI. Policies keep public media readable and private user files protected.

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('experts', 'experts', true),
  ('book-covers', 'book-covers', true),
  ('documents', 'documents', false),
  ('videos', 'videos', false),
  ('graphics', 'graphics', true)
on conflict (id) do nothing;

create policy "public read public media"
on storage.objects for select
using (bucket_id in ('avatars', 'experts', 'book-covers', 'graphics'));

create policy "authenticated read own private documents"
on storage.objects for select
using (
  bucket_id in ('documents', 'videos')
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "users upload own files"
on storage.objects for insert
with check (
  auth.role() = 'authenticated'
  and (
    bucket_id in ('avatars', 'documents', 'videos', 'graphics')
    and auth.uid()::text = (storage.foldername(name))[1]
  )
);

create policy "users update own files"
on storage.objects for update
using (auth.uid()::text = (storage.foldername(name))[1])
with check (auth.uid()::text = (storage.foldername(name))[1]);

create policy "users delete own files"
on storage.objects for delete
using (auth.uid()::text = (storage.foldername(name))[1]);

-- Adlercode Realtime preparation
-- Enable Realtime only for interactive tables. Chat can be added later.

alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.discussions;
alter publication supabase_realtime add table public.comments;
alter publication supabase_realtime add table public.projects;

-- In Supabase dashboard, also enable Realtime for these tables if required by your project settings.

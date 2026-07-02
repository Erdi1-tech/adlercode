import { getSupabaseClient } from "../supabase/client.js";

export async function withSupabase(callback, fallback = null) {
  const supabase = await getSupabaseClient();
  if (!supabase) return fallback;
  return callback(supabase);
}

export async function getCurrentSession() {
  return withSupabase(async (supabase) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  });
}

export async function getCurrentUser() {
  return withSupabase(async (supabase) => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  });
}

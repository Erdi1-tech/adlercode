const supabaseConfig = window.ADLERCODE_SUPABASE_CONFIG || {};

export async function getSupabaseClient() {
  if (!supabaseConfig.url || !supabaseConfig.anonKey || supabaseConfig.anonKey.includes("your-public")) {
    return null;
  }

  const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
  return createClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export function isSupabaseConfigured() {
  return Boolean(supabaseConfig.url && supabaseConfig.anonKey && !supabaseConfig.anonKey.includes("your-public"));
}

import { withSupabase } from "./supabase-service.js";

export async function registerAccount({ email, password, username }) {
  return withSupabase(async (supabase) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${window.location.origin}/profil/`,
      },
    });
    if (error) throw error;
    return data;
  });
}

export async function loginAccount({ email, password }) {
  return withSupabase(async (supabase) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  });
}

export async function logoutAccount() {
  return withSupabase(async (supabase) => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  }, false);
}

export async function resetPassword(email) {
  return withSupabase(async (supabase) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profil/`,
    });
    if (error) throw error;
    return data;
  });
}

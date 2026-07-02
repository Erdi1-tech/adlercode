import { withSupabase } from "./supabase-service.js";

const publicVisibility = ["public", "system"];

export async function listResources(filters = {}) {
  return withSupabase(async (supabase) => {
    let query = supabase.from("resources").select("*, categories(name, slug)").in("visibility", publicVisibility).order("created_at", { ascending: false });
    if (filters.categoryId) query = query.eq("category_id", filters.categoryId);
    if (filters.type) query = query.eq("resource_type", filters.type);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }, []);
}

export async function listExperts(filters = {}) {
  return withSupabase(async (supabase) => {
    let query = supabase.from("experts").select("*, profiles(display_name, username, avatar_url)").eq("visibility", "public").order("created_at", { ascending: false });
    if (filters.specialty) query = query.contains("specialties", [filters.specialty]);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }, []);
}

export async function listTools(filters = {}) {
  return withSupabase(async (supabase) => {
    let query = supabase.from("tools").select("*, categories(name, slug)").in("visibility", publicVisibility).order("created_at", { ascending: false });
    if (filters.categoryId) query = query.eq("category_id", filters.categoryId);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }, []);
}

export async function listProjects(filters = {}) {
  return withSupabase(async (supabase) => {
    let query = supabase.from("projects").select("*, profiles(display_name, username, avatar_url)").eq("visibility", "public").order("created_at", { ascending: false });
    if (filters.moduleKey) query = query.eq("module_key", filters.moduleKey);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }, []);
}

export async function listRelatedEntities(entityId) {
  return withSupabase(async (supabase) => {
    const { data, error } = await supabase.from("entity_links_view").select("*").eq("source_entity_id", entityId).order("weight", { ascending: false });
    if (error) throw error;
    return data;
  }, []);
}

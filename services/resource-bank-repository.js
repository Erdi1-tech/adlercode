import { isSupabaseConfigured } from "../supabase/client.js";
import { listExperts, listProjects, listResources, listTools } from "./platform-repository.js";

function normalizeCategory(row) {
  if (typeof row.categories === "string") return row.categories;
  return row.categories?.name || row.category_name || row.kategorie || "Allgemein";
}

function normalizeResource(row) {
  return {
    id: row.id,
    titel: row.title || row.titel,
    beschreibung: row.description || row.beschreibung || "",
    typ: row.resource_type || row.typ || "Artikel",
    kategorie: normalizeCategory(row),
    themen: row.themen || row.topics || [],
    tags: row.tags || [],
    experte: row.expert_id || row.experte || "",
    experteId: row.expert_id || row.experteId || row.experte || "",
    sprache: row.language || row.sprache || "Deutsch",
    kostenlosOderKostenpflichtig: row.is_free === false ? "Kostenpflichtig" : row.kostenlosOderKostenpflichtig || "Kostenlos",
    dateiOderLink: row.url || row.file_path || row.dateiOderLink || "#",
    empfohlen: Boolean(row.recommended || row.empfohlen),
    bewertung: Number(row.rating_average || row.bewertung || 0),
    bewertungenAnzahl: Number(row.rating_count || row.bewertungenAnzahl || 0),
    aufrufe: Number(row.view_count || row.aufrufe || 0),
    diskussionen: Number(row.discussion_count || row.diskussionen || 0),
    gespeichertAnzahl: Number(row.bookmark_count || row.gespeichertAnzahl || 0),
    datum: row.created_at || row.datum || "",
    relatedResources: row.relatedResources || [],
    relatedTools: row.relatedTools || row.werkzeugIds || [],
    relatedExperts: row.relatedExperts || [],
    relatedProjects: row.relatedProjects || row.projektIds || [],
    relatedDiscussions: row.relatedDiscussions || [],
  };
}

function normalizeExpert(row) {
  const profile = row.profiles || {};
  return {
    id: row.id,
    name: row.name || profile.display_name || profile.username || "Adlercode Experte",
    fachgebiet: row.description || row.fachgebiet || (row.specialties || []).join(", ") || "Adlercode",
    beschreibung: row.description || "",
    tags: row.specialties || row.tags || [],
  };
}

function normalizeTool(row) {
  return {
    id: row.id,
    titel: row.title || row.titel,
    beschreibung: row.description || row.beschreibung || "",
    kategorie: normalizeCategory(row),
    tags: row.tags || [],
    expertenIds: row.expertenIds || [],
    ressourcenIds: row.ressourcenIds || [],
  };
}

function normalizeProject(row) {
  const profile = row.profiles || {};
  return {
    id: row.id,
    titel: row.title || row.titel,
    beschreibung: row.description || row.beschreibung || "",
    kategorie: normalizeCategory(row),
    status: row.status || "Aktiv",
    expertenIds: row.expertenIds || [],
    ressourcenIds: row.ressourcenIds || [],
    owner: profile.display_name || profile.username || "",
  };
}

function replaceArray(target = [], next = []) {
  target.splice(0, target.length, ...next);
}

function refreshResourceRelations(data) {
  data.resources.forEach((resource) => {
    resource.relatedResources = data.resources
      .filter((candidate) => candidate.id !== resource.id && (candidate.kategorie === resource.kategorie || (candidate.tags || []).some((tag) => (resource.tags || []).includes(tag))))
      .slice(0, 4)
      .map((candidate) => candidate.id);
    resource.relatedTools = data.tools
      .filter((tool) => (tool.ressourcenIds || []).includes(resource.id) || (tool.tags || []).some((tag) => (resource.tags || []).includes(tag)))
      .slice(0, 4)
      .map((tool) => tool.id);
    resource.relatedProjects = data.projects
      .filter((project) => (project.ressourcenIds || []).includes(resource.id) || project.kategorie === resource.kategorie)
      .slice(0, 4)
      .map((project) => project.id);
    resource.relatedExperts = data.experts
      .filter((expert) => (expert.tags || []).some((tag) => (resource.tags || []).includes(tag)) || expert.id === resource.experteId)
      .slice(0, 4)
      .map((expert) => expert.id);
  });
}

export async function loadResourceBankData(fallbackData) {
  if (!fallbackData || !isSupabaseConfigured()) {
    return { data: fallbackData, source: "demo" };
  }

  const [resources, experts, tools, projects] = await Promise.all([
    listResources(),
    listExperts(),
    listTools(),
    listProjects(),
  ]);

  if (!resources.length) {
    return { data: fallbackData, source: "demo-empty" };
  }

  replaceArray(fallbackData.resources, resources.map(normalizeResource));
  replaceArray(fallbackData.experts, experts.map(normalizeExpert));
  replaceArray(fallbackData.tools, tools.map(normalizeTool));
  replaceArray(fallbackData.projects, projects.map(normalizeProject));
  fallbackData.categories = [...new Set(fallbackData.resources.map((resource) => resource.kategorie).filter(Boolean))].sort((a, b) => a.localeCompare(b, "de"));
  refreshResourceRelations(fallbackData);

  return { data: fallbackData, source: "supabase" };
}

(() => {
  const root = document.querySelector("[data-profile-page]");
  if (!root) return;

  const storageKey = "adlercode-film-ratings-v1";

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  }

  function setText(selector, value) {
    const element = root.querySelector(selector);
    if (element) element.textContent = String(value);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function latestDate(item) {
    return [item?.savedAt, item?.moral?.savedAt, item?.["film-narrative"]?.savedAt, item?.["film-system"]?.savedAt]
      .filter(Boolean)
      .sort()
      .at(-1) || "";
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  const store = loadStore();
  const user = window.AdlercodeAuth?.currentUser?.();
  if (!user) {
    window.AdlercodeAuth?.open?.("login", "Bitte melde dich an oder registriere dich, um dein Profil zu nutzen.");
  }
  const entries = Object.entries(store);
  const filmAnalyses = entries
    .filter(([key, item]) => key.startsWith("film:") && (item?.["film-narrative"] || item?.moral || item?.["film-system"]))
    .map(([key, item]) => ({ key, type: "Filmanalyse", title: item?.meta?.title || "Unbenannter Film", date: latestDate(item), href: "../meine-analysen/" }));
  const characterAnalyses = entries
    .filter(([key, item]) => key.startsWith("character:") && item?.values)
    .map(([key, item]) => ({
      key,
      type: "Charakteranalyse",
      title: item?.meta?.character || item?.meta?.name || "Unbenannte Rolle",
      date: item?.savedAt || "",
      href: "../meine-analysen/?tab=characters",
    }));
  const filmCount = filmAnalyses.length;
  const characterCount = characterAnalyses.length;
  const publicCount = entries.filter(([, item]) => item?.visibility === "public").length;
  const privateCount = filmCount + characterCount - publicCount;
  const recentRoot = root.querySelector("[data-profile-recent]");

  if (user) {
    setText("[data-profile-name]", user.name || user.email || "Adlercode Nutzer");
    setText("[data-profile-member-since]", formatDate(user.createdAt) || "2026");
  }

  setText("[data-stat-films]", filmCount);
  setText("[data-stat-characters]", characterCount);
  setText("[data-stat-public]", publicCount);
  setText("[data-stat-private]", Math.max(privateCount, 0));

  const recentAnalyses = [...filmAnalyses, ...characterAnalyses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (recentRoot && recentAnalyses.length) {
    recentRoot.hidden = false;
    recentRoot.innerHTML = recentAnalyses
      .map(
        (item) => `
          <a href="${item.href}">
            <span>${escapeHtml(item.type)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            ${item.date ? `<small>${escapeHtml(formatDate(item.date))}</small>` : ""}
          </a>
        `
      )
      .join("");
  }

  root.querySelector(".profile-secondary-button")?.addEventListener("click", () => {
    window.AdlercodeAuth?.requireAuth?.("Bitte melde dich an oder registriere dich, um Analysen zu veröffentlichen.");
  });
})();

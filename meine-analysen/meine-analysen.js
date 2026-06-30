(() => {
  const root = document.querySelector("[data-analysis-library]");
  if (!root) return;
  if (!window.AdlercodeAuth?.currentUser?.()) {
    window.AdlercodeAuth?.open?.("login", "Bitte melde dich an oder registriere dich, um deine gespeicherten Analysen zu öffnen.");
  }

  const storageKey = "adlercode-film-ratings-v1";
  const contentRoot = root.querySelector("[data-analysis-content]");
  const tabButtons = [...root.querySelectorAll("[data-analysis-tab]")];
  let activeTab = new URLSearchParams(window.location.search).get("tab") === "characters" ? "characters" : "films";
  let store = loadStore();

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveStore() {
    localStorage.setItem(storageKey, JSON.stringify(store));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function dominantLabel(values) {
    return Object.entries(values || {}).reduce((dominant, item) => (item[1] > dominant[1] ? item : dominant), ["", -1])[0];
  }

  function profileLabel(label) {
    return {
      Empath: "Empathisches Programm",
      Narzisst: "Narzisstisches Programm",
      Psychopath: "Psychopathisches Programm",
      Covert: "Covert-Programm",
    }[label] || label || "Nicht gespeichert";
  }

  function moralLabel(value) {
    return {
      empath: "Empath",
      narzisst: "Narzisst",
      psychopath: "Psychopath",
      covert: "Covert",
    }[value] || value || "Nicht gespeichert";
  }

  function formatDate(value) {
    if (!value) return "Nicht gespeichert";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Nicht gespeichert";
    return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function latestDate(item) {
    return [item?.savedAt, item?.moral?.savedAt, item?.["film-narrative"]?.savedAt, item?.["film-system"]?.savedAt]
      .filter(Boolean)
      .sort()
      .at(-1) || "";
  }

  function filmAnalyses() {
    return Object.entries(store)
      .filter(([key]) => key.startsWith("film:"))
      .map(([key, item]) => ({ key, item }))
      .filter(({ item }) => item?.["film-narrative"] || item?.moral || item?.["film-system"])
      .sort((a, b) => latestDate(b.item).localeCompare(latestDate(a.item)));
  }

  function characterAnalyses() {
    return Object.entries(store)
      .filter(([key]) => key.startsWith("character:"))
      .map(([key, item]) => ({ key, item }))
      .filter(({ item }) => item?.values)
      .sort((a, b) => (b.item.savedAt || "").localeCompare(a.item.savedAt || ""));
  }

  function filmUrl(meta, mode = "view") {
    if (!meta?.id) return "../filmanalyse/";
    const params = new URLSearchParams({ film: meta.id });
    if (mode === "edit") params.set("mode", "edit");
    return `../filmanalyse/?${params.toString()}`;
  }

  function characterUrl(meta, mode = "view") {
    if (!meta?.id || !meta?.characterId) return filmUrl(meta, mode);
    const params = new URLSearchParams({ film: meta.id, character: meta.characterId });
    if (mode === "edit") params.set("mode", "edit");
    return `../filmanalyse/?${params.toString()}`;
  }

  function emptyState() {
    return `
      <div class="analysis-empty">
        <h2>Noch keine Analysen gespeichert.</h2>
        <a href="../filmanalyse/">Zur Filmanalyse</a>
      </div>
    `;
  }

  function renderFilms() {
    const items = filmAnalyses();
    if (!items.length) return emptyState();
    return `<div class="analysis-card-grid">${items.map(renderFilmCard).join("")}</div>`;
  }

  function renderCharacters() {
    const items = characterAnalyses();
    if (!items.length) return emptyState();
    return `<div class="analysis-card-grid">${items.map(renderCharacterCard).join("")}</div>`;
  }

  function renderFilmCard({ key, item }) {
    const meta = item.meta || {};
    return `
      <article class="analysis-card">
        <div class="analysis-card-media" aria-hidden="true">${meta.posterUrl ? `<img src="${escapeHtml(meta.posterUrl)}" alt="" loading="lazy" />` : ""}</div>
        <div class="analysis-card-body">
          <span>${escapeHtml(meta.year || "Film")}</span>
          <h2>${escapeHtml(meta.title || "Unbekannter Film")}</h2>
          <dl>
            <div><dt>Dominantes Narrativ</dt><dd>${escapeHtml(dominantLabel(item["film-narrative"]?.values) || "Nicht gespeichert")}</dd></div>
            <div><dt>Moralebene</dt><dd>${escapeHtml(moralLabel(item.moral?.level))}</dd></div>
            <div><dt>Dominantes System</dt><dd>${escapeHtml(dominantLabel(item["film-system"]?.values) || "Nicht gespeichert")}</dd></div>
            <div><dt>Gespeichert</dt><dd>${escapeHtml(formatDate(latestDate(item)))}</dd></div>
          </dl>
          <div class="analysis-card-actions">
            <a href="${escapeHtml(filmUrl(meta))}">Ansehen</a>
            <a href="${escapeHtml(filmUrl(meta, "edit"))}">Bearbeiten</a>
            <button type="button" data-delete-analysis="${escapeHtml(key)}">Löschen</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderCharacterCard({ key, item }) {
    const meta = item.meta || {};
    return `
      <article class="analysis-card">
        <div class="analysis-card-media is-character" aria-hidden="true">${meta.imageUrl ? `<img src="${escapeHtml(meta.imageUrl)}" alt="" loading="lazy" />` : ""}</div>
        <div class="analysis-card-body">
          <span>${escapeHtml(meta.title || "Film")}</span>
          <h2>${escapeHtml(meta.characterName || "Unbekannte Rolle")}</h2>
          <p>${escapeHtml(meta.actorName || "Schauspieler unbekannt")}</p>
          <dl>
            <div><dt>Film</dt><dd>${escapeHtml(meta.title || "Unbekannter Film")}</dd></div>
            <div><dt>Dominantes Profil</dt><dd>${escapeHtml(profileLabel(dominantLabel(item.values)))}</dd></div>
            <div><dt>Gespeichert</dt><dd>${escapeHtml(formatDate(item.savedAt))}</dd></div>
          </dl>
          <div class="analysis-card-actions">
            <a href="${escapeHtml(characterUrl(meta))}">Ansehen</a>
            <a href="${escapeHtml(characterUrl(meta, "edit"))}">Bearbeiten</a>
            <button type="button" data-delete-analysis="${escapeHtml(key)}">Löschen</button>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    tabButtons.forEach((button) => button.classList.toggle("is-selected", button.dataset.analysisTab === activeTab));
    contentRoot.innerHTML = activeTab === "characters" ? renderCharacters() : renderFilms();
  }

  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-analysis-tab]");
    if (tab) {
      activeTab = tab.dataset.analysisTab || "films";
      render();
      return;
    }

    const deleteButton = event.target.closest("[data-delete-analysis]");
    if (deleteButton) {
      const key = deleteButton.dataset.deleteAnalysis;
      const confirmed = window.confirm("Diese Analyse wirklich löschen?");
      if (!confirmed) return;
      delete store[key];
      saveStore();
      render();
    }
  });

  render();
})();

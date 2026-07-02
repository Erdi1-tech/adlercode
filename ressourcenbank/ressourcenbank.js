(() => {
  const root = document.querySelector("[data-resource-bank]");
  const data = window.ADLERCODE_RESOURCE_DATA;
  if (!root || !data) return;

  const searchInput = root.querySelector("[data-resource-search]");
  const categoryRoot = root.querySelector("[data-resource-categories]");
  const suggestionsRoot = root.querySelector("[data-resource-suggestions]");
  const recommendationsRoot = root.querySelector("[data-resource-recommendations]");
  const gridRoot = root.querySelector("[data-resource-grid]");
  const azRoot = root.querySelector("[data-resource-az]");
  const savedRoot = root.querySelector("[data-saved-resources]");
  const progressRoot = root.querySelector("[data-resource-progress]");
  const personalStartRoot = root.querySelector("[data-resource-personal-start]");
  const countRoot = root.querySelector("[data-resource-count]");
  const resetButton = root.querySelector("[data-resource-reset]");
  const sortControl = root.querySelector("[data-resource-sort]");
  const filterControls = [...root.querySelectorAll("[data-resource-filter]")];
  const viewButtons = [...root.querySelectorAll("[data-resource-view]")];
  const dialog = document.querySelector("[data-resource-dialog]");
  const detailContent = document.querySelector("[data-resource-detail-content]");
  const storageKey = "adlercode-saved-resources-v1";
  const ratingStorageKey = "adlercode-resource-ratings-v1";
  const helpfulStorageKey = "adlercode-resource-helpful-v1";
  const progressStorageKey = "adlercode-resource-progress-v1";
  let activeView = "cards";

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function savedIds() {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
    } catch {
      return new Set();
    }
  }

  function persistSaved(ids) {
    localStorage.setItem(storageKey, JSON.stringify([...ids]));
  }

  function ratings() {
    try {
      return JSON.parse(localStorage.getItem(ratingStorageKey) || "{}");
    } catch {
      return {};
    }
  }

  function helpfulVotes() {
    try {
      return JSON.parse(localStorage.getItem(helpfulStorageKey) || "{}");
    } catch {
      return {};
    }
  }

  function persistHelpful(resourceId, value) {
    const next = helpfulVotes();
    next[resourceId] = { value, savedAt: new Date().toISOString() };
    localStorage.setItem(helpfulStorageKey, JSON.stringify(next));
    markProgress("Bewertungen abgegeben");
  }

  function progress() {
    try {
      return new Set(JSON.parse(localStorage.getItem(progressStorageKey) || "[]"));
    } catch {
      return new Set();
    }
  }

  function markProgress(label) {
    const next = progress();
    next.add(label);
    localStorage.setItem(progressStorageKey, JSON.stringify([...next]));
  }

  function persistRating(resourceId, value) {
    const next = ratings();
    next[resourceId] = { value: Number(value), savedAt: new Date().toISOString() };
    localStorage.setItem(ratingStorageKey, JSON.stringify(next));
  }

  function ratingValue(resource) {
    return ratings()[resource.id]?.value || resource.bewertung || 0;
  }

  function uniqueValues(key) {
    if (key === "experte") return data.experts.map((expert) => ({ value: expert.id, label: expert.name }));
    return [...new Set(data.resources.map((resource) => resource[key]).filter(Boolean))]
      .sort((a, b) => String(a).localeCompare(String(b), "de"))
      .map((value) => ({ value, label: value }));
  }

  function populateFilters() {
    filterControls.forEach((control) => {
      const key = control.dataset.resourceFilter;
      const label = {
        kategorie: "Alle Kategorien",
        typ: "Alle Typen",
        kostenlosOderKostenpflichtig: "Kostenlos/Kostenpflichtig",
        sprache: "Alle Sprachen",
        experte: "Alle Experten",
      }[key] || "Alle";
      control.innerHTML = `<option value="">${label}</option>${uniqueValues(key)
        .map((item) => `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`)
        .join("")}`;
    });
  }

  function renderCategories() {
    categoryRoot.innerHTML = data.categories
      .map((category) => `<button type="button" data-resource-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`)
      .join("");
  }

  function searchItems() {
    return [
      ...data.resources.map((item) => ({ type: "Ressource", title: item.titel, description: item.beschreibung })),
      ...data.tools.map((item) => ({ type: "Werkzeug", title: item.titel, description: item.beschreibung })),
      ...data.experts.map((item) => ({ type: "Experte", title: item.name, description: item.fachgebiet })),
      ...data.projects.map((item) => ({ type: "Projekt", title: item.titel, description: item.beschreibung })),
      ...data.solutions.map((item) => ({ type: "Lösung", title: item.problem, description: item.beschreibung })),
      ...data.decisions.map((item) => ({ type: "Entscheidung", title: item.frage, description: item.kategorie })),
      ...data.communityPosts.map((item) => ({ type: "Diskussion", title: item.titel, description: item.kategorie })),
    ];
  }

  function renderSuggestions() {
    if (!suggestionsRoot) return;
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) {
      suggestionsRoot.hidden = true;
      suggestionsRoot.innerHTML = "";
      return;
    }
    const matches = searchItems()
      .filter((item) => [item.title, item.description, item.type].join(" ").toLowerCase().includes(query))
      .slice(0, 7);
    suggestionsRoot.hidden = !matches.length;
    suggestionsRoot.innerHTML = matches
      .map(
        (item) => `
          <button type="button" data-resource-suggestion="${escapeHtml(item.title)}">
            <span>${escapeHtml(item.type)}</span>
            <strong>${escapeHtml(item.title)}</strong>
          </button>
        `,
      )
      .join("");
  }

  function filters() {
    return Object.fromEntries(filterControls.map((control) => [control.dataset.resourceFilter, control.value]));
  }

  function matchesResource(resource) {
    const query = searchInput.value.trim().toLowerCase();
    const activeFilters = filters();
    const expertName = data.resourceLabel(resource);
    const searchable = [
      resource.titel,
      resource.beschreibung,
      resource.typ,
      resource.kategorie,
      expertName,
      resource.sprache,
      ...(resource.themen || []),
      ...(resource.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    const queryMatch = !query || searchable.includes(query);
    const filterMatch = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true;
      return String(resource[key] || "") === value;
    });
    return queryMatch && filterMatch;
  }

  function currentResources() {
    const items = data.resources.filter(matchesResource);
    const sort = sortControl?.value || "recommended";
    if (sort === "rating") return items.sort((a, b) => ratingValue(b) - ratingValue(a) || a.titel.localeCompare(b.titel, "de"));
    if (sort === "az") return items.sort((a, b) => a.titel.localeCompare(b.titel, "de"));
    return items.sort((a, b) => Number(b.empfohlen) - Number(a.empfohlen) || a.titel.localeCompare(b.titel, "de"));
  }

  function renderAz(items) {
    if (!items.length) {
      azRoot.innerHTML = `<div class="resource-empty"><p>Keine passenden Ressourcen gefunden.</p></div>`;
      return;
    }
    const groups = items
      .slice()
      .sort((a, b) => a.titel.localeCompare(b.titel, "de"))
      .reduce((acc, resource) => {
        const letter = resource.titel.charAt(0).toUpperCase();
        acc[letter] = acc[letter] || [];
        acc[letter].push(resource);
        return acc;
      }, {});
    azRoot.innerHTML = Object.entries(groups)
      .map(
        ([letter, group]) => `
          <section class="resource-az-group">
            <h3>${escapeHtml(letter)}</h3>
            <div>
              ${group
                .map(
                  (resource) => `
                    <button type="button" data-resource-detail="${escapeHtml(resource.id)}">
                      <strong>${escapeHtml(resource.titel)}</strong>
                      <span>${escapeHtml(resource.typ)} · ${escapeHtml(resource.kategorie)}</span>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </section>
        `,
      )
      .join("");
  }

  function renderSaved() {
    const ids = savedIds();
    const items = data.resources.filter((resource) => ids.has(resource.id));
    savedRoot.innerHTML = items.length
      ? items.map((resource) => `<button type="button" data-resource-detail="${escapeHtml(resource.id)}">${escapeHtml(resource.titel)}</button>`).join("")
      : `<p>Noch keine Ressourcen gespeichert.</p>`;
  }

  function renderRecommendations() {
    if (!recommendationsRoot) return;
    const sections = [
      { label: "Meist gespeichert", item: data.resources.slice().sort((a, b) => b.gespeichertAnzahl - a.gespeichertAnzahl)[0] },
      { label: "Beste Bewertung", item: data.resources.slice().sort((a, b) => ratingValue(b) - ratingValue(a))[0] },
      { label: "Meist angesehen", item: data.resources.slice().sort((a, b) => b.aufrufe - a.aufrufe)[0] },
      { label: "Neu hinzugefügt", item: data.resources.slice().sort((a, b) => String(b.datum).localeCompare(String(a.datum)))[0] },
    ];
    recommendationsRoot.innerHTML = sections
      .map(
        ({ label, item }) => `
          <button type="button" data-resource-detail="${escapeHtml(item.id)}">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(item.titel)}</strong>
            <small>${escapeHtml(item.typ)} · ${escapeHtml(item.kategorie)}</small>
          </button>
        `,
      )
      .join("");
  }

  function renderProgress() {
    if (!progressRoot) return;
    const ids = savedIds();
    const voteCount = Object.keys(helpfulVotes()).length;
    const ratingCount = Object.keys(ratings()).length;
    const current = progress();
    if (ids.size) current.add("Ressourcen gespeichert");
    if (ratingCount) current.add("Bewertungen abgegeben");
    const items = [
      "Ressourcen angesehen",
      "Ressourcen gespeichert",
      "Bewertungen abgegeben",
      "Experten entdeckt",
      "Werkzeuge genutzt",
      "Projekte verfolgt",
    ];
    progressRoot.innerHTML = items
      .map((item) => `<span class="${current.has(item) ? "is-done" : ""}">✔ ${escapeHtml(item)}</span>`)
      .join("");
  }

  function renderPersonalStart() {
    if (!personalStartRoot) return;
    const saved = data.resources.filter((resource) => savedIds().has(resource.id));
    const basedOnSaved = saved.length ? saved.flatMap((resource) => data.getResourcesByIds(resource.relatedResources || [])).slice(0, 3) : data.resources.slice(0, 3);
    const blocks = [
      { title: "Neu für dich", text: data.resources.slice().sort((a, b) => String(b.datum).localeCompare(String(a.datum)))[0]?.titel },
      { title: "Empfohlen", text: data.resources.find((resource) => resource.empfohlen)?.titel },
      { title: "Basierend auf gespeicherten Ressourcen", text: basedOnSaved[0]?.titel || "Speichere Ressourcen, um Empfehlungen vorzubereiten" },
      { title: "Experten, die dich interessieren könnten", text: data.experts[0]?.name },
      { title: "Neue Projekte", text: data.projects[0]?.titel },
      { title: "Neue Werkzeuge", text: data.tools[0]?.titel },
    ];
    personalStartRoot.innerHTML = blocks.map((block) => `<article><strong>${escapeHtml(block.title)}</strong><span>${escapeHtml(block.text || "Wird vorbereitet")}</span></article>`).join("");
  }

  function render() {
    const items = currentResources();
    const ids = savedIds();
    countRoot.textContent = `${items.length} Ressource${items.length === 1 ? "" : "n"} gefunden`;
    data.renderResourceCards(items, gridRoot, { savedIds: ids, ratings: ratings() });
    renderAz(items);
    gridRoot.hidden = activeView !== "cards";
    azRoot.hidden = activeView !== "az";
    renderSaved();
    renderProgress();
    renderPersonalStart();
    renderRecommendations();
  }

  function linkList(title, items, emptyText = "Wird vorbereitet") {
    return `
      <section class="resource-network-section">
        <h3>${escapeHtml(title)}</h3>
        <div>
          ${items.length ? items.map((item) => `<span>${escapeHtml(item.titel || item.name || item.problem || item.frage || item.title || item.id)}</span>`).join("") : `<p>${escapeHtml(emptyText)}</p>`}
        </div>
      </section>
    `;
  }

  function openDetail(id) {
    const resource = data.resources.find((item) => item.id === id);
    if (!resource || !dialog || !detailContent) return;
    const expert = data.expertById(resource.experteId || resource.experte);
    const relatedResources = data.getResourcesByIds(resource.relatedResources || []);
    const relatedTools = data.getToolsByIds(resource.relatedTools || resource.werkzeugIds || []);
    const relatedExperts = data.getExpertsByIds(resource.relatedExperts || []);
    const relatedProjects = data.getProjectsByIds(resource.relatedProjects || resource.projektIds || []);
    const relatedSolutions = data.getSolutionsByIds(resource.relatedSolutions || resource.loesungsIds || []);
    const relatedDecisions = data.getDecisionsByIds(resource.relatedDecisions || resource.entscheidungsIds || []);
    const relatedDiscussions = (data.communityPosts || []).filter((post) => (resource.relatedDiscussions || []).includes(post.id));
    const helpful = helpfulVotes()[resource.id]?.value || "";
    markProgress("Ressourcen angesehen");
    if (relatedExperts.length) markProgress("Experten entdeckt");
    if (relatedTools.length) markProgress("Werkzeuge genutzt");
    if (relatedProjects.length) markProgress("Projekte verfolgt");
    detailContent.innerHTML = `
      <p class="eyebrow">${escapeHtml(resource.typ)} · ${escapeHtml(resource.kategorie)}</p>
      <h2 id="resource-detail-title">${escapeHtml(resource.titel)}</h2>
      <p>${escapeHtml(resource.beschreibung)}</p>
      <dl class="resource-detail-facts">
        <div><dt>Themen</dt><dd>${resource.themen.map(escapeHtml).join(", ")}</dd></div>
        <div><dt>Experte</dt><dd>${escapeHtml(expert?.name || resource.experte)}</dd></div>
        <div><dt>Sprache</dt><dd>${escapeHtml(resource.sprache)}</dd></div>
        <div><dt>Status</dt><dd>${escapeHtml(resource.kostenlosOderKostenpflichtig)}</dd></div>
        <div><dt>Datei oder Link</dt><dd><a href="${escapeHtml(resource.dateiOderLink)}">Ressource öffnen</a></dd></div>
      </dl>
      <div class="resource-tags">${resource.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <section class="resource-helpful">
        <h3>War diese Ressource hilfreich?</h3>
        <div>
          <button type="button" class="${helpful === "yes" ? "is-selected" : ""}" data-resource-helpful="${escapeHtml(resource.id)}" data-helpful-value="yes">👍 Ja</button>
          <button type="button" class="${helpful === "no" ? "is-selected" : ""}" data-resource-helpful="${escapeHtml(resource.id)}" data-helpful-value="no">👎 Nein</button>
        </div>
      </section>
      <section class="resource-link-note">
        <h3>Verknüpfungen</h3>
        <p>Diese Ressource kann später mit Musterseiten, Expertenseiten und Projekten verbunden werden.</p>
        <div>
          ${resource.themen.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}
          ${expert ? `<span>${escapeHtml(expert.name)}</span>` : ""}
        </div>
      </section>
      <section class="resource-network">
        ${linkList("Ähnliche Ressourcen", relatedResources)}
        ${linkList("Passende Werkzeuge", relatedTools)}
        ${linkList("Passende Experten", relatedExperts)}
        ${linkList("Diese Ressource wird verwendet in", relatedProjects)}
        ${linkList("Diese Ressource hilft bei", relatedSolutions)}
        ${linkList("Relevant für", relatedDecisions)}
      </section>
      <section class="resource-discussions">
        <h3>Diskussionen</h3>
        <p>${escapeHtml(resource.diskussionen || 0)} Kommentare · Frage stellen · Erfahrung teilen · Diskussion öffnen</p>
        <div>${relatedDiscussions.length ? relatedDiscussions.map((post) => `<span>${escapeHtml(post.titel)}</span>`).join("") : "<span>Diskussionen werden vorbereitet</span>"}</div>
      </section>
      <section class="resource-continue">
        <h3>Das könnte dich ebenfalls interessieren</h3>
        <div>
          ${[...relatedResources.slice(0, 2), ...relatedTools.slice(0, 2), ...relatedExperts.slice(0, 2), ...relatedProjects.slice(0, 1)]
            .map((item) => `<span>${escapeHtml(item.titel || item.name || item.problem || item.frage)}</span>`)
            .join("") || "<span>Weitere Empfehlungen werden vorbereitet</span>"}
        </div>
      </section>
    `;
    dialog.hidden = false;
    document.body.classList.add("is-resource-dialog-open");
  }

  function closeDetail() {
    if (!dialog) return;
    dialog.hidden = true;
    document.body.classList.remove("is-resource-dialog-open");
  }

  function toggleSaved(id) {
    const ids = savedIds();
    if (ids.has(id)) ids.delete(id);
    else ids.add(id);
    persistSaved(ids);
    render();
  }

  root.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-resource-detail]");
    const saveButton = event.target.closest("[data-resource-save]");
    const categoryButton = event.target.closest("[data-resource-category]");
    const ratingButton = event.target.closest("[data-resource-rate]");
    const helpfulButton = event.target.closest("[data-resource-helpful]");
    const suggestionButton = event.target.closest("[data-resource-suggestion]");
    if (detailButton) {
      openDetail(detailButton.dataset.resourceDetail);
      return;
    }
    if (saveButton) {
      toggleSaved(saveButton.dataset.resourceSave);
      return;
    }
    if (categoryButton) {
      const categoryFilter = root.querySelector('[data-resource-filter="kategorie"]');
      categoryFilter.value = categoryButton.dataset.resourceCategory || "";
      render();
      return;
    }
    if (ratingButton) {
      persistRating(ratingButton.dataset.resourceRate, ratingButton.dataset.ratingValue);
      render();
      return;
    }
    if (helpfulButton) {
      persistHelpful(helpfulButton.dataset.resourceHelpful, helpfulButton.dataset.helpfulValue);
      openDetail(helpfulButton.dataset.resourceHelpful);
      render();
      return;
    }
    if (suggestionButton) {
      searchInput.value = suggestionButton.dataset.resourceSuggestion || "";
      suggestionsRoot.hidden = true;
      render();
    }
  });

  dialog?.addEventListener("click", (event) => {
    if (event.target.closest("[data-resource-close]")) closeDetail();
    const helpfulButton = event.target.closest("[data-resource-helpful]");
    if (helpfulButton) {
      persistHelpful(helpfulButton.dataset.resourceHelpful, helpfulButton.dataset.helpfulValue);
      openDetail(helpfulButton.dataset.resourceHelpful);
      render();
    }
  });

  searchInput.addEventListener("input", () => {
    renderSuggestions();
    render();
  });
  filterControls.forEach((control) => control.addEventListener("change", render));
  sortControl?.addEventListener("change", render);
  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    filterControls.forEach((control) => {
      control.value = "";
    });
    if (sortControl) sortControl.value = "recommended";
    render();
  });
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.resourceView || "cards";
      viewButtons.forEach((item) => item.classList.toggle("is-selected", item === button));
      render();
    });
  });

  populateFilters();
  renderCategories();

  const initialExpert = new URLSearchParams(window.location.search).get("experte");
  if (initialExpert) {
    const expertFilter = root.querySelector('[data-resource-filter="experte"]');
    if (expertFilter) expertFilter.value = initialExpert;
  }
  render();
})();

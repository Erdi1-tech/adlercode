(() => {
  const root = document.querySelector("[data-platform-bank]");
  const data = window.ADLERCODE_PLATFORM_DATA;
  if (!root || !data) return;

  const type = root.dataset.platformBank;
  const config = {
    tools: { items: data.tools, title: "Werkzeugbank", label: "Werkzeug", storage: "tools" },
    projects: { items: data.projects, title: "Projektbörse", label: "Projekt", storage: "projects" },
    solutions: { items: data.solutions, title: "Lösungsbank", label: "Lösung", storage: "solutions" },
    decisions: { items: data.decisions, title: "Entscheidungsbank", label: "Entscheidung", storage: "decisions" },
  }[type];
  if (!config) return;

  const searchInput = root.querySelector("[data-bank-search]");
  const categoryFilter = root.querySelector("[data-bank-category]");
  const statusFilter = root.querySelector("[data-bank-status]");
  const gridRoot = root.querySelector("[data-bank-grid]");
  const countRoot = root.querySelector("[data-bank-count]");
  const savedRoot = root.querySelector("[data-bank-saved]");
  const dialog = document.querySelector("[data-bank-dialog]");
  const detailRoot = document.querySelector("[data-bank-detail]");
  const storageKey = "adlercode-platform-collection-v1";

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function itemTitle(item) {
    return item.titel || item.problem || item.frage || item.name || "Adlercode Eintrag";
  }

  function itemDescription(item) {
    return item.beschreibung || (item.schritte || item.naechsteSchritte || []).join(" · ") || "";
  }

  function collection() {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
    } catch {
      return new Set();
    }
  }

  function persistCollection(ids) {
    localStorage.setItem(storageKey, JSON.stringify([...ids]));
  }

  function populateFilters() {
    const categories = [...new Set(config.items.map((item) => item.kategorie).filter(Boolean))].sort((a, b) => a.localeCompare(b, "de"));
    const statuses = [...new Set(config.items.map((item) => item.status).filter(Boolean))].sort((a, b) => a.localeCompare(b, "de"));
    if (categoryFilter) categoryFilter.innerHTML = `<option value="">Alle Kategorien</option>${categories.map((value) => `<option>${escapeHtml(value)}</option>`).join("")}`;
    if (statusFilter) {
      statusFilter.innerHTML = `<option value="">Alle Status</option>${statuses.map((value) => `<option>${escapeHtml(value)}</option>`).join("")}`;
      statusFilter.closest("label").hidden = !statuses.length;
    }
  }

  function matches(item) {
    const query = searchInput.value.trim().toLowerCase();
    const searchable = [
      itemTitle(item),
      itemDescription(item),
      item.kategorie,
      item.status,
      item.gesucht,
      item.geboten,
      ...(item.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return (
      (!query || searchable.includes(query)) &&
      (!categoryFilter.value || item.kategorie === categoryFilter.value) &&
      (!statusFilter?.value || item.status === statusFilter.value)
    );
  }

  function filteredItems() {
    return config.items.filter(matches).sort((a, b) => itemTitle(a).localeCompare(itemTitle(b), "de"));
  }

  function render() {
    const items = filteredItems();
    const ids = collection();
    countRoot.textContent = `${items.length} ${config.label}${items.length === 1 ? "" : "e"} gefunden`;
    data.renderPlatformCards(items, gridRoot, { type: config.storage, label: config.label, savedIds: ids });
    renderSaved(ids);
  }

  function renderSaved(ids = collection()) {
    const savedItems = config.items.filter((item) => ids.has(`${config.storage}:${item.id}`));
    savedRoot.innerHTML = savedItems.length
      ? savedItems.map((item) => `<button type="button" data-platform-detail="${escapeHtml(item.id)}">${escapeHtml(itemTitle(item))}</button>`).join("")
      : `<p>Noch nichts gespeichert.</p>`;
  }

  function linkedBlock(title, items) {
    if (!items.length) return "";
    return `
      <section class="platform-detail-linked">
        <h3>${escapeHtml(title)}</h3>
        <div>${items.map((item) => `<span>${escapeHtml(itemTitle(item))}</span>`).join("")}</div>
      </section>
    `;
  }

  function openDetail(id) {
    const item = config.items.find((entry) => entry.id === id);
    if (!item || !dialog || !detailRoot) return;
    detailRoot.innerHTML = `
      <p class="eyebrow">${escapeHtml(config.label)} · ${escapeHtml(item.kategorie || item.status || "Adlercode")}</p>
      <h2>${escapeHtml(itemTitle(item))}</h2>
      <p>${escapeHtml(itemDescription(item))}</p>
      ${item.gesucht || item.geboten ? `<dl class="resource-detail-facts">
        ${item.gesucht ? `<div><dt>Gesucht</dt><dd>${escapeHtml(item.gesucht)}</dd></div>` : ""}
        ${item.geboten ? `<div><dt>Geboten</dt><dd>${escapeHtml(item.geboten)}</dd></div>` : ""}
      </dl>` : ""}
      ${item.chancen ? linkedBlock("Chancen", item.chancen.map((value) => ({ titel: value }))) : ""}
      ${item.risiken ? linkedBlock("Risiken", item.risiken.map((value) => ({ titel: value }))) : ""}
      ${item.schritte ? linkedBlock("Lösungsschritte", item.schritte.map((value) => ({ titel: value }))) : ""}
      ${item.naechsteSchritte ? linkedBlock("Nächste Schritte", item.naechsteSchritte.map((value) => ({ titel: value }))) : ""}
      ${linkedBlock("Passende Ressourcen", data.getResourcesByIds(item.ressourcenIds || []))}
      ${linkedBlock("Passende Werkzeuge", data.getToolsByIds(item.werkzeugIds || []))}
      ${linkedBlock("Passende Experten", data.getExpertsByIds(item.expertenIds || []))}
      ${linkedBlock("Passende Projekte", data.getProjectsByIds(item.projektIds || []))}
    `;
    dialog.hidden = false;
  }

  function closeDetail() {
    if (dialog) dialog.hidden = true;
  }

  function toggleSave(key) {
    const ids = collection();
    if (ids.has(key)) ids.delete(key);
    else ids.add(key);
    persistCollection(ids);
    render();
  }

  root.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-platform-detail]");
    const saveButton = event.target.closest("[data-platform-save]");
    if (detailButton) openDetail(detailButton.dataset.platformDetail);
    if (saveButton) toggleSave(saveButton.dataset.platformSave);
  });
  dialog?.addEventListener("click", (event) => {
    if (event.target.closest("[data-bank-close]")) closeDetail();
  });
  searchInput.addEventListener("input", render);
  categoryFilter.addEventListener("change", render);
  statusFilter?.addEventListener("change", render);
  root.querySelector("[data-bank-reset]")?.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    if (statusFilter) statusFilter.value = "";
    render();
  });

  populateFilters();
  render();
})();

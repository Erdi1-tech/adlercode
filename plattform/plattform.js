(() => {
  const root = document.querySelector("[data-platform-overview]");
  const data = window.ADLERCODE_PLATFORM_DATA;
  if (!root || !data) return;

  const areasRoot = root.querySelector("[data-platform-areas]");
  const searchInput = root.querySelector("[data-platform-search]");
  const resultsRoot = root.querySelector("[data-platform-search-results]");
  const communityRoot = root.querySelector("[data-platform-community]");
  const collectionRoot = root.querySelector("[data-platform-collection]");
  const collectionKey = "adlercode-platform-collection-v1";

  const areas = [
    { title: "Wissensbank", description: "Begriffe, Muster, Modelle und zentrale Definitionen des Adlercode-Frameworks.", href: "../musterbibliothek/", status: "aktiv" },
    { title: "Ressourcenbank", description: "Bücher, Videos, PDFs, Vorlagen, Checklisten, Verträge, Studien, Artikel und Tools.", href: "../ressourcenbank/", status: "aktiv" },
    { title: "Werkzeugbank", description: "Praktische Analysehilfen, Checklisten, Leitfäden und Entscheidungshilfen.", href: "../werkzeuge/", status: "Grundlage" },
    { title: "Expertennetzwerk", description: "Fachpersonen, Profile, Ressourcen, Werkzeuge und spätere Kontaktmöglichkeiten.", href: "../experten/", status: "aktiv" },
    { title: "Projektbörse", description: "Projekte finden, strukturieren und mit Ressourcen, Werkzeugen und Experten verbinden.", href: "../projekte/", status: "Grundlage" },
    { title: "Lösungsbank", description: "Probleme mit Lösungsschritten, Ressourcen, Werkzeugen und Experten verbinden.", href: "../loesungen/", status: "Grundlage" },
    { title: "Entscheidungsbank", description: "Chancen, Risiken, Ressourcen und nächste Schritte für wichtige Entscheidungen.", href: "../entscheidungen/", status: "Grundlage" },
    { title: "Community", description: "Diskussionen, Fragen, Erfahrungen und Abstimmungen als Wissensgrundlage.", href: "../community/", status: "aktiv" },
    { title: "Business-Bereich", description: "Business, Marketing, Vertrieb, Finanzen und Projekte als zukünftiger Schwerpunkt.", href: "../projekte/", status: "in Planung" },
  ];

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function title(item) {
    return item.titel || item.name || item.problem || item.frage || item.title || "Adlercode";
  }

  function description(item) {
    return item.beschreibung || item.description || item.fachgebiet || "";
  }

  function allSearchItems() {
    return [
      ...data.resources.map((item) => ({ type: "Ressource", href: "../ressourcenbank/", ...item })),
      ...data.tools.map((item) => ({ type: "Werkzeug", href: "../werkzeuge/", ...item })),
      ...data.experts.map((item) => ({ type: "Experte", href: "../experten/", ...item })),
      ...data.projects.map((item) => ({ type: "Projekt", href: "../projekte/", ...item })),
      ...data.solutions.map((item) => ({ type: "Lösung", href: "../loesungen/", ...item })),
      ...data.decisions.map((item) => ({ type: "Entscheidung", href: "../entscheidungen/", ...item })),
    ];
  }

  function renderAreas() {
    areasRoot.innerHTML = areas
      .map(
        (area) => `
          <article class="platform-area-card">
            <span>${escapeHtml(area.status)}</span>
            <h3>${escapeHtml(area.title)}</h3>
            <p>${escapeHtml(area.description)}</p>
            <a href="${escapeHtml(area.href)}">Mehr ansehen</a>
          </article>
        `,
      )
      .join("");
  }

  function renderSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const items = allSearchItems().filter((item) => {
      if (!query) return true;
      return [title(item), description(item), item.kategorie, item.type, ...(item.tags || [])].join(" ").toLowerCase().includes(query);
    });
    resultsRoot.innerHTML = items.slice(0, 12).length
      ? items
          .slice(0, 12)
          .map(
            (item) => `
              <a class="platform-search-result" href="${escapeHtml(item.href)}">
                <span>${escapeHtml(item.type)}</span>
                <strong>${escapeHtml(title(item))}</strong>
                <small>${escapeHtml(description(item))}</small>
              </a>
            `,
          )
          .join("")
      : `<div class="resource-empty"><p>Keine passenden Einträge gefunden.</p></div>`;
  }

  function renderCommunity() {
    communityRoot.innerHTML = data.communityPosts
      .map(
        (post) => `
          <article class="platform-area-card">
            <span>${escapeHtml(post.typ)}</span>
            <h3>${escapeHtml(post.titel)}</h3>
            <p>${escapeHtml(post.kategorie)} · ${escapeHtml(post.beitraege)} Beiträge</p>
            <a href="../community/">Öffnen</a>
          </article>
        `,
      )
      .join("");
  }

  function renderCollection() {
    let keys = [];
    try {
      keys = JSON.parse(localStorage.getItem(collectionKey) || "[]");
    } catch {
      keys = [];
    }
    const items = keys
      .map((key) => {
        const [kind, id] = String(key).split(":");
        const source = { tools: data.tools, projects: data.projects, solutions: data.solutions, decisions: data.decisions }[kind] || [];
        const item = source.find((entry) => entry.id === id);
        return item ? { kind, item } : null;
      })
      .filter(Boolean);
    collectionRoot.innerHTML = items.length
      ? items
          .map(({ kind, item }) => `<a class="platform-search-result" href="../${kind === "tools" ? "werkzeuge" : kind === "projects" ? "projekte" : kind === "solutions" ? "loesungen" : "entscheidungen"}/"><span>${escapeHtml(kind)}</span><strong>${escapeHtml(title(item))}</strong><small>${escapeHtml(description(item))}</small></a>`)
          .join("")
      : `<div class="resource-empty"><p>Noch keine Inhalte gespeichert.</p></div>`;
  }

  searchInput.addEventListener("input", renderSearch);
  renderAreas();
  renderSearch();
  renderCommunity();
  renderCollection();
})();

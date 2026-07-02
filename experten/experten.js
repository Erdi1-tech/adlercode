(() => {
  const root = document.querySelector("[data-experts-page]");
  if (!root) return;

  const listRoot = root.querySelector("[data-expert-list]");
  const detailRoot = root.querySelector("[data-expert-detail]");
  const searchInput = root.querySelector("[data-expert-search]");
  const filterButtons = [...root.querySelectorAll("[data-expert-filter]")];
  const terms = window.ADLERCODE_TERMS;
  const resourceData = window.ADLERCODE_RESOURCE_DATA;
  let activeFilter = "all";

  const experts = [
    {
      id: "dr-lena-hoffmann",
      name: "Dr. Lena Hoffmann",
      role: "Konfliktanalyse und Mediation",
      initials: "LH",
      verified: true,
      badge: "Verifizierte Expertin",
      domain: "justice",
      fields: ["Mediation", "Verantwortung", "Konfliktklärung", "Narrative"],
      description:
        "Demo-Profil für eine Expertin, die komplexe Konflikte strukturiert, Rollen trennt und Verantwortung sichtbar macht. Der Fokus liegt auf Mediation, Perspektivwechsel und sauberer Analyse von Eskalationsmustern.",
      books: ["Lead by Example", "Adler-System"],
      videos: ["Konflikte ohne Schuldspirale analysieren", "Rollen und Verantwortung trennen"],
      analyses: ["Arbeitsplatzkonflikt", "Sorgerechtskonflikt", "Nachbarschaftsstreit"],
      rating: "4,9",
      reviews: "38 Bewertungen",
      links: ["Profil ansehen", "Website", "Veröffentlichte Analysen"],
      tags: ["Justice", "Mediation", "Verantwortung"],
      resourceIds: ["rechtliche-grundlagen-selbststaendige", "kooperationsvertrag-muster"],
    },
    {
      id: "maximilian-stein",
      name: "Maximilian Stein",
      role: "Systemanalyse und Organisation",
      initials: "MS",
      verified: true,
      badge: "Verifizierter Experte",
      domain: "business",
      fields: ["Systemanalyse", "Organisation", "Führung", "Kommunikation"],
      description:
        "Demo-Profil für einen Experten für organisationale Muster, Machtstrukturen und Führungsdynamiken. Seine Analysen verbinden Business-Fälle mit Adlercode-Begriffen wie Adlersystem, Schlangensystem und Narrativkontrolle.",
      books: ["Lead by Example", "Masks vs. Claws"],
      videos: ["Führung als Systemfrage", "Status, Kontrolle und Verantwortung"],
      analyses: ["Mobbing am Arbeitsplatz", "Arbeitsplatzkonflikt"],
      rating: "4,7",
      reviews: "24 Bewertungen",
      links: ["Profil ansehen", "LinkedIn", "Analysearchiv"],
      tags: ["Business", "Systemanalyse", "Führung"],
      resourceIds: ["businessplan-basis", "pitch-deck-struktur", "finanzuebersicht-projekte"],
    },
    {
      id: "sara-demir",
      name: "Sara Demir",
      role: "Mind, Narrative und Wahrnehmung",
      initials: "SD",
      verified: false,
      badge: "Community-Expertin",
      domain: "mind",
      fields: ["Narrativanalyse", "Wahrnehmung", "NPC-Filter", "Filmanalyse"],
      description:
        "Demo-Profil für eine Analystin im Bereich Adlercode Mind. Der Schwerpunkt liegt auf Filmen, Charakterrollen, Wahrnehmungsfiltern und der Verbindung von Musterbibliothek und Community-Analysen.",
      books: ["Force of Nature", "Setz die Brille auf! – NPC-Filter"],
      videos: ["NPC-Filter in Filmrollen erkennen", "Narrative und Perspektiven lesen"],
      analyses: ["The Social Network", "Marriage Story", "Whiplash"],
      rating: "4,8",
      reviews: "31 Bewertungen",
      links: ["Profil ansehen", "Mind-Analysen", "Videos"],
      tags: ["Mind", "Narrative", "Filmanalyse"],
      resourceIds: ["gaslighting-checkliste", "vertrauensradar-arbeitsblatt", "adlercode-muster-modell"],
    },
    {
      id: "rechtsberater",
      name: "Rechtsberater",
      role: "Rechtliche Grundlagen und Verträge",
      initials: "RB",
      verified: true,
      badge: "Verifizierter Experte",
      domain: "justice",
      fields: ["Recht", "Verträge", "Selbstständigkeit", "Dokumentation"],
      description:
        "Demo-Profil für einen Rechtsberater, der Orientierung zu einfachen Vertragsmustern, rechtlichen Grundlagen und sauberer Projekt-Dokumentation vorbereitet.",
      books: ["Adler-System"],
      videos: ["Verantwortung sauber dokumentieren", "Kooperationen klar strukturieren"],
      analyses: ["Kooperationskonflikt", "Selbstständigkeit und Verantwortung"],
      rating: "4,6",
      reviews: "19 Bewertungen",
      links: ["Profil ansehen", "Website", "Ressourcenbank"],
      tags: ["Recht", "Verträge", "Justice"],
      resourceIds: ["rechtliche-grundlagen-selbststaendige", "kooperationsvertrag-muster"],
    },
  ];

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function selectedId() {
    return window.location.hash.replace(/^#/, "") || experts[0].id;
  }

  function selectedExpert() {
    return experts.find((expert) => expert.id === selectedId()) || experts[0];
  }

  function matches(expert) {
    const query = searchInput.value.trim().toLowerCase();
    const filterMatch =
      activeFilter === "all" ||
      (activeFilter === "verified" && expert.verified) ||
      expert.domain === activeFilter;
    const text = [expert.name, expert.role, expert.description, expert.fields.join(" "), expert.books.join(" "), expert.analyses.join(" "), expert.tags.join(" ")]
      .join(" ")
      .toLowerCase();
    return filterMatch && (!query || text.includes(query));
  }

  function renderList() {
    const activeId = selectedExpert().id;
    const filtered = experts.filter(matches);
    listRoot.innerHTML = filtered.length
      ? filtered
          .map(
            (expert) => `
              <button type="button" class="expert-list-card${expert.id === activeId ? " is-selected" : ""}" data-expert-id="${escapeHtml(expert.id)}">
                <span class="expert-avatar" aria-hidden="true">${escapeHtml(expert.initials)}</span>
                <span>
                  <strong>${escapeHtml(expert.name)}</strong>
                  <small>${escapeHtml(expert.role)}</small>
                </span>
                ${expert.verified ? `<em>Verifiziert</em>` : `<em>Community</em>`}
              </button>
            `,
          )
          .join("")
      : `<div class="analysis-empty"><p>Keine Experten gefunden.</p></div>`;
  }

  function termLink(label) {
    return terms?.renderLink ? terms.renderLink(label, "expert-term-link") : escapeHtml(label);
  }

  function renderPills(items, className = "") {
    return `<div class="expert-pill-row ${className}">${items.map((item) => `<span>${termLink(item)}</span>`).join("")}</div>`;
  }

  function renderResourceList(title, items) {
    return `
      <article class="expert-resource-card">
        <h3>${escapeHtml(title)}</h3>
        <ul>
          ${items.map((item) => `<li>${termLink(item)}</li>`).join("")}
        </ul>
      </article>
    `;
  }

  function renderDetail() {
    const expert = selectedExpert();
    const expertResources = (resourceData?.resources || []).filter((resource) => (expert.resourceIds || []).includes(resource.id));
    const resourceFilterId = expertResources[0]?.experte || expert.id;
    const linkedTools = (resourceData?.tools || []).filter((tool) => (tool.expertenIds || []).includes(expert.id) || (tool.expertenIds || []).includes(resourceFilterId));
    const linkedProjects = (resourceData?.projects || []).filter((project) => (project.expertenIds || []).includes(expert.id) || (project.expertenIds || []).includes(resourceFilterId));
    detailRoot.innerHTML = `
      <article class="expert-profile">
        <header class="expert-profile-hero">
          <div class="expert-photo" aria-label="Profilbild Platzhalter">${escapeHtml(expert.initials)}</div>
          <div>
            <p class="eyebrow">Expertenprofil</p>
            <h2>${escapeHtml(expert.name)}</h2>
            <p>${escapeHtml(expert.role)}</p>
            <div class="expert-verification ${expert.verified ? "is-verified" : ""}">
              <span></span>
              ${escapeHtml(expert.badge)}
            </div>
          </div>
          <button
            type="button"
            class="content-discussion-button expert-question-button"
            data-discussion-start
            data-chat-type="expert"
            data-chat-title="Expertenprofil: ${escapeHtml(expert.name)}"
            data-chat-expert="${escapeHtml(expert.name)}"
            data-chat-href="${escapeHtml(window.location.pathname + "#" + expert.id)}"
            data-chat-icon="Experte"
            data-chat-participant-id="${escapeHtml(expert.id)}"
            data-chat-participant-name="${escapeHtml(expert.name)}"
            data-chat-participant-avatar="${escapeHtml(expert.initials)}"
          >Frage stellen</button>
        </header>

        <p class="expert-description">${escapeHtml(expert.description)}</p>

        <section class="expert-metrics" aria-label="Expertenbewertungen">
          <div>
            <strong>${escapeHtml(expert.rating)}</strong>
            <span>Bewertung</span>
          </div>
          <div>
            <strong>${escapeHtml(expert.reviews.split(" ")[0])}</strong>
            <span>${escapeHtml(expert.reviews.replace(/^[^ ]+ /, ""))}</span>
          </div>
          <div>
            <strong>${expert.analyses.length}</strong>
            <span>Analysen</span>
          </div>
          <div>
            <strong>${expertResources.length}</strong>
            <span>Ressourcen</span>
          </div>
          <div>
            <strong>${linkedTools.length}</strong>
            <span>Werkzeuge</span>
          </div>
        </section>

        <section class="expert-section" aria-labelledby="expert-fields-title">
          <h3 id="expert-fields-title">Fachgebiet</h3>
          ${renderPills(expert.fields)}
        </section>

        <section class="expert-resource-grid" aria-label="Expertenressourcen">
          ${renderResourceList("Bücher", expert.books)}
          ${renderResourceList("Videos", expert.videos)}
          ${renderResourceList("Veröffentlichte Analysen", expert.analyses)}
          ${renderResourceList("Links", expert.links)}
        </section>

        <section class="expert-section expert-linked-resources" aria-labelledby="expert-resources-title">
          <div class="expert-section-head">
            <h3 id="expert-resources-title">Ressourcen</h3>
            <a href="../ressourcenbank/?experte=${encodeURIComponent(resourceFilterId)}">Ressourcen ansehen</a>
          </div>
          <div data-expert-resource-cards></div>
        </section>

        <section class="expert-section expert-linked-resources" aria-labelledby="expert-tools-title">
          <div class="expert-section-head">
            <h3 id="expert-tools-title">Werkzeuge und Projekte</h3>
            <a href="../werkzeuge/">Werkzeugbank öffnen</a>
          </div>
          <div data-expert-platform-cards></div>
        </section>

        <section class="expert-community-note" aria-label="Zukünftige Expertenfunktionen">
          <h3>Community-Interaktion</h3>
          <p>Experten können später eigene Analysen veröffentlichen, öffentliche Diskussionen begleiten und mit der Community interagieren.</p>
          <div>
            <button type="button" disabled>Analyse veröffentlichen</button>
            <button type="button" disabled>Nachricht vorbereiten</button>
          </div>
        </section>
      </article>
    `;
    const resourceRoot = detailRoot.querySelector("[data-expert-resource-cards]");
    if (resourceRoot) {
      resourceRoot.innerHTML = expertResources.length
        ? expertResources
            .map(
              (resource) => `
                <article class="expert-resource-preview">
                  <span>${escapeHtml(resource.typ)} · ${escapeHtml(resource.kategorie)}</span>
                  <h4>${escapeHtml(resource.titel)}</h4>
                  <p>${escapeHtml(resource.beschreibung)}</p>
                  <a href="../ressourcenbank/?experte=${encodeURIComponent(resourceFilterId)}">In der Ressourcenbank ansehen</a>
                </article>
              `,
            )
            .join("")
        : `<div class="analysis-empty"><p>Noch keine Ressourcen verknüpft.</p></div>`;
    }
    const platformRoot = detailRoot.querySelector("[data-expert-platform-cards]");
    if (platformRoot) {
      const linkedItems = [
        ...linkedTools.map((tool) => ({ ...tool, typeLabel: "Werkzeug", href: "../werkzeuge/" })),
        ...linkedProjects.map((project) => ({ ...project, typeLabel: "Projekt", href: "../projekte/" })),
      ];
      platformRoot.innerHTML = linkedItems.length
        ? linkedItems
            .map(
              (item) => `
                <article class="expert-resource-preview">
                  <span>${escapeHtml(item.typeLabel)} · ${escapeHtml(item.kategorie || item.status || "Adlercode")}</span>
                  <h4>${escapeHtml(item.titel)}</h4>
                  <p>${escapeHtml(item.beschreibung)}</p>
                  <a href="${escapeHtml(item.href)}">Öffnen</a>
                </article>
              `,
            )
            .join("")
        : `<div class="analysis-empty"><p>Noch keine Werkzeuge oder Projekte verknüpft.</p></div>`;
    }
    terms?.linkify?.(detailRoot);
  }

  function render() {
    renderList();
    renderDetail();
  }

  root.addEventListener("click", (event) => {
    const card = event.target.closest("[data-expert-id]");
    if (!card) return;
    window.history.replaceState(null, "", `#${card.dataset.expertId}`);
    render();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.expertFilter;
      filterButtons.forEach((item) => item.classList.toggle("is-selected", item === button));
      render();
    });
  });

  searchInput.addEventListener("input", renderList);
  window.addEventListener("hashchange", render);
  render();
})();

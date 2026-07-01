(() => {
  const searchRoot = document.querySelector("[data-global-search]");
  const input = document.querySelector("[data-global-search-input]");
  const resultsRoot = document.querySelector("[data-global-search-results]");
  const suggestionsRoot = document.querySelector("[data-global-search-suggestions]");

  window.ADLERCODE_GLOBAL_SEARCH = {
    version: "1.0.0",
    ready: Boolean(searchRoot && input && resultsRoot),
  };

  if (!searchRoot || !input || !resultsRoot) return;

  const termsApi = window.ADLERCODE_TERMS || {};
  const definitions = termsApi.definitions || {};
  const categories = termsApi.categories || {};
  const currentPath = window.location.pathname;
  const rootPrefix = currentPath.includes("/Adlercode/") && !currentPath.endsWith("/Adlercode/") ? "../" : "./";

  const state = {
    query: "",
    type: "all",
    category: "all",
    tag: "all",
    sort: "relevance",
  };

  const typeLabels = {
    all: "Alle",
    case: "Fälle",
    community: "Community",
    term: "Begriffe",
    film: "Filme",
    book: "Bücher",
    expert: "Experten",
    comment: "Kommentare",
    area: "Bereiche",
  };

  const baseItems = [
    item("case", "Arbeitsplatzkonflikt", "Justice", "Ein Fall über Anerkennung, Status, Verantwortung und unklare Führungsentscheidungen.", "./justice/faelle/#arbeitsplatzkonflikt", ["Arbeit", "Verantwortung", "Narrativkontrolle"], "Fallbibliothek", 98),
    item("case", "Nachbarschaftsstreit", "Justice", "Ein Alltagskonflikt über Grenzen, Wahrnehmung, Lärm und direkte Kommunikation.", "./justice/faelle/#nachbarschaftsstreit", ["Alltag", "Grenzen", "Wahrnehmung"], "Fallbibliothek", 82),
    item("case", "Erbstreit", "Justice", "Ein Familienfall über Fairness, Loyalität, alte Rollen und moralische Anerkennung.", "./justice/faelle/#erbstreit", ["Familie", "Moral", "Rollen"], "Fallbibliothek", 78),
    item("case", "Mobbing am Arbeitsplatz", "Justice", "Ein Fall über verdeckte Abwertung, diffuse Verantwortung und wiederkehrende Muster.", "./justice/faelle/#mobbing-am-arbeitsplatz", ["Arbeit", "Covert", "Musteranalyse"], "Fallbibliothek", 92),
    item("case", "Sorgerechtskonflikt", "Justice", "Ein Fall über Kindeswohl, Verantwortung, Rollen und konkurrierende Narrative.", "./justice/faelle/#sorgerechtskonflikt", ["Familie", "Rollenanalyse", "Narrativ"], "Fallbibliothek", 88),
    item("community", "Neueste öffentliche Analysen", "Community", "Öffentliche Film- und Charakteranalysen aus der Adlercode-Community.", "./community/", ["Analysen", "Community", "Öffentlich"], "Community", 70),
    item("community", "Justice Community", "Justice", "Neue Fälle, Kommentare, Diskussionen und meistdiskutierte Begriffe.", "./justice/community/", ["Justice", "Kommentare", "Fälle"], "Community", 76),
    item("area", "Adlercode Mind", "Mind", "Bereich für Filmbibliothek, Charakterbibliothek, Bücher, Begriffe, Modelle, Persönlichkeitsspektren und Community.", "./mind/", ["Mind", "Analyse", "Modelle"], "Bereiche", 96),
    item("film", "Filmbibliothek", "Mind", "Suche Filme, öffne Casts und starte Analysen über Narrative, Moral und Systeme.", "./filmanalyse/", ["Mind", "Filme", "Filmanalyse"], "Mind", 88),
    item("film", "Charakterbibliothek", "Mind", "Analysiere Rollen, Programme, Verhalten und Entwicklung einzelner Figuren.", "./filmanalyse/", ["Mind", "Charaktere", "NPC-Programme"], "Mind", 86),
    item("term", "Modelle", "Mind", "Analysemodelle wie Narrativanalyse, Systemanalyse, Moralpyramide und NPC-Programme.", "./musterbibliothek/?term=bereich-analyse", ["Modelle", "Analyse", "Framework"], "Mind", 84),
    item("term", "Persönlichkeitsspektren", "Mind", "Spektren für Empath, Narzisst, Psychopath, Covert und spätere Persönlichkeitsmodelle.", "./musterbibliothek/?term=npc-programme", ["Personenprofile", "NPC", "Mind"], "Mind", 82),
    item("film", "The Social Network", "Mind", "Demo-Verknüpfung für Macht, Status, Gründung, Konflikt und Systemdruck.", "./filmanalyse/?q=The%20Social%20Network", ["Business", "Status", "Systemanalyse"], "Filmanalyse", 72),
    item("film", "Marriage Story", "Mind", "Demo-Verknüpfung für Beziehung, Trennung, Rollen und Sorgerechtskonflikte.", "./filmanalyse/?q=Marriage%20Story", ["Beziehungen", "Rollen", "Moral"], "Filmanalyse", 68),
    item("film", "Whiplash", "Mind", "Demo-Verknüpfung für Druck, Leistung, Kontrolle und Grenzverletzung.", "./filmanalyse/?q=Whiplash", ["Psychologie", "Kontrolle", "System"], "Filmanalyse", 64),
    item("expert", "Dr. Lena Hoffmann", "Experten", "Demo-Expertin für Konfliktanalyse, Mediation, Verantwortung und Narrativklärung.", "./experten/#dr-lena-hoffmann", ["Justice", "Mediation", "Verantwortung"], "Experten", 78),
    item("expert", "Maximilian Stein", "Experten", "Demo-Experte für Systemanalyse, Organisation, Führung und Kommunikation.", "./experten/#maximilian-stein", ["Business", "Systemanalyse", "Führung"], "Experten", 72),
    item("expert", "Sara Demir", "Experten", "Demo-Expertin für Mind, Narrative, Wahrnehmung, NPC-Filter und Filmanalyse.", "./experten/#sara-demir", ["Mind", "Narrative", "Filmanalyse"], "Experten", 70),
    item("expert", "Juristen", "Experten", "Zukünftige Expertengruppe für Verantwortung, Recht, Konflikte und Fallanalysen.", "./experten/", ["Justice", "Recht", "Verantwortung"], "Experten", 44),
    item("expert", "Mediatoren", "Experten", "Zukünftige Expertengruppe für Konfliktklärung, Kommunikation und Perspektivwechsel.", "./experten/", ["Konflikt", "Mediation", "Kommunikation"], "Experten", 42),
    item("comment", "Das Muster ist wichtiger als die einzelne Bemerkung.", "Kommentar", "Demo-Kommentar aus dem Fall Mobbing am Arbeitsplatz.", "./justice/faelle/#mobbing-am-arbeitsplatz", ["Kommentar", "Musteranalyse", "Covert"], "Kommentare", 38),
    item("comment", "Hier braucht es sehr klare Rollentrennung.", "Kommentar", "Demo-Kommentar aus dem Sorgerechtskonflikt.", "./justice/faelle/#sorgerechtskonflikt", ["Kommentar", "Rollen", "Familie"], "Kommentare", 36),
  ];

  const bookItems = [
    ["Lead by Example", "Band 1", "Der Einstieg in Adlercode: Verantwortung, Adlerlogik und klare Haltung gegenüber Systemdruck.", ["Adlersystem", "Verantwortung", "Führung"]],
    ["Masks vs. Claws", "Band 2", "Psychologische Programme, Masken und verdeckte Dynamiken im Fokus.", ["Covert", "Main-ID", "Identität"]],
    ["Force of Nature", "Band 3", "Eine Vertiefung zu NPC, emotionaler Dominanz, Identität und Narrativen.", ["NPC-System", "Narrativanalyse", "Moral"]],
    ["Setz die Brille auf! - NPC-Filter", "Band 4", "Ein kompakter Blick auf NPC-Filter, Programmwechsel, Maskenspiel und Narrativkontrolle.", ["NPC-Filter", "Programmwechsel", "Narrativkontrolle"]],
    ["Adler-System", "Band 5", "Das zentrale Systembuch: Programme, Moral, Filter und Weltbilder im Adlercode-Modell.", ["Adlersystem", "Filteranalyse", "Moral"]],
  ].map(([title, category, summary, tags], index) => item("book", title, category, summary, "./buecher/", tags, "Buecher", 90 - index));

  const termItems = [
    ...Object.entries(categories).map(([title, definition]) =>
      item("term", title, "Musterbibliothek", definition, termHref(title), ["Kategorie", "Framework"], "Begriffe", 84),
    ),
    ...Object.entries(definitions).map(([title, definition]) =>
      item("term", title, "Musterbibliothek", definition, termHref(title), termTags(title), "Begriffe", 86),
    ),
  ];

  const searchIndex = [...termItems, ...bookItems, ...baseItems].map((entry) => ({
    ...entry,
    haystack: normalize([entry.title, entry.typeLabel, entry.category, entry.summary, entry.tags.join(" "), entry.collection].join(" ")),
  }));

  const filterOptions = {
    types: ["all", ...unique(searchIndex.map((entry) => entry.type))],
    categories: ["all", ...unique(searchIndex.map((entry) => entry.category))],
    tags: ["all", ...unique(searchIndex.flatMap((entry) => entry.tags)).slice(0, 18)],
  };

  function item(type, title, category, summary, href, tags = [], collection = "", weight = 50) {
    return { type, title, category, summary, href, tags, collection, weight, typeLabel: typeLabels[type] || type };
  }

  function termHref(title) {
    const term = termsApi.get?.(title);
    const id = term?.id || slug(title);
    return `./musterbibliothek/?term=${encodeURIComponent(id)}`;
  }

  function termTags(title) {
    const lower = normalize(title);
    if (lower.includes("system")) return ["Systeme", "Framework"];
    if (["empath", "narzisst", "psychopath", "covert", "npc programme"].some((part) => lower.includes(part))) return ["Personenprofile", "NPC"];
    if (lower.includes("moral")) return ["Moral", "Verantwortung"];
    if (lower.includes("narrativ")) return ["Narrative", "Perspektive"];
    if (lower.includes("analyse")) return ["Analyse", "Framework"];
    return ["Begriff", "Musterbibliothek"];
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\bfachleute\b/g, "experten");
  }

  function slug(value) {
    return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "de"));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function score(entry, query) {
    if (!query) return entry.weight;
    const normalizedTitle = normalize(entry.title);
    const titleWords = normalizedTitle.split(/[^a-z0-9]+/).filter(Boolean);
    let value = entry.weight;
    if (normalizedTitle === query) value += 140;
    if (normalizedTitle.startsWith(query)) value += 90;
    if (titleWords.some((word) => word === query)) value += 95;
    if (titleWords.some((word) => word.startsWith(query))) value += 70;
    if (normalizedTitle.includes(query)) value += 64;
    if (entry.haystack.includes(query)) value += 28;
    query.split(/\s+/).filter(Boolean).forEach((part) => {
      if (entry.haystack.includes(part)) value += 12;
    });
    return value;
  }

  function search() {
    const query = normalize(state.query.trim());
    if (!query) return [];
    return searchIndex
      .map((entry) => ({ ...entry, score: score(entry, query) }))
      .filter((entry) => {
        const queryMatch = entry.haystack.includes(query) || query.split(/\s+/).every((part) => entry.haystack.includes(part));
        const typeMatch = state.type === "all" || entry.type === state.type;
        const categoryMatch = state.category === "all" || entry.category === state.category;
        const tagMatch = state.tag === "all" || entry.tags.includes(state.tag);
        return queryMatch && typeMatch && categoryMatch && tagMatch;
      })
      .sort((a, b) => {
        if (state.sort === "az") return a.title.localeCompare(b.title, "de");
        if (state.sort === "type") return a.typeLabel.localeCompare(b.typeLabel, "de") || b.score - a.score;
        return b.score - a.score;
      });
  }

  function renderControls() {
    return `
      <div class="global-search-toolbar" aria-label="Suchfilter">
        ${renderSelect("type", "Typ", filterOptions.types.map((value) => [value, typeLabels[value] || value]))}
        ${renderSelect("category", "Kategorie", filterOptions.categories.map((value) => [value, value === "all" ? "Alle Kategorien" : value]))}
        ${renderSelect("tag", "Tag", filterOptions.tags.map((value) => [value, value === "all" ? "Alle Tags" : value]))}
        ${renderSelect("sort", "Sortierung", [["relevance", "Relevanz"], ["az", "A-Z"], ["type", "Typ"]])}
      </div>
    `;
  }

  function renderSelect(key, label, options) {
    return `
      <label>
        <span>${escapeHtml(label)}</span>
        <select data-global-search-control="${escapeHtml(key)}">
          ${options.map(([value, text]) => `<option value="${escapeHtml(value)}"${state[key] === value ? " selected" : ""}>${escapeHtml(text)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  function renderSuggestions() {
    if (!suggestionsRoot) return;
    const query = normalize(state.query.trim());
    if (!query) {
      suggestionsRoot.innerHTML = "";
      suggestionsRoot.classList.remove("is-visible");
      return;
    }
    const suggestions = searchIndex
      .filter((entry) => normalize(entry.title).includes(query) || entry.haystack.includes(query))
      .sort((a, b) => score(b, query) - score(a, query))
      .slice(0, 5);

    suggestionsRoot.innerHTML = suggestions.length
      ? suggestions.map((entry) => `<button type="button" data-global-suggestion="${escapeHtml(entry.title)}"><span>${escapeHtml(entry.title)}</span><small>${escapeHtml(entry.typeLabel)}</small></button>`).join("")
      : "";
    suggestionsRoot.classList.toggle("is-visible", Boolean(suggestions.length));
  }

  function render() {
    const query = state.query.trim();
    if (!query) {
      resultsRoot.innerHTML = "";
      document.querySelector("[data-platform-home]")?.classList.remove("has-platform-content");
      renderSuggestions();
      return;
    }

    const results = search();
    document.querySelector("[data-platform-home]")?.classList.add("has-platform-content");
    resultsRoot.innerHTML = `
      <article class="global-search-panel">
        <header class="global-search-head">
          <div>
            <p class="eyebrow">Globale Suche</p>
            <h2>${results.length ? `${results.length} Treffer` : "Keine Treffer"}</h2>
          </div>
          <span>Live</span>
        </header>
        ${renderControls()}
        ${
          results.length
            ? `<div class="global-search-results">${results.slice(0, 24).map(renderResult).join("")}</div>`
            : `<div class="global-search-empty"><p>Keine Treffer gefunden. Versuche einen anderen Begriff oder entferne Filter.</p></div>`
        }
      </article>
    `;
    renderSuggestions();
  }

  function renderResult(entry) {
    return `
      <a class="global-search-result" href="${escapeHtml(entry.href)}">
        <span class="global-search-type">${escapeHtml(entry.typeLabel)}</span>
        <h3>${escapeHtml(entry.title)}</h3>
        <p>${escapeHtml(entry.summary)}</p>
        <div class="global-search-meta">
          <span>${escapeHtml(entry.category)}</span>
          ${entry.tags.slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
      </a>
    `;
  }

  input.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const firstResult = search()[0];
    if (firstResult) window.location.href = firstResult.href;
  });

  suggestionsRoot?.addEventListener("click", (event) => {
    const suggestion = event.target.closest("[data-global-suggestion]");
    if (!suggestion) return;
    input.value = suggestion.dataset.globalSuggestion;
    state.query = input.value;
    input.focus();
    render();
  });

  resultsRoot.addEventListener("change", (event) => {
    const control = event.target.closest("[data-global-search-control]");
    if (!control) return;
    state[control.dataset.globalSearchControl] = control.value;
    render();
  });
})();

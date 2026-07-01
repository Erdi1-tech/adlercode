(() => {
const adlerLibrariesRoot = document.querySelector(".library-explorer");

if (adlerLibrariesRoot) {
  const sharedTerms = window.ADLERCODE_TERMS || { categories: {}, definitions: {} };
  const categoryInfo = sharedTerms.categories || {};
  const termDefinitions = sharedTerms.definitions || {};

  const libraries = [
    {
      id: "muster",
      title: "Musterbibliothek",
      placeholder: "Suche nach Mustern, Systemen oder Begriffen ...",
      groups: [
        {
          title: "Adlercode",
          overview: overview("Adlercode", ["Was ist Adlercode?", "Ziel", "Framework"]),
        },
        {
          title: "Personen",
          overview: overview("Personen"),
          items: [
            term("Natürliche Person", "Personen"),
            term("Juristische Person", "Personen"),
            term("Einzelperson", "Personen"),
            term("Gemeinschaft", "Personen"),
          ],
        },
        {
          title: "Systeme",
          overview: overview("Systeme"),
          items: [
            term("Adlersystem", "Systeme", ["Eigenverantwortung", "Klarheit", "Entwicklung"], ["NPC-System", "Moralpyramide"], ["Adler-System"]),
            term("Schlangensystem", "Systeme", ["Status", "Kontrolle", "Anpassung"], ["Adlersystem", "NPC-System"], ["Masks vs. Claws"]),
            term("NPC-System", "Systeme", ["Programme", "Rollen", "Verhaltensmuster"], ["NPC-Programme", "NPC-Filter"], ["Setz die Brille auf! – NPC-Filter"]),
          ],
        },
        {
          title: "Personenprofile",
          overview: overview("Personenprofile"),
          items: [
            term("Empath", "Personenprofile"),
            term("Narzisst", "Personenprofile"),
            term("Psychopath", "Personenprofile"),
            term("Covert", "Personenprofile"),
            term("NPC-Programme", "Personenprofile", ["Denkmuster", "Wahrnehmungsmuster", "Verhaltensmuster"], ["NPC-System", "NPC-Filter"], ["Setz die Brille auf! – NPC-Filter"]),
          ],
        },
        {
          title: "Moral",
          overview: overview("Moral"),
          items: [
            term("Moralpyramide", "Moral", ["moralische Ebenen", "Orientierung", "Einordnung"], ["Adlersystem", "Sicherheitspyramide"], ["Adler-System"]),
            term("Sicherheitspyramide", "Moral"),
          ],
        },
        {
          title: "Identität",
          overview: overview("Identität"),
          items: [
            term("Main-ID", "Identität"),
            term("Masken-ID", "Identität"),
            term("Programmwechsel", "Identität"),
          ],
        },
        {
          title: "Wahrnehmung",
          overview: overview("Wahrnehmung"),
          items: [
            term("Filter", "Wahrnehmung"),
            term("NPC-Filter", "Wahrnehmung"),
            term("Wahrnehmung", "Wahrnehmung"),
            term("Realität", "Wahrnehmung"),
          ],
        },
        {
          title: "Narrative",
          overview: overview("Narrative"),
          items: [
            term("Narrativ", "Narrative"),
            term("Narrativkontrolle", "Narrative"),
            term("NPC-Narrative", "Narrative"),
            term("Rollenspiel", "Narrative"),
            term("Rollenwechsel", "Narrative"),
          ],
        },
        {
          title: "Analyse",
          overview: overview("Analyse"),
          items: [
            term("Musteranalyse", "Analyse"),
            term("Rollenanalyse", "Analyse"),
            term("Systemanalyse", "Analyse"),
            term("Narrativanalyse", "Analyse"),
          ],
        },
        {
          title: "Gewalt",
          overview: overview("Gewalt"),
          items: [
            term("Naturgewalt", "Gewalt"),
            term("Systemische Gewalt", "Gewalt"),
            term("Natürliche Gewalt", "Gewalt"),
            term("Zwangsgewalt", "Gewalt"),
          ],
        },
      ],
    },
    library("buch", "Bücher", "Suche nach Büchern, Autoren oder Themen ...", ["Adlercode-Bücher", "Autoren", "Themen"]),
    library("film", "Filmanalyse", "Suche nach Filmen, Serien, Charakteren oder Mustern ...", ["Filme", "Serien", "Charaktere", "Musteranalysen", "Rollenanalysen", "Verhaltensanalysen"]),
  ];

  const treeRoot = adlerLibrariesRoot.querySelector("[data-explorer-nav]");
  const contentRoot = adlerLibrariesRoot.querySelector("[data-explorer-content]");
  const searchInput = adlerLibrariesRoot.querySelector("[data-pattern-search]");
  const searchResults = adlerLibrariesRoot.querySelector("[data-search-results]");
  const menuButton = adlerLibrariesRoot.querySelector("[data-explorer-menu]");
  const closeButton = adlerLibrariesRoot.querySelector("[data-explorer-close]");
  const searchLabel = adlerLibrariesRoot.querySelector(".library-explorer-search label");
  let activeLibraryId = "muster";

  function library(id, title, searchPlaceholder, folders) {
    return {
      id,
      title,
      placeholder: searchPlaceholder,
      groups: folders.map((folder) => ({
        title: folder,
        folders: [{ title: folder, items: [placeholder(folder)] }],
      })),
    };
  }

  function entry(id, title, group, description, explanation, properties = [], related = [], books = []) {
    return { id, title, group, description, explanation, properties, related, books };
  }

  function overview(title, properties = []) {
    return entry(
      "bereich-" + slug(title),
      title,
      title,
      categoryInfo[title] || title + " ist ein Hauptbereich der Musterbibliothek.",
      "Dieser Bereich bündelt die wichtigsten Begriffe und Modelle. Die Inhalte werden schrittweise erweitert.",
      properties.length ? properties : ["Hauptbereich", "einordnend", "erweiterbar"],
      [],
      []
    );
  }

  function term(title, group, properties = [], related = [], books = []) {
    const definition = termDefinitions[title] || title + " ist ein Begriff innerhalb des Bereichs " + group + ".";
    return entry(
      slug(title),
      title,
      group,
      definition,
      "Die ausführliche Erklärung wird schrittweise in der Musterbibliothek ergänzt.",
      properties.length ? properties : ["Begriff vorbereitet", "erweiterbar", "verknüpfbar"],
      related,
      books
    );
  }

  function placeholder(title) {
    return entry(slug(title), title, title, "Dieser Bereich ist vorbereitet und kann später mit Einträgen erweitert werden.", "Neue Inhalte können direkt in der JavaScript-Struktur ergänzt werden.", ["vorbereitet"], [], []);
  }

  function slug(value) {
    return value.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function formatDefinition(value) {
    return escapeHtml(value).replace(/\n/g, "<br />");
  }

  function activeLibrary() {
    return libraries.find((item) => item.id === activeLibraryId) || null;
  }

  function allEntries(libraryItem = activeLibrary()) {
    if (!libraryItem) return [];
    return libraryItem.groups.flatMap((group) => {
      const directEntries = group.overview ? [{ ...group.overview, library: libraryItem.title, category: group.title, folder: group.title }] : [];
      const itemEntries = (group.items || []).map((item) => ({ ...item, library: libraryItem.title, category: group.title, folder: group.title }));
      const folderEntries = (group.folders || []).flatMap((folder) =>
        folder.items.map((item) => ({ ...item, library: libraryItem.title, category: group.title, folder: folder.title }))
      );
      return [...directEntries, ...itemEntries, ...folderEntries];
    });
  }

  function findEntryByTitle(title) {
    const cleanTitle = String(title || "").trim().toLowerCase();
    return allEntries(activeLibrary()).find((item) => item.title.toLowerCase() === cleanTitle) || null;
  }

  function renderRelatedTerms(item) {
    const explicitRelated = (item.related || [])
      .map((title) => ({ title, entry: findEntryByTitle(title) }))
      .filter((related) => related.entry);
    const categoryRelated = explicitRelated.length
      ? []
      : allEntries(activeLibrary())
        .filter((entryItem) => entryItem.category === item.category && entryItem.id !== item.id && entryItem.id.indexOf("bereich-") !== 0)
        .slice(0, 5)
        .map((entryItem) => ({ title: entryItem.title, entry: entryItem }));
    const relatedItems = explicitRelated.length ? explicitRelated : categoryRelated;

    if (!relatedItems.length) return "";

    return `
      <div class="library-related-terms" aria-label="Verknüpfte Begriffe">
        <p>Verknüpfte Begriffe</p>
        <div>
          ${relatedItems.map((related) => `<button type="button" data-entry-id="${related.entry.id}">${escapeHtml(related.title)}</button>`).join("")}
        </div>
      </div>
    `;
  }

  function setMenu(open) {
    adlerLibrariesRoot.classList.toggle("is-nav-open", open);
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute("aria-label", open ? "Bibliotheken schließen" : "Bibliotheken öffnen");
  }

  function renderTree() {
    if (!treeRoot) return;
    const current = activeLibrary();
    treeRoot.innerHTML = `
      ${current ? current.groups.map((group) => {
        if (group.overview && !group.items?.length && !group.folders?.length) {
          return `<button class="library-tree-category-button" type="button" data-entry-id="${group.overview.id}">${escapeHtml(group.title)}</button>`;
        }

        const directItems = (group.items || []).map((item) => `<button type="button" data-entry-id="${item.id}">${escapeHtml(item.title)}</button>`).join("");
        const folderItems = (group.folders || []).map((folder) => `
          <details class="library-tree-group">
            <summary>${escapeHtml(folder.title)}</summary>
            <div class="library-tree-items">
              ${folder.items.map((item) => `<button type="button" data-entry-id="${item.id}">${escapeHtml(item.title)}</button>`).join("")}
            </div>
          </details>
        `).join("");

        return `
          <details class="library-tree-category">
            <summary>${escapeHtml(group.title)}</summary>
            ${directItems ? `<div class="library-tree-items">${directItems}</div>` : ""}
            ${folderItems}
          </details>
        `;
      }).join("") : ""}
    `;
  }

  function renderOverview() {
    if (!contentRoot) return;
    const current = activeLibrary();
    contentRoot.innerHTML = `
      <article class="library-document">
        <header class="library-document-header">
          <span>${escapeHtml(current?.title || "Adlercode Bibliotheken")}</span>
          <h1>${escapeHtml(current?.title || "Adlercode Bibliotheken")}</h1>
          <p>Wähle links eine Kategorie oder nutze die Suche.</p>
        </header>
      </article>
    `;
  }

  function renderEntry(item) {
    if (!contentRoot) return;
    contentRoot.innerHTML = `
      <article class="library-document">
        <header class="library-document-header">
          <span>${escapeHtml(item.library)}${item.group && item.group !== item.library ? " / " + escapeHtml(item.group) : ""}</span>
          <h1>${escapeHtml(item.title)}</h1>
          <p>${formatDefinition(item.description)}</p>
        </header>
        ${renderRelatedTerms(item)}
      </article>
    `;
  }

  function renderSearch(query) {
    if (!searchResults) return;
    const clean = query.trim().toLowerCase();
    if (!clean) {
      searchResults.innerHTML = "";
      return;
    }

    const results = allEntries(activeLibrary())
      .filter((item) => [item.title, item.library, item.category, item.folder, item.description, ...item.properties, ...item.related, ...item.books].join(" ").toLowerCase().includes(clean))
      .slice(0, 14);

    searchResults.innerHTML = `
      <p>Suche</p>
      <div>${results.length ? results.map((item) => `<button type="button" data-entry-id="${item.id}">${escapeHtml(item.title)}<span>${escapeHtml(item.category)}</span></button>`).join("") : "<span>Keine Treffer gefunden.</span>"}</div>
    `;
  }

  function selectLibrary(id) {
    activeLibraryId = id;
    const current = activeLibrary();
    if (searchLabel) searchLabel.textContent = current.title;
    if (searchInput) searchInput.placeholder = current.placeholder;
    renderTree();
    renderSearch(searchInput?.value || "");
    renderOverview();
  }

  function selectEntry(id, libraryId = activeLibraryId) {
    if (libraryId && libraryId !== activeLibraryId) {
      activeLibraryId = libraryId;
      const current = activeLibrary();
      if (searchLabel) searchLabel.textContent = current.title;
      if (searchInput) searchInput.placeholder = current.placeholder;
      renderTree();
    }

    const selected = allEntries(activeLibrary()).find((item) => item.id === id);
    if (!selected) return;
    renderEntry(selected);
    adlerLibrariesRoot.querySelectorAll("[data-entry-id]").forEach((button) => {
      const isSelected = button.dataset.entryId === id;
      button.classList.toggle("is-selected", isSelected);
      if (isSelected) {
        button.closest("details")?.setAttribute("open", "");
        button.closest(".library-tree-category")?.setAttribute("open", "");
      }
    });
    const url = new URL(window.location.href);
    url.searchParams.set("term", id);
    window.history.replaceState({}, "", url);
  }

  adlerLibrariesRoot.addEventListener("click", (event) => {
    const entryButton = event.target.closest("[data-entry-id]");
    const overviewButton = event.target.closest("[data-overview-entry-id]");
    const libraryButton = event.target.closest("[data-library-id]");

    if (entryButton) {
      if (entryButton.matches("summary")) {
        event.preventDefault();
        const categoryDetails = entryButton.closest("details");
        const shouldOpen = !categoryDetails?.hasAttribute("open");
        selectEntry(entryButton.dataset.entryId, entryButton.dataset.libraryId);
        if (categoryDetails) {
          categoryDetails.toggleAttribute("open", shouldOpen);
        }
        return;
      }
      selectEntry(entryButton.dataset.entryId, entryButton.dataset.libraryId);
      return;
    }

    if (overviewButton) {
      selectEntry(overviewButton.dataset.overviewEntryId);
      return;
    }

    if (libraryButton) {
      selectLibrary(libraryButton.dataset.libraryId);
    }
  });

  menuButton?.addEventListener("click", () => setMenu(!adlerLibrariesRoot.classList.contains("is-nav-open")));
  closeButton?.addEventListener("click", () => setMenu(false));
  searchInput?.addEventListener("input", (event) => {
    renderSearch(event.target.value);
    if (event.target.value.trim()) setMenu(true);
  });

  function libraryIcon(id) {
    return { muster: "Muster", buch: "Buch", film: "Film" }[id] || "Bibliothek";
  }

  function initialTermId() {
    const params = new URLSearchParams(window.location.search);
    const queryTerm = params.get("term");
    const hashTerm = window.location.hash.replace(/^#/, "");
    return queryTerm || hashTerm || "";
  }

  selectLibrary(activeLibraryId);
  const requestedTerm = initialTermId();
  if (requestedTerm) {
    selectEntry(requestedTerm);
    setMenu(true);
  } else {
    setMenu(window.matchMedia("(min-width: 861px)").matches);
  }
}
})();

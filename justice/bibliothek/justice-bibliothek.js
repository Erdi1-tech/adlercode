(() => {
  const root = document.querySelector("[data-justice-library]");
  if (!root) return;

  const navRoot = root.querySelector("[data-justice-library-nav]");
  const contentRoot = root.querySelector("[data-justice-library-content]");
  const searchInput = root.querySelector("[data-justice-library-search]");
  const menuButton = root.querySelector("[data-justice-library-menu]");
  const closeButton = root.querySelector("[data-justice-library-close]");

  const categories = [
    ["Verantwortung", ["Verantwortung", "Pflicht", "Zuständigkeit"]],
    ["Schuld", ["Schuld", "Vorwurf", "Mitverantwortung"]],
    ["Beweis", ["Beweis", "Indiz", "Dokumentation"]],
    ["Konflikt", ["Konflikt", "Eskalation", "Grenze"]],
    ["Mediation", ["Mediation", "Vermittlung", "Perspektivwechsel"]],
    ["Aussage", ["Aussage", "Glaubwürdigkeit", "Widerspruch"]],
    ["Rollen", ["Rollenwechsel", "Beteiligte", "Rollenklärung"]],
    ["Narrative", ["Narrativkontrolle", "Opfernarrativ", "Rechtfertigung"]],
    ["Systeme", ["Systemanalyse", "Machtstruktur", "Regelstruktur"]],
    ["Interessenkonflikte", ["Interessenkonflikt", "Loyalität", "Doppelte Rolle"]],
  ];

  const definitions = {
    Verantwortung: "Verantwortung beschreibt, wer in einer Situation Einfluss, Zuständigkeit oder Handlungspflicht trägt.",
    Pflicht: "Pflicht beschreibt eine erwartete Handlung oder Unterlassung innerhalb einer Rolle, Beziehung oder Struktur.",
    Zuständigkeit: "Zuständigkeit klärt, wer für Entscheidung, Kommunikation oder Begrenzung eines Problems verantwortlich ist.",
    Schuld: "Schuld beschreibt eine zugeschriebene Verursachung oder moralische Verantwortung für einen Schaden.",
    Vorwurf: "Ein Vorwurf ist eine gerichtete Zuschreibung von Fehlverhalten, Verantwortung oder Pflichtverletzung.",
    Mitverantwortung: "Mitverantwortung beschreibt anteilige Verantwortung mehrerer Beteiligter innerhalb eines Konflikts.",
    Beweis: "Ein Beweis stützt eine Behauptung durch überprüfbare Informationen, Dokumente oder Beobachtungen.",
    Indiz: "Ein Indiz weist auf einen Zusammenhang hin, beweist ihn aber nicht allein vollständig.",
    Dokumentation: "Dokumentation ordnet Ereignisse, Aussagen und Zeitpunkte nachvollziehbar.",
    Konflikt: "Ein Konflikt entsteht, wenn Interessen, Grenzen, Rollen oder Narrative aufeinanderprallen.",
    Eskalation: "Eskalation beschreibt die Verschärfung eines Konflikts durch Handlung, Sprache oder Systemreaktion.",
    Grenze: "Eine Grenze markiert, was eine Person, Rolle oder Struktur akzeptiert oder nicht akzeptiert.",
    Mediation: "Mediation ist ein strukturierter Vermittlungsprozess zwischen Konfliktparteien.",
    Vermittlung: "Vermittlung schafft Raum, damit unterschiedliche Perspektiven geordnet ausgesprochen werden können.",
    Perspektivwechsel: "Perspektivwechsel beschreibt das bewusste Einnehmen einer anderen Sicht auf dieselbe Situation.",
    Aussage: "Eine Aussage ist eine Darstellung von Wahrnehmung, Erinnerung oder Behauptung.",
    Glaubwürdigkeit: "Glaubwürdigkeit beschreibt, wie nachvollziehbar und konsistent eine Aussage wirkt.",
    Widerspruch: "Ein Widerspruch zeigt Spannungen zwischen Aussagen, Handlungen oder dokumentierten Fakten.",
    Rollenwechsel: "Rollenwechsel beschreibt den Übergang von einer sozialen oder funktionalen Rolle in eine andere.",
    Beteiligte: "Beteiligte sind Personen oder Rollen, die eine Situation beeinflussen oder von ihr betroffen sind.",
    Rollenklärung: "Rollenklärung macht sichtbar, wer welche Aufgabe, Grenze und Verantwortung trägt.",
    Narrativkontrolle: "Narrativkontrolle beschreibt den Versuch, die Deutung einer Situation zu dominieren.",
    Opfernarrativ: "Ein Opfernarrativ stellt die eigene Position überwiegend über erlittene Benachteiligung dar.",
    Rechtfertigung: "Rechtfertigung erklärt oder verteidigt Verhalten, oft zur Stabilisierung der eigenen Rolle.",
    Systemanalyse: "Systemanalyse untersucht Regeln, Machtstrukturen und wiederkehrende Dynamiken eines Umfelds.",
    Machtstruktur: "Machtstruktur beschreibt, wer Einfluss besitzt, ausübt oder verdeckt steuert.",
    Regelstruktur: "Regelstruktur umfasst formelle und informelle Regeln, die Verhalten lenken.",
    Interessenkonflikt: "Ein Interessenkonflikt entsteht, wenn Rollen, Vorteile oder Pflichten miteinander kollidieren.",
    Loyalität: "Loyalität beschreibt Bindung, Pflichtgefühl oder Parteinahme gegenüber Personen oder Gruppen.",
    "Doppelte Rolle": "Eine doppelte Rolle entsteht, wenn eine Person gleichzeitig verschiedene Interessen oder Zuständigkeiten vertritt.",
  };

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function allTerms() {
    return categories.flatMap(([category, terms]) => terms.map((term) => ({ category, term })));
  }

  function renderNav() {
    const query = searchInput.value.trim().toLowerCase();
    navRoot.innerHTML = categories
      .map(([category, terms]) => {
        const filtered = terms.filter((term) => `${category} ${term}`.toLowerCase().includes(query));
        if (!filtered.length) return "";
        return `
          <details class="library-tree-group" open>
            <summary>${escapeHtml(category)}</summary>
            <div>
              ${filtered.map((term) => `<button type="button" data-justice-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`).join("")}
            </div>
          </details>
        `;
      })
      .join("");
  }

  function renderTerm(term = "Verantwortung") {
    const category = allTerms().find((item) => item.term === term)?.category || "Justice";
    contentRoot.innerHTML = `
      <article class="justice-term-page">
        <p class="eyebrow">Justice Bibliothek / ${escapeHtml(category)}</p>
        <h1>${escapeHtml(term)}</h1>
        <p>${escapeHtml(definitions[term] || "Kurze Demo-Erklärung für diesen Justice-Begriff.")}</p>
        <section class="justice-analysis-links" aria-label="Verknüpfungen">
          <h2>Verknüpfungen</h2>
          <div>
            <article>
              <h3>Verknüpfte Begriffe</h3>
              <div class="justice-link-pills"><span>Verantwortung</span><span>Narrativ</span><span>Rollenklärung</span></div>
            </article>
            <article>
              <h3>Passende Filme</h3>
              <div class="justice-link-pills"><span>Marriage Story</span><span>Knives Out</span></div>
            </article>
            <article>
              <h3>Passende Bücher</h3>
              <div class="justice-link-pills"><span>Lead by Example</span><span>Adler-System</span></div>
            </article>
            <article>
              <h3>Passende Fälle</h3>
              <div class="justice-link-pills"><span>Arbeitsplatzkonflikt</span><span>Sorgerechtskonflikt</span></div>
            </article>
          </div>
        </section>
      </article>
    `;
  }

  navRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-justice-term]");
    if (!button) return;
    renderTerm(button.dataset.justiceTerm);
  });

  menuButton.addEventListener("click", () => {
    root.classList.toggle("is-nav-open");
    menuButton.setAttribute("aria-expanded", String(root.classList.contains("is-nav-open")));
  });

  closeButton.addEventListener("click", () => {
    root.classList.remove("is-nav-open");
    menuButton.setAttribute("aria-expanded", "false");
  });

  searchInput.addEventListener("input", renderNav);
  renderNav();
  renderTerm();
})();

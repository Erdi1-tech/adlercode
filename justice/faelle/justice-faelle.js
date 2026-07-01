(() => {
  const justiceCaseRoot = document.querySelector("[data-justice-cases]");
  if (!justiceCaseRoot) return;

  const caseListRoot = justiceCaseRoot.querySelector("[data-justice-case-list]");
  const caseDetailRoot = justiceCaseRoot.querySelector("[data-justice-case-detail]");
  const defaultCaseInfo = {
    communityRatings: "24 Bewertungen",
    comments: "12 Beiträge",
    updated: "vor 3 Tagen",
  };
  const defaultCommunityAverage = [
    ["Verantwortung", 72],
    ["Narrativkontrolle", 81],
    ["Kommunikation", 64],
    ["Rollenwechsel", 39],
    ["Eskalation", 77],
  ];
  const platformAreaLinks = [
    "🧠 Adlercode Mind",
    "💼 Adlercode Business",
    "❤️ Adlercode Relationships",
    "🏛 Adlercode Politics",
    "🏥 Adlercode Health",
    "🎓 Adlercode Academy",
  ];

  const justiceCases = [
    {
      id: "arbeitsplatzkonflikt",
      title: "Arbeitsplatzkonflikt",
      category: "Arbeit",
      status: "Demo-Analyse vollständig",
      description:
        "Ein Mitarbeiter fühlt sich übergangen, nachdem ein Kollege befördert wurde. Im Team entstehen Spannungen, unterschiedliche Narrative und gegenseitige Schuldzuweisungen.",
      situation:
        "Nach einer internen Beförderung kippt die Teamdynamik. Ein Mitarbeiter sieht seine Leistung nicht anerkannt, während der beförderte Kollege versucht, die neue Rolle zu stabilisieren.",
      narratives: [
        "Ich wurde unfair behandelt.",
        "Die Beförderung war sachlich begründet.",
        "Das Team muss sich neu sortieren.",
      ],
      roles: ["Mitarbeiter", "beförderter Kollege", "Teamleitung", "Team"],
      system:
        "Das System wird durch unklare Kriterien, fehlende Kommunikation und Statusverschiebungen geprägt.",
      moral:
        "Verantwortung liegt vor allem in Transparenz, sauberer Kommunikation und fairer Konfliktklärung.",
      community: [
        "Mehrere Nutzer erkennen ein Status- und Anerkennungsnarrativ.",
        "Andere bewerten die Führungskommunikation als zentralen Auslöser.",
      ],
      comments: [
        ["Mara", "Das wirkt wie ein Konflikt um Anerkennung, nicht nur um die Beförderung."],
        ["Jonas", "Entscheidend wäre, ob die Kriterien vorher klar waren."],
      ],
      links: {
        terms: ["Verantwortung", "Narrativkontrolle", "Rollenwechsel"],
        films: ["The Social Network", "Der Teufel trägt Prada"],
        books: ["Lead by Example", "Adler-System"],
      },
    },
    {
      id: "nachbarschaftsstreit",
      title: "Nachbarschaftsstreit",
      category: "Alltag",
      status: "Demo-Analyse",
      description:
        "Zwei Nachbarn geraten wegen Lärm, Grenzen und gegenseitigen Vorwürfen in einen dauerhaften Konflikt.",
      situation:
        "Ein wiederkehrender Lärmkonflikt eskaliert, weil beide Seiten ihre eigene Wahrnehmung als einzig berechtigte Realität ansehen.",
      narratives: ["Meine Ruhe wird missachtet.", "Ich werde kontrolliert.", "Niemand hört wirklich zu."],
      roles: ["Nachbar A", "Nachbar B", "Hausverwaltung", "Umfeld"],
      system:
        "Das System ist von fehlenden Regeln, indirekter Kommunikation und wachsendem Misstrauen geprägt.",
      moral:
        "Die zentrale Verantwortung liegt in Grenzachtung, direkter Kommunikation und verhältnismäßiger Reaktion.",
      community: [
        "Viele Bewertungen sehen ein Grenz- und Wahrnehmungsproblem.",
        "Der Konflikt wird als Beispiel für Eskalation durch indirekte Kommunikation eingeordnet.",
      ],
      comments: [
        ["Elena", "Hier fehlt eine neutrale Vermittlung, bevor beide Seiten verhärten."],
        ["David", "Interessant ist, wie schnell aus Lärm eine Identitätsfrage wird."],
      ],
      links: {
        terms: ["Filter", "Wahrnehmung", "Systemische Gewalt"],
        films: ["Der Gott des Gemetzels", "A Serious Man"],
        books: ["Setz die Brille auf! – NPC-Filter", "Masks vs. Claws"],
      },
    },
    {
      id: "erbstreit",
      title: "Erbstreit",
      category: "Familie",
      status: "Demo-Analyse",
      description:
        "Nach einem Todesfall entstehen in einer Familie Vorwürfe über Fairness, Loyalität und alte Verletzungen.",
      situation:
        "Ein Erbe wird unterschiedlich interpretiert: als rechtliche Verteilung, als moralische Anerkennung und als Symbol alter Familienrollen.",
      narratives: ["Ich wurde benachteiligt.", "Es geht um den letzten Willen.", "Alte Muster wiederholen sich."],
      roles: ["Geschwister", "Elternteil", "Partner", "Notar"],
      system:
        "Familiäre Rollen, alte Loyalitäten und formale Regeln wirken gleichzeitig auf die Situation ein.",
      moral:
        "Die moralische Frage liegt zwischen rechtlicher Ordnung, emotionaler Fairness und Verantwortung gegenüber der Familie.",
      community: [
        "Nutzer erkennen wiederkehrende Familienrollen und verdeckte Machtfragen.",
        "Die Community trennt rechtliche Ebene und emotionale Anerkennung.",
      ],
      comments: [
        ["Sofia", "Das Erbe wirkt hier wie ein Auslöser für ältere Konflikte."],
        ["Kemal", "Wichtig ist die Trennung von Recht, Moral und Beziehungsebene."],
      ],
      links: {
        terms: ["Main-ID", "Masken-ID", "Moralpyramide"],
        films: ["Knives Out", "The Descendants"],
        books: ["Force of Nature", "Adler-System"],
      },
    },
    {
      id: "mobbing-am-arbeitsplatz",
      title: "Mobbing am Arbeitsplatz",
      category: "Arbeit",
      status: "Demo-Analyse vollständig",
      description:
        "Eine Mitarbeiterin wird wiederholt ausgegrenzt, subtil abgewertet und in Besprechungen unterbrochen.",
      situation:
        "Über längere Zeit entstehen kleine, wiederkehrende Abwertungen. Einzelne Handlungen wirken isoliert harmlos, bilden gemeinsam aber ein klares Muster.",
      narratives: ["Sie ist zu empfindlich.", "Das ist nur Teamhumor.", "Das Muster wiederholt sich gezielt."],
      roles: ["Betroffene Person", "Teamkollegen", "Führungskraft", "HR"],
      system:
        "Das System toleriert verdeckte Abwertung, weil Verantwortung diffus bleibt und niemand das Muster offiziell benennt.",
      moral:
        "Verantwortung entsteht dort, wo wiederkehrende Schädigung erkannt, aber nicht begrenzt wird.",
      community: [
        "Die Beispielbewertungen ordnen den Fall als Covert-Dynamik mit Systemanteil ein.",
        "Mehrere Nutzer betonen Dokumentation und klare Eskalationswege.",
      ],
      comments: [
        ["Nina", "Das Muster ist wichtiger als die einzelne Bemerkung."],
        ["Paul", "Führung wird hier Teil des Systems, wenn sie nicht reagiert."],
      ],
      links: {
        terms: ["Covert", "Covertsystem", "Musteranalyse"],
        films: ["Whiplash", "The Assistant"],
        books: ["Masks vs. Claws", "Lead by Example"],
      },
    },
    {
      id: "sorgerechtskonflikt",
      title: "Sorgerechtskonflikt",
      category: "Familie",
      status: "Demo-Analyse",
      description:
        "Zwei Eltern streiten über Betreuung, Verantwortung und die Frage, wessen Perspektive das Kindeswohl am besten abbildet.",
      situation:
        "Nach einer Trennung werden organisatorische Fragen zunehmend moralisch aufgeladen. Beide Seiten beanspruchen, im Interesse des Kindes zu handeln.",
      narratives: ["Ich schütze das Kind.", "Der andere Elternteil manipuliert.", "Stabilität braucht klare Verantwortung."],
      roles: ["Elternteil A", "Elternteil B", "Kind", "Gericht", "Beratung"],
      system:
        "Persönliche Verletzungen, rechtliche Rahmenbedingungen und Schutzlogiken greifen ineinander.",
      moral:
        "Die moralische Mitte liegt in Kindeswohl, Verantwortungsfähigkeit und Begrenzung eigener Verletzungsnarrative.",
      community: [
        "Die Community bewertet den Fall als besonders perspektivenabhängig.",
        "Mehrere Analysen betonen die Trennung von Paar- und Elternebene.",
      ],
      comments: [
        ["Laura", "Die Analyse sollte das Kind als eigene Perspektive sichtbar machen."],
        ["Armin", "Hier braucht es sehr klare Rollentrennung."],
      ],
      links: {
        terms: ["Rollenanalyse", "Verantwortung", "Narrativ"],
        films: ["Marriage Story", "Kramer gegen Kramer"],
        books: ["Adler-System", "Setz die Brille auf! – NPC-Filter"],
      },
    },
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentCaseId() {
    return window.location.hash.replace(/^#/, "") || justiceCases[0].id;
  }

  function selectedCase() {
    return justiceCases.find((item) => item.id === currentCaseId()) || justiceCases[0];
  }

  function renderCaseList() {
    const activeId = selectedCase().id;
    caseListRoot.innerHTML = justiceCases
      .map(
        (item) => `
          <button type="button" class="justice-case-card${item.id === activeId ? " is-selected" : ""}" data-case-id="${item.id}">
            <span>${escapeHtml(item.category)}</span>
            <h2>${escapeHtml(item.title)}</h2>
            <p>${escapeHtml(item.description)}</p>
            <small>${escapeHtml(item.status)}</small>
          </button>
        `,
      )
      .join("");
  }

  function renderList(title, items) {
    return `
      <ul>
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
  }

  function renderAnalysisBlock(title, body, ratingKey) {
    return `
      <article class="justice-analysis-block">
        <h3>${escapeHtml(title)}</h3>
        ${Array.isArray(body) ? renderList(title, body) : `<p>${escapeHtml(body)}</p>`}
        <div class="justice-own-rating">
          <span>Eigene Einschätzung</span>
          <button type="button" data-justice-rating="${escapeHtml(ratingKey)}">Bewertung abgeben</button>
        </div>
      </article>
    `;
  }

  function renderLinksGroup(title, items) {
    return `
      <article>
        <h3>${escapeHtml(title)}</h3>
        <div class="justice-link-pills">
          ${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  function renderCaseDetail() {
    const item = selectedCase();
    const caseInfo = item.caseInfo || defaultCaseInfo;
    const communityAverage = item.communityAverage || defaultCommunityAverage;
    caseDetailRoot.innerHTML = `
      <article class="justice-case-analysis">
        <header class="justice-case-analysis-header">
          <a href="../" class="justice-back-link">Adlercode Justice</a>
          <span>${escapeHtml(item.category)}</span>
          <h2>${escapeHtml(item.title)}</h2>
          <dl class="justice-case-meta" aria-label="Fallinformationen">
            <div>
              <dt>Kategorie</dt>
              <dd>${escapeHtml(item.category)}</dd>
            </div>
            <div>
              <dt>Community</dt>
              <dd>${escapeHtml(caseInfo.communityRatings)}</dd>
            </div>
            <div>
              <dt>Kommentare</dt>
              <dd>${escapeHtml(caseInfo.comments)}</dd>
            </div>
            <div>
              <dt>Zuletzt aktualisiert</dt>
              <dd>${escapeHtml(caseInfo.updated)}</dd>
            </div>
          </dl>
          <p>${escapeHtml(item.description)}</p>
        </header>

        <section class="justice-community-average" aria-label="Community-Einschätzung">
          <header>
            <h3>Community-Einschätzung</h3>
            <p>Durchschnitt aller Community-Bewertungen. Es gibt keine objektiv richtige Bewertung.</p>
          </header>
          <div>
            ${communityAverage
              .map(
                ([label, value]) => `
                  <article class="justice-average-row">
                    <div>
                      <span>${escapeHtml(label)}</span>
                      <strong>${Number(value)} %</strong>
                    </div>
                    <div class="justice-average-bar" aria-hidden="true"><span style="width: ${Number(value)}%"></span></div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="justice-analysis-grid" aria-label="Analyseaufbau">
          ${renderAnalysisBlock("1. Situation", item.situation, "situation")}
          ${renderAnalysisBlock("2. Narrativanalyse", item.narratives, "narrative")}
          ${renderAnalysisBlock("3. Beteiligte / Rollen", item.roles, "roles")}
          ${renderAnalysisBlock("4. Systemanalyse", item.system, "system")}
          ${renderAnalysisBlock("5. Moralanalyse", item.moral, "moral")}
          ${renderAnalysisBlock("6. Community", item.community, "community")}
        </section>

        <section class="justice-comments" aria-label="Kommentare">
          <h3>7. Kommentare</h3>
          <div>
            ${item.comments
              .map(
                ([name, text]) => `
                  <blockquote>
                    <p>${escapeHtml(text)}</p>
                    <footer>${escapeHtml(name)}</footer>
                  </blockquote>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="justice-analysis-links" aria-label="Verknüpfungen">
          <h2>Verknüpfungen</h2>
          <div>
            ${renderLinksGroup("Passende Begriffe", item.links.terms)}
            ${renderLinksGroup("Passende Filme", item.links.films)}
            ${renderLinksGroup("Passende Bücher", item.links.books)}
            ${renderLinksGroup("Passende Adlercode-Bereiche", platformAreaLinks)}
          </div>
        </section>
      </article>
    `;
  }

  function render() {
    renderCaseList();
    renderCaseDetail();
  }

  caseListRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-case-id]");
    if (!button) return;
    window.location.hash = button.dataset.caseId;
    render();
  });

  caseDetailRoot.addEventListener("click", (event) => {
    const ratingButton = event.target.closest("[data-justice-rating]");
    if (!ratingButton) return;
    ratingButton.textContent = "Bewertung vorgemerkt";
    ratingButton.disabled = true;
    ratingButton.closest(".justice-own-rating")?.classList.add("is-selected");
  });

  window.addEventListener("hashchange", render);
  render();
})();

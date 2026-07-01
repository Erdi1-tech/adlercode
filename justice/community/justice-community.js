(() => {
  const root = document.querySelector("[data-justice-community]");
  if (!root) return;

  const searchInput = root.querySelector("[data-justice-community-search]");
  const feedRoot = root.querySelector("[data-justice-community-feed]");
  const tabButtons = [...root.querySelectorAll("[data-justice-community-tab]")];
  let activeTab = "latest";

  const items = [
    {
      title: "Arbeitsplatzkonflikt",
      category: "Arbeit",
      type: "latest",
      score: "24 Bewertungen",
      comments: "12 Beiträge",
      excerpt: "Status, Anerkennung und unklare Führungsentscheidung prägen die Analyse.",
    },
    {
      title: "Mobbing am Arbeitsplatz",
      category: "Arbeit",
      type: "popular",
      score: "41 Bewertungen",
      comments: "28 Beiträge",
      excerpt: "Viele Nutzer erkennen verdeckte Abwertung, diffuse Verantwortung und ein tolerierendes System.",
    },
    {
      title: "Sorgerechtskonflikt",
      category: "Familie",
      type: "discussed",
      score: "35 Bewertungen",
      comments: "36 Beiträge",
      excerpt: "Die Community diskutiert Rollentrennung, Verantwortung und Kindeswohl.",
    },
    {
      title: "Nachbarschaftsstreit",
      category: "Alltag",
      type: "comments",
      score: "18 Bewertungen",
      comments: "9 Beiträge",
      excerpt: "Neuer Kommentar: Grenzen und direkte Kommunikation wirken als Schlüsselfaktoren.",
    },
  ];

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function render() {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = items.filter((item) => {
      const tabMatch = activeTab === "latest" ? true : item.type === activeTab;
      const textMatch = `${item.title} ${item.category} ${item.excerpt}`.toLowerCase().includes(term);
      return tabMatch && textMatch;
    });
    feedRoot.innerHTML = filtered.length
      ? filtered
          .map(
            (item) => `
              <article class="justice-community-card">
                <span>${escapeHtml(item.category)}</span>
                <h2>${escapeHtml(item.title)}</h2>
                <p>${escapeHtml(item.excerpt)}</p>
                <dl>
                  <div><dt>Community</dt><dd>${escapeHtml(item.score)}</dd></div>
                  <div><dt>Kommentare</dt><dd>${escapeHtml(item.comments)}</dd></div>
                </dl>
              </article>
            `,
          )
          .join("")
      : `<div class="analysis-empty"><p>Keine Demo-Einträge gefunden.</p></div>`;
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.justiceCommunityTab;
      tabButtons.forEach((item) => item.classList.toggle("is-selected", item === button));
      render();
    });
  });

  searchInput.addEventListener("input", render);
  render();
})();

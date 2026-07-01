(() => {
  const root = document.querySelector("[data-community-page]");
  if (!root) return;

  const storageKey = "adlercode-film-ratings-v1";
  const interactionStorageKey = "adlercode-public-analysis-interactions-v1";
  const contentRoot = root.querySelector("[data-community-content]");
  const tabButtons = [...root.querySelectorAll("[data-community-tab]")];
  let activeTab = new URLSearchParams(window.location.search).get("tab") || "latest";
  if (!["latest", "films", "characters"].includes(activeTab)) activeTab = "latest";

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  }

  function loadInteractionStore() {
    try {
      return JSON.parse(localStorage.getItem(interactionStorageKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveInteractionStore(store) {
    localStorage.setItem(interactionStorageKey, JSON.stringify(store));
  }

  function interactionFor(key) {
    const store = loadInteractionStore();
    const entry = store[key] || {};
    return {
      helpfulBy: Array.isArray(entry.helpfulBy) ? entry.helpfulBy : [],
      comments: Array.isArray(entry.comments) ? entry.comments : [],
    };
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function isPublicAnalysis(item) {
    return item?.visibility === "public" || item?.["film-narrative"]?.visibility === "public" || item?.moral?.visibility === "public" || item?.["film-system"]?.visibility === "public";
  }

  function latestDate(item) {
    return [item?.savedAt, item?.moral?.savedAt, item?.["film-narrative"]?.savedAt, item?.["film-system"]?.savedAt]
      .filter(Boolean)
      .sort()
      .at(-1) || "";
  }

  function formatDate(value) {
    if (!value) return "Nicht gespeichert";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Nicht gespeichert";
    return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
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

  function filmUrl(meta) {
    if (!meta?.id) return "../filmanalyse/";
    return `../filmanalyse/?${new URLSearchParams({ film: meta.id }).toString()}`;
  }

  function characterUrl(meta) {
    if (!meta?.id || !meta?.characterId) return filmUrl(meta);
    return `../filmanalyse/?${new URLSearchParams({ film: meta.id, character: meta.characterId }).toString()}`;
  }

  function publicAnalysisDomId(key) {
    return `analyse-${String(key || "").replace(/[^a-zA-Z0-9_-]+/g, "-")}`;
  }

  function publicAnalyses() {
    return Object.entries(loadStore())
      .map(([key, item]) => ({ key, item, type: key.startsWith("character:") ? "character" : "film" }))
      .filter(({ key }) => key.startsWith("film:") || key.startsWith("character:"))
      .filter(({ item }) => isPublicAnalysis(item))
      .filter(({ item, type }) => (type === "character" ? item?.values : item?.["film-narrative"] || item?.moral || item?.["film-system"]))
      .sort((a, b) => latestDate(b.item).localeCompare(latestDate(a.item)));
  }

  function emptyState() {
    return `
      <div class="analysis-empty community-empty">
        <h2>Noch keine öffentlichen Analysen vorhanden.</h2>
        <a href="../filmanalyse/">Zur Filmanalyse</a>
      </div>
    `;
  }

  function renderFilmAnalysis({ key, item }) {
    const meta = item.meta || {};
    const reasons = [item?.["film-narrative"]?.reason, item?.["film-system"]?.reason].filter(Boolean);
    const interaction = interactionFor(key);
    const currentUser = window.AdlercodeAuth?.currentUser?.();
    const helpfulActive = currentUser?.id && interaction.helpfulBy.includes(currentUser.id);
    const canMessage = item.author?.id && item.author.id !== currentUser?.id;
    return `
      <article class="community-analysis-card" id="${escapeHtml(publicAnalysisDomId(key))}" data-public-analysis-key="${escapeHtml(key)}">
        <div class="community-analysis-media" aria-hidden="true">${meta.posterUrl ? `<img src="${escapeHtml(meta.posterUrl)}" alt="" loading="lazy" />` : ""}</div>
        <div class="community-analysis-body">
          <header>
            <span>Filmanalyse</span>
            <time>${escapeHtml(formatDate(latestDate(item)))}</time>
          </header>
          <h2>${escapeHtml(meta.title || "Unbekannter Film")}</h2>
          <p>${escapeHtml(item.author?.username || "Adlercode Nutzer")}</p>
          <dl>
            <div><dt>Dominantes Narrativ</dt><dd>${escapeHtml(dominantLabel(item["film-narrative"]?.values) || "Nicht gespeichert")}</dd></div>
            <div><dt>Moralebene</dt><dd>${escapeHtml(moralLabel(item.moral?.level))}</dd></div>
            <div><dt>Dominantes System</dt><dd>${escapeHtml(dominantLabel(item["film-system"]?.values) || "Nicht gespeichert")}</dd></div>
          </dl>
          ${reasons.length ? `<blockquote>${reasons.map(escapeHtml).join("<br />")}</blockquote>` : ""}
          <div class="community-action-row">
            <a href="${escapeHtml(filmUrl(meta))}">Auf Filmseite ansehen</a>
            ${canMessage ? `
              <button
                type="button"
                data-message-author-id="${escapeHtml(item.author.id)}"
                data-message-author-name="${escapeHtml(item.author.username || "Adlercode Nutzer")}"
                data-message-author-avatar="${escapeHtml(item.author.avatarInitial || "")}"
                data-message-analysis-key="${escapeHtml(key)}"
                data-message-film="${escapeHtml(meta.title || "")}"
                data-message-scope="film"
              >Mit Autor sprechen</button>
            ` : ""}
          </div>
          ${renderPublicInteraction(key, interaction, helpfulActive)}
        </div>
      </article>
    `;
  }

  function renderCharacterAnalysis({ key, item }) {
    const meta = item.meta || {};
    const interaction = interactionFor(key);
    const currentUser = window.AdlercodeAuth?.currentUser?.();
    const helpfulActive = currentUser?.id && interaction.helpfulBy.includes(currentUser.id);
    const canMessage = item.author?.id && item.author.id !== currentUser?.id;
    return `
      <article class="community-analysis-card" id="${escapeHtml(publicAnalysisDomId(key))}" data-public-analysis-key="${escapeHtml(key)}">
        <div class="community-analysis-media is-character" aria-hidden="true">${meta.imageUrl ? `<img src="${escapeHtml(meta.imageUrl)}" alt="" loading="lazy" />` : ""}</div>
        <div class="community-analysis-body">
          <header>
            <span>Charakteranalyse</span>
            <time>${escapeHtml(formatDate(item.savedAt || latestDate(item)))}</time>
          </header>
          <h2>${escapeHtml(meta.characterName || "Unbekannte Rolle")}</h2>
          <p>${escapeHtml(item.author?.username || "Adlercode Nutzer")} · ${escapeHtml(meta.title || "Unbekannter Film")}</p>
          <dl>
            <div><dt>Schauspieler</dt><dd>${escapeHtml(meta.actorName || "Unbekannt")}</dd></div>
            <div><dt>Dominantes Profil</dt><dd>${escapeHtml(profileLabel(dominantLabel(item.values)))}</dd></div>
          </dl>
          ${item.reason ? `<blockquote>${escapeHtml(item.reason)}</blockquote>` : ""}
          <div class="community-action-row">
            <a href="${escapeHtml(characterUrl(meta))}">Auf Charakterseite ansehen</a>
            ${canMessage ? `
              <button
                type="button"
                data-message-author-id="${escapeHtml(item.author.id)}"
                data-message-author-name="${escapeHtml(item.author.username || "Adlercode Nutzer")}"
                data-message-author-avatar="${escapeHtml(item.author.avatarInitial || "")}"
                data-message-analysis-key="${escapeHtml(key)}"
                data-message-film="${escapeHtml(meta.title || "")}"
                data-message-character="${escapeHtml(meta.characterName || "")}"
                data-message-scope="character"
              >Mit Autor sprechen</button>
            ` : ""}
          </div>
          ${renderPublicInteraction(key, interaction, helpfulActive)}
        </div>
      </article>
    `;
  }

  function renderPublicInteraction(key, interaction, helpfulActive = false) {
    return `
      <section class="public-analysis-interaction" aria-label="Interaktion zur öffentlichen Analyse">
        <div class="public-helpful-row">
          <button type="button" class="${helpfulActive ? "is-active" : ""}" data-helpful-analysis="${escapeHtml(key)}">Hilfreich</button>
          <span>${interaction.helpfulBy.length} fanden diese Analyse hilfreich</span>
        </div>
        <div class="public-comments">
          ${interaction.comments.length
            ? interaction.comments.map((comment) => renderPublicComment(comment, key)).join("")
            : `<p class="public-comments-empty">Noch keine Kommentare.</p>`}
        </div>
        <form class="public-comment-form" data-comment-form="${escapeHtml(key)}">
          <input type="text" name="comment" placeholder="Kommentar schreiben ..." />
          <button type="submit">Kommentieren</button>
        </form>
      </section>
    `;
  }

  function renderPublicComment(comment, key) {
    const currentUserId = window.AdlercodeAuth?.currentUser?.()?.id || "";
    return `
      <article class="public-comment">
        <header>
          <strong>${escapeHtml(comment.username || "Adlercode Nutzer")}</strong>
          <span>${escapeHtml(formatDate(comment.createdAt))}</span>
        </header>
        <p>${escapeHtml(comment.text || "")}</p>
        ${comment.userId === currentUserId ? `<button type="button" data-delete-comment="${escapeHtml(comment.id)}" data-comment-analysis="${escapeHtml(key)}">Löschen</button>` : ""}
      </article>
    `;
  }

  function render() {
    const analyses = publicAnalyses();
    const visible = analyses.filter((analysis) => {
      if (activeTab === "films") return analysis.type === "film";
      if (activeTab === "characters") return analysis.type === "character";
      return true;
    });

    tabButtons.forEach((button) => button.classList.toggle("is-selected", button.dataset.communityTab === activeTab));
    contentRoot.innerHTML = visible.length
      ? `<div class="community-analysis-list">${visible.map((analysis) => (analysis.type === "character" ? renderCharacterAnalysis(analysis) : renderFilmAnalysis(analysis))).join("")}</div>`
      : emptyState();
  }

  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-community-tab]");
    if (tab) {
      activeTab = tab.dataset.communityTab || "latest";
      render();
      return;
    }

    const helpfulButton = event.target.closest("[data-helpful-analysis]");
    if (helpfulButton) {
      if (window.AdlercodeAuth && !window.AdlercodeAuth.requireAuth("Bitte melde dich an oder registriere dich, um eine Analyse als hilfreich zu markieren.")) return;
      const user = window.AdlercodeAuth?.currentUser?.();
      const key = helpfulButton.dataset.helpfulAnalysis || "";
      if (!user || !key) return;
      const store = loadInteractionStore();
      const entry = store[key] || { helpfulBy: [], comments: [] };
      const helpfulBy = new Set(Array.isArray(entry.helpfulBy) ? entry.helpfulBy : []);
      if (helpfulBy.has(user.id)) helpfulBy.delete(user.id);
      else helpfulBy.add(user.id);
      store[key] = { ...entry, helpfulBy: [...helpfulBy], comments: Array.isArray(entry.comments) ? entry.comments : [] };
      saveInteractionStore(store);
      render();
      return;
    }

    const deleteCommentButton = event.target.closest("[data-delete-comment]");
    if (deleteCommentButton) {
      const user = window.AdlercodeAuth?.currentUser?.();
      const key = deleteCommentButton.dataset.commentAnalysis || "";
      const commentId = deleteCommentButton.dataset.deleteComment || "";
      if (!user || !key || !commentId) return;
      const store = loadInteractionStore();
      const entry = store[key] || { helpfulBy: [], comments: [] };
      store[key] = {
        ...entry,
        helpfulBy: Array.isArray(entry.helpfulBy) ? entry.helpfulBy : [],
        comments: (entry.comments || []).filter((comment) => comment.id !== commentId || comment.userId !== user.id),
      };
      saveInteractionStore(store);
      render();
      return;
    }

    const messageButton = event.target.closest("[data-message-author-id]");
    if (messageButton) {
      window.AdlercodeChat?.startChat?.(
        {
          id: messageButton.dataset.messageAuthorId,
          username: messageButton.dataset.messageAuthorName,
          avatarInitial: messageButton.dataset.messageAuthorAvatar,
        },
        {
          type: messageButton.dataset.messageScope === "character" ? "character-analysis" : "film-analysis",
          analysisKey: messageButton.dataset.messageAnalysisKey,
          filmTitle: messageButton.dataset.messageFilm,
          characterName: messageButton.dataset.messageCharacter,
        }
      );
    }
  });

  root.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-comment-form]");
    if (!form) return;
    event.preventDefault();
    if (window.AdlercodeAuth && !window.AdlercodeAuth.requireAuth("Bitte melde dich an oder registriere dich, um zu kommentieren.")) return;
    const user = window.AdlercodeAuth?.currentUser?.();
    const key = form.dataset.commentForm || "";
    const input = form.elements.comment;
    const text = String(input?.value || "").trim();
    if (!user || !key || !text) return;
    const store = loadInteractionStore();
    const entry = store[key] || { helpfulBy: [], comments: [] };
    store[key] = {
      ...entry,
      helpfulBy: Array.isArray(entry.helpfulBy) ? entry.helpfulBy : [],
      comments: [
        ...(Array.isArray(entry.comments) ? entry.comments : []),
        {
          id: `comment-${Date.now()}`,
          userId: user.id,
          username: user.username || user.name || "Adlercode Nutzer",
          text,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    saveInteractionStore(store);
    form.reset();
    render();
  });

  render();
})();

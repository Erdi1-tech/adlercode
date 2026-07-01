(() => {
  const root = document.querySelector("[data-film-analysis]");

  if (!root) return;

  const tmdbConfig = window.ADLERCODE_TMDB_CONFIG || {};
  const tmdbToken = tmdbConfig.readAccessToken || "";
  const tmdbBaseUrl = "https://api.themoviedb.org/3";
  const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w342";
  const tmdbProfileBaseUrl = "https://image.tmdb.org/t/p/w185";
  const ratingStorageKey = "adlercode-film-ratings-v1";
  const interactionStorageKey = "adlercode-public-analysis-interactions-v1";
  let ratingStore = loadRatingStore();
  let editingFilmRating = false;
  let editingCharacterRating = false;
  let editingRatingTypes = new Set();
  let saveFeedback = null;
  let saveFeedbackTimer = null;
  let publishFeedback = null;
  const sharedTerms = window.ADLERCODE_TERMS || null;
  const infoTerms = {};
  const infoLabels = [
    "Narrativanalyse",
    "Moralanalyse",
    "Systemanalyse",
    "NPC-Programmanalyse",
    "Adlersystem",
    "Schlangensystem",
    "Psychopath-System",
    "Covertsystem",
    "Adler-Perspektive",
    "Empathen-Perspektive",
    "Narzissten-Perspektive",
    "Psychopathen-Perspektive",
    "Covert-Perspektive",
    "Empath",
    "Narzisst",
    "Psychopath",
    "Covert",
  ];

  infoLabels.forEach((label) => {
    const term = sharedTerms?.get(label);
    if (!term) return;
    infoTerms[sharedTerms.slug(label)] = {
      key: sharedTerms.slug(label),
      title: label,
      shortDefinition: term.definition,
      href: sharedTerms.libraryHref(label),
    };
  });

  const infoKeyByLabel = {
    "Narrativanalyse": "narrativanalyse",
    "Moralanalyse": "moralanalyse",
    "Systemanalyse": "systemanalyse",
    "NPC-Programmanalyse": "npc-programmanalyse",
    "Adlersystem": "adlersystem",
    "Schlangensystem": "schlangensystem",
    "Psychopath-System": "psychopath-system",
    "Covertsystem": "covertsystem",
    "Adler-Perspektive": "adler-perspektive",
    "Empathen-Perspektive": "empathen-perspektive",
    "Narzissten-Perspektive": "narzissten-perspektive",
    "Psychopathen-Perspektive": "psychopathen-perspektive",
    "Covert-Perspektive": "covert-perspektive",
    "Empath": "empath",
    "Narzisst": "narzisst",
    "Psychopath": "psychopath",
    "Covert": "covert",
  };
  const fallbackFilms = [
    {
      id: "system-pressure",
      source: "local",
      title: "System Pressure",
      year: "2026",
      genres: ["Drama"],
      description: "Platzhalterfilm über Druck, Macht und öffentliche Narrative.",
      posterUrl: "",
      characters: [
        character("pressure-leader", "Der Entscheider", "Platzhalter", "Machtrolle"),
        character("pressure-observer", "Die Beobachterin", "Platzhalter", "Gegenstimme"),
        character("pressure-follower", "Der Mitläufer", "Platzhalter", "Anpassungsrolle"),
      ],
    },
    {
      id: "glass-contract",
      source: "local",
      title: "Glass Contract",
      year: "2025",
      genres: ["Drama"],
      description: "Platzhalterfilm über Regeln, Schlupflöcher und Verantwortung.",
      posterUrl: "",
      characters: [
        character("glass-lawyer", "Die Verteidigerin", "Platzhalter", "Kontrollrolle"),
        character("glass-client", "Der Kläger", "Platzhalter", "Opferrolle"),
      ],
    },
    {
      id: "quiet-bond",
      source: "local",
      title: "Quiet Bond",
      year: "2023",
      genres: ["Drama"],
      description: "Platzhalterfilm über Nähe, Projektion und emotionale Muster.",
      posterUrl: "",
      characters: [
        character("bond-close", "Die Bindung", "Platzhalter", "Retterrolle"),
        character("bond-distance", "Der Rückzug", "Platzhalter", "Fluchtrolle"),
      ],
    },
    {
      id: "civic-shadow",
      source: "local",
      title: "Civic Shadow",
      year: "2024",
      genres: ["Politik"],
      description: "Platzhalterfilm über Öffentlichkeit, Einfluss und verdeckte Dynamiken.",
      posterUrl: "",
      characters: [
        character("civic-speaker", "Die Sprecherin", "Platzhalter", "Narrativrolle"),
        character("civic-strategist", "Der Stratege", "Platzhalter", "Einflussrolle"),
      ],
    },
    {
      id: "market-signal",
      source: "local",
      title: "Market Signal",
      year: "2022",
      genres: ["Business"],
      description: "Platzhalterfilm über Anreize, Status und Entscheidungen unter Druck.",
      posterUrl: "",
      characters: [
        character("market-founder", "Der Gründer", "Platzhalter", "Macherrolle"),
        character("market-investor", "Die Investorin", "Platzhalter", "Kontrollrolle"),
      ],
    },
    {
      id: "borderline-room",
      source: "local",
      title: "Borderline Room",
      year: "2021",
      genres: ["Psychologie"],
      description: "Platzhalterfilm über emotionale Eskalation, Grenzen und Nähe.",
      posterUrl: "",
      characters: [
        character("room-anchor", "Der Anker", "Platzhalter", "Stabilisierungsrolle"),
        character("room-mirror", "Der Spiegel", "Platzhalter", "Projektionsrolle"),
      ],
    },
    {
      id: "public-mask",
      source: "local",
      title: "Public Mask",
      year: "2020",
      genres: ["Gesellschaft"],
      description: "Platzhalterfilm über Selbstdarstellung, Rollenbilder und Gruppendruck.",
      posterUrl: "",
      characters: [
        character("mask-star", "Die Fassade", "Platzhalter", "Statusrolle"),
        character("mask-witness", "Der Zeuge", "Platzhalter", "Beobachterrolle"),
      ],
    },
    {
      id: "silent-order",
      source: "local",
      title: "Silent Order",
      year: "2019",
      genres: ["Drama"],
      description: "Platzhalterfilm über Gehorsam, Hierarchie und stille Regeln.",
      posterUrl: "",
      characters: [
        character("order-chief", "Der Vorgesetzte", "Platzhalter", "Autoritätsrolle"),
        character("order-dissenter", "Die Abweichlerin", "Platzhalter", "Gegenrolle"),
      ],
    },
    {
      id: "mirror-law",
      source: "local",
      title: "Mirror Law",
      year: "2018",
      genres: ["Recht"],
      description: "Platzhalterfilm über Schuld, Verantwortung und Auslegung.",
      posterUrl: "",
      characters: [
        character("mirror-judge", "Die Richterin", "Platzhalter", "Ordnungsrolle"),
        character("mirror-accused", "Der Angeklagte", "Platzhalter", "Konfliktrolle"),
      ],
    },
    {
      id: "signal-family",
      source: "local",
      title: "Signal Family",
      year: "2017",
      genres: ["Beziehungen"],
      description: "Platzhalterfilm über Bindung, Loyalität und unausgesprochene Verträge.",
      posterUrl: "",
      characters: [
        character("signal-parent", "Der Elternteil", "Platzhalter", "Bindungsrolle"),
        character("signal-child", "Das Kind", "Platzhalter", "Entwicklungsrolle"),
      ],
    },
    {
      id: "cold-method",
      source: "local",
      title: "Cold Method",
      year: "2016",
      genres: ["Thriller"],
      description: "Platzhalterfilm über Kalkül, Distanz und instrumentelles Handeln.",
      posterUrl: "",
      characters: [
        character("method-operator", "Der Operator", "Platzhalter", "Kälterolle"),
        character("method-target", "Das Ziel", "Platzhalter", "Betroffenenrolle"),
      ],
    },
    {
      id: "golden-frame",
      source: "local",
      title: "Golden Frame",
      year: "2015",
      genres: ["Drama"],
      description: "Platzhalterfilm über Ideale, Versuchung und moralische Rahmung.",
      posterUrl: "",
      characters: [
        character("frame-ideal", "Das Ideal", "Platzhalter", "Wertefigur"),
        character("frame-tempter", "Die Versuchung", "Platzhalter", "Gegenkraft"),
      ],
    },
  ];

  const searchInput = root.querySelector("[data-film-search]");
  const listRoot = root.querySelector("[data-film-list]");
  const detailRoot = root.querySelector("[data-film-detail]");
  let activeFilmId = "";
  let activeCharacterId = "";
  let activeView = "film";
  let activeTab = "analysis";
  let isAnalysisMode = false;
  let films = fallbackFilms.map(enrichFilm);
  let isLoading = false;
  let isSearchMode = false;
  let statusMessage = tmdbToken
    ? "TMDB ist lokal verbunden. Suche nach einem Film, um echte Filmdaten zu laden."
    : "Lokale Platzhalterdaten aktiv. Für TMDB wird eine lokale Config benötigt.";

  function character(id, characterName, actorName, role, imageUrl = "") {
    return {
      id,
      characterName,
      actorName,
      role,
      imageUrl,
      behavior: "Verhaltensmuster wird in der Adlercode-Analyse ergänzt.",
      personality: "Persönlichkeitsmuster wird vorbereitet.",
      relationships: "Beziehungen zu anderen Figuren werden später strukturiert ausgewertet.",
      development: "Entwicklung im Film wird anhand zentraler Szenen beschrieben.",
      adlercode: "Adlercode-Einordnung wird vorbereitet.",
    };
  }

  function enrichFilm(film) {
    return {
      ...film,
      characters: (film.characters || []).map((item) => ({ ...character(item.id, item.characterName, item.actorName, item.role, item.imageUrl), ...item })),
    };
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function loadRatingStore() {
    try {
      return JSON.parse(localStorage.getItem(ratingStorageKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveRatingStore() {
    try {
      localStorage.setItem(ratingStorageKey, JSON.stringify(ratingStore));
    } catch {
      // Lokale Speicherung ist optional; die Ergebnisansicht bleibt im aktuellen Renderzustand nutzbar.
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

  function filmRatingKey(film = activeFilm()) {
    const userId = window.AdlercodeAuth?.currentUser?.()?.id || "guest";
    return film ? `film:${userId}:${film.source || "local"}:${film.id}` : "";
  }

  function characterRatingKey(film = activeFilm(), characterItem = activeCharacter()) {
    const userId = window.AdlercodeAuth?.currentUser?.()?.id || "guest";
    return film && characterItem ? `character:${userId}:${film.source || "local"}:${film.id}:${characterItem.id}` : "";
  }

  function filmRatings(film = activeFilm()) {
    return ratingStore[filmRatingKey(film)] || {};
  }

  function characterRating(film = activeFilm(), characterItem = activeCharacter()) {
    return ratingStore[characterRatingKey(film, characterItem)] || null;
  }

  function collectDistribution(form) {
    const values = {};
    form.querySelectorAll("[data-rating-slider]").forEach((slider) => {
      values[slider.dataset.ratingSlider] = Number(slider.value || 0);
    });
    return values;
  }

  function clampDistributionSlider(changedSlider) {
    if (!changedSlider) return;
    const form = changedSlider.closest("[data-rating-type]");
    if (!form) return;
    const sliders = [...form.querySelectorAll("[data-rating-slider]")];
    const otherTotal = sliders
      .filter((slider) => slider !== changedSlider)
      .reduce((sum, slider) => sum + Number(slider.value || 0), 0);
    const maxAllowed = Math.max(0, 100 - otherTotal);
    const currentValue = Number(changedSlider.value || 0);
    if (currentValue > maxAllowed) {
      changedSlider.value = String(maxAllowed);
    }
  }

  function collectReason(form) {
    return form.querySelector("textarea")?.value.trim() || "";
  }

  function collectVisibility(form) {
    return form.querySelector("[data-rating-visibility]:checked")?.value === "public" ? "public" : "private";
  }

  function stableJson(value) {
    return JSON.stringify(value || {});
  }

  function savedDistributionSnapshot(savedRating) {
    if (!savedRating) return "";
    return stableJson({
      values: savedRating.values || {},
      reason: savedRating.reason || "",
      visibility: savedRating.visibility === "public" ? "public" : "private",
    });
  }

  function currentDistributionSnapshot(form) {
    return stableJson({
      values: collectDistribution(form),
      reason: collectReason(form),
      visibility: collectVisibility(form),
    });
  }

  function savedMoralSnapshot(savedMoral) {
    if (!savedMoral) return "";
    return stableJson({
      level: savedMoral.level || "",
      visibility: savedMoral.visibility === "public" ? "public" : "private",
    });
  }

  function currentMoralSnapshot(form) {
    return stableJson({
      level: form.querySelector("[data-moral-level]:checked")?.value || "",
      visibility: collectVisibility(form),
    });
  }

  function formHasSavedState(form, currentSnapshot) {
    return Boolean(form.dataset.savedSnapshot && form.dataset.savedSnapshot === currentSnapshot);
  }

  function setSaveButtonState(button, { canSave, isSaved, dirty, editing }) {
    if (!button) return;
    button.disabled = !canSave || isSaved;
    button.classList.toggle("is-saved", isSaved);
    button.innerHTML = isSaved
      ? '<span aria-hidden="true">✓</span> Gespeichert'
      : dirty || editing
        ? "Änderungen speichern"
        : "Bewertung speichern";
  }

  function renderSaveFeedback(type) {
    if (saveFeedback?.type !== type) return "";
    return '<p class="film-rating-feedback" role="status">✅ Bewertung erfolgreich gespeichert.</p>';
  }

  function clearSaveFeedback(form) {
    if (!saveFeedback) return;
    const type = form?.dataset.ratingType || (form?.hasAttribute("data-moral-analysis") ? "moral" : "");
    if (saveFeedback.type !== type) return;
    if (saveFeedbackTimer) {
      clearTimeout(saveFeedbackTimer);
      saveFeedbackTimer = null;
    }
    saveFeedback = null;
    detailRoot?.querySelectorAll(".film-rating-feedback").forEach((feedback) => feedback.remove());
  }

  function showTemporarySaveFeedback(type) {
    if (saveFeedbackTimer) {
      clearTimeout(saveFeedbackTimer);
      saveFeedbackTimer = null;
    }
    saveFeedback = { type };
    saveFeedbackTimer = window.setTimeout(() => {
      if (saveFeedback?.type === type) saveFeedback = null;
      detailRoot?.querySelectorAll(".film-rating-feedback").forEach((feedback) => feedback.remove());
      saveFeedbackTimer = null;
    }, 2500);
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
    }[label] || label;
  }

  function moralLabel(value) {
    return {
      empath: "Empath",
      narzisst: "Narzisst",
      psychopath: "Psychopath",
      covert: "Covert",
    }[value] || value;
  }

  function formatDate(value) {
    if (!value) return "Nicht gespeichert";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Nicht gespeichert";
    return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function latestRatingDate(item) {
    return [item?.savedAt, item?.moral?.savedAt, item?.["film-narrative"]?.savedAt, item?.["film-system"]?.savedAt]
      .filter(Boolean)
      .sort()
      .at(-1) || "";
  }

  function renderDistributionList(values) {
    return `<ul>${Object.entries(values || {}).map(([label, value]) => `<li><span>${sharedTerms?.renderLink(label) || escapeHtml(label)}</span><strong>${Number(value)} %</strong></li>`).join("")}</ul>`;
  }

  function filmMeta(film = activeFilm()) {
    return film
      ? {
        id: film.id,
        source: film.source || "local",
        title: film.title,
        year: film.year,
        posterUrl: film.posterUrl || "",
      }
      : null;
  }

  function characterMeta(film = activeFilm(), characterItem = activeCharacter()) {
    return film && characterItem
      ? {
        ...filmMeta(film),
        characterId: characterItem.id,
        characterName: characterItem.characterName,
        actorName: characterItem.actorName,
        role: characterItem.role,
        imageUrl: characterItem.imageUrl || "",
      }
      : null;
  }

  function currentAuthor(user = window.AdlercodeAuth?.currentUser?.()) {
    return user
      ? {
        id: user.id,
        username: user.username || user.name || "Adlercode Nutzer",
        avatarInitial: user.avatarInitial || "A",
      }
      : null;
  }

  function isPublicAnalysis(item) {
    return item?.visibility === "public" || item?.["film-narrative"]?.visibility === "public" || item?.moral?.visibility === "public" || item?.["film-system"]?.visibility === "public";
  }

  function publicAnalysisDomId(key) {
    return `analyse-${String(key || "").replace(/[^a-zA-Z0-9_-]+/g, "-")}`;
  }

  function currentPublicAnalysisTarget(scope = activeView === "character" ? "character" : "film") {
    const key = scope === "character" ? characterRatingKey() : filmRatingKey();
    const item = key ? ratingStore[key] : null;
    return {
      key,
      item,
      hasSavedAnalysis: scope === "character"
        ? Boolean(item?.values)
        : Boolean(item?.["film-narrative"] || item?.moral || item?.["film-system"]),
      isPublished: Boolean(item && isPublicAnalysis(item)),
    };
  }

  function publicAnalysisPageUrl(scope, key) {
    const film = activeFilm();
    const characterItem = activeCharacter();
    if (!film) return "#";
    const params = new URLSearchParams({ film: film.id });
    if (scope === "character" && characterItem?.id) params.set("character", characterItem.id);
    return `?${params.toString()}#${publicAnalysisDomId(key)}`;
  }

  function publicCommunityUrl(key) {
    return `../community/?analysis=${encodeURIComponent(key)}#${publicAnalysisDomId(key)}`;
  }

  function publishCurrentAnalysis(scope = activeView === "character" ? "character" : "film") {
    const target = currentPublicAnalysisTarget(scope);
    if (!target.key || !target.item || !target.hasSavedAnalysis) return null;

    if (scope === "character") {
      ratingStore[target.key] = {
        ...target.item,
        visibility: "public",
        savedAt: target.item.savedAt || new Date().toISOString(),
      };
    } else {
      ratingStore[target.key] = {
        ...target.item,
        visibility: "public",
        "film-narrative": target.item["film-narrative"]
          ? { ...target.item["film-narrative"], visibility: "public" }
          : target.item["film-narrative"],
        moral: target.item.moral ? { ...target.item.moral, visibility: "public" } : target.item.moral,
        "film-system": target.item["film-system"]
          ? { ...target.item["film-system"], visibility: "public" }
          : target.item["film-system"],
      };
    }

    saveRatingStore();
    publishFeedback = { key: target.key, scope };
    return target.key;
  }

  function publicAnalysesForFilm(film = activeFilm()) {
    if (!film) return [];
    return Object.entries(ratingStore)
      .filter(([key, item]) => key.startsWith("film:") && isPublicAnalysis(item) && item?.meta?.id === film.id && item?.meta?.source === (film.source || "local"))
      .map(([key, item]) => ({ key, item }))
      .sort((a, b) => latestRatingDate(b.item).localeCompare(latestRatingDate(a.item)));
  }

  function publicAnalysesForCharacter(film = activeFilm(), characterItem = activeCharacter()) {
    if (!film || !characterItem) return [];
    return Object.entries(ratingStore)
      .filter(([key, item]) => key.startsWith("character:") && isPublicAnalysis(item) && item?.meta?.id === film.id && item?.meta?.source === (film.source || "local") && item?.meta?.characterId === characterItem.id)
      .map(([key, item]) => ({ key, item }))
      .sort((a, b) => latestRatingDate(b.item).localeCompare(latestRatingDate(a.item)));
  }

  function openFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const filmId = params.get("film");
    const characterId = params.get("character");
    const mode = params.get("mode");
    if (!filmId) return false;
    const film = films.find((item) => item.id === filmId);
    if (!film) return false;
    activeFilmId = film.id;
    activeCharacterId = characterId || "";
    activeView = characterId ? "character" : "film";
    activeTab = characterId ? "characters" : "analysis";
    isAnalysisMode = true;
    editingFilmRating = mode === "edit" && !characterId;
    editingCharacterRating = mode === "edit" && Boolean(characterId);
    render();
    return true;
  }

  function renderInfoButton(key) {
    const term = infoTerms[key];
    if (!term) return "";
    return `<span class="film-info-wrap" data-info-popover>
      <button type="button" class="film-info-toggle" aria-label="Informationen zu ${escapeHtml(term.title)} anzeigen" aria-expanded="false" data-info-toggle="${escapeHtml(key)}">ⓘ</button>
      <span class="film-info-flyout" hidden data-info-flyout="${escapeHtml(key)}">
        <strong>${escapeHtml(term.title)}</strong>
        <span>${escapeHtml(term.shortDefinition)}</span>
        ${term.detail ? `<span>${escapeHtml(term.detail)}</span>` : ""}
        <a href="${escapeHtml(term.href || "../musterbibliothek/")}" data-info-more>Mehr erfahren</a>
      </span>
    </span>`;
  }

  function renderInfoTitle(title, key) {
    const href = sharedTerms?.libraryHref(title) || "";
    const titleMarkup = href ? `<a class="adlercode-term-link" href="${escapeHtml(href)}">${escapeHtml(title)}</a>` : escapeHtml(title);
    return `<div class="film-info-title"><h3>${titleMarkup}</h3>${renderInfoButton(key)}</div>`;
  }

  function renderTermLabel(label) {
    const href = sharedTerms?.libraryHref(label) || "";
    const labelMarkup = href ? `<a class="adlercode-term-link" href="${escapeHtml(href)}">${escapeHtml(label)}</a>` : escapeHtml(label);
    return `<span class="film-term-label"><strong>${labelMarkup}</strong>${renderInfoButton(infoKeyByLabel[label])}</span>`;
  }

  function positionInfoFlyout(button, flyout) {
    const viewportGap = 12;
    const flyoutGap = 8;
    const buttonRect = button.getBoundingClientRect();

    flyout.style.left = "0px";
    flyout.style.top = "0px";
    flyout.hidden = false;

    const flyoutRect = flyout.getBoundingClientRect();
    const maxLeft = Math.max(viewportGap, window.innerWidth - flyoutRect.width - viewportGap);
    const maxTop = Math.max(viewportGap, window.innerHeight - flyoutRect.height - viewportGap);
    let left = buttonRect.left + (buttonRect.width / 2) - (flyoutRect.width / 2);
    let top = buttonRect.bottom + flyoutGap;

    if (left > maxLeft) left = buttonRect.right - flyoutRect.width;
    if (left < viewportGap) left = buttonRect.left;
    left = Math.min(Math.max(left, viewportGap), maxLeft);

    if (top + flyoutRect.height > window.innerHeight - viewportGap) {
      top = buttonRect.top - flyoutRect.height - flyoutGap;
    }
    top = Math.min(Math.max(top, viewportGap), maxTop);

    flyout.style.left = `${Math.round(left)}px`;
    flyout.style.top = `${Math.round(top)}px`;
  }

  function closeInfoFlyouts(exceptButton = null) {
    detailRoot?.querySelectorAll("[data-info-toggle]").forEach((button) => {
      if (button === exceptButton) return;
      button.setAttribute("aria-expanded", "false");
    });
    detailRoot?.querySelectorAll("[data-info-flyout]").forEach((flyout) => {
      const wrap = flyout.closest("[data-info-popover]");
      if (exceptButton && wrap?.contains(exceptButton)) return;
      flyout.hidden = true;
      flyout.style.left = "";
      flyout.style.top = "";
    });
  }

  function toggleInfoFlyout(button) {
    const wrap = button.closest("[data-info-popover]");
    const flyout = wrap?.querySelector("[data-info-flyout]");
    if (!flyout) return;
    const isOpen = flyout.hidden;
    closeInfoFlyouts(button);
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      positionInfoFlyout(button, flyout);
    } else {
      flyout.hidden = true;
      flyout.style.left = "";
      flyout.style.top = "";
    }
  }

  function repositionOpenInfoFlyout() {
    const openButton = detailRoot?.querySelector('[data-info-toggle][aria-expanded="true"]');
    if (!openButton) return;
    const flyout = openButton.closest("[data-info-popover]")?.querySelector("[data-info-flyout]");
    if (flyout && !flyout.hidden) positionInfoFlyout(openButton, flyout);
  }

  function debounce(callback, delay = 360) {
    let timer = null;
    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => callback(...args), delay);
    };
  }

  function getYear(date) {
    return date ? String(date).slice(0, 4) : "Unbekannt";
  }

  function tmdbRequest(path, params = {}) {
    const url = new URL(`${tmdbBaseUrl}${path}`);
    Object.entries({ language: "de-DE", ...params }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
    });

    return fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbToken}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error(`TMDB ${response.status}`);
      return response.json();
    });
  }

  function mapTmdbMovie(movie, details, credits) {
    const genres = (details?.genres || []).map((genre) => genre.name);
    const film = enrichFilm({
      id: `tmdb-${movie.id}`,
      source: "tmdb",
      tmdbId: movie.id,
      title: movie.title || movie.name || "Unbekannter Film",
      year: getYear(movie.release_date || details?.release_date),
      posterUrl: movie.poster_path ? `${tmdbImageBaseUrl}${movie.poster_path}` : "",
      genres,
      description: movie.overview || details?.overview || "Für diesen Film liegt aktuell keine deutsche Kurzbeschreibung vor.",
      characters: (credits?.cast || []).slice(0, 10).map((person) => character(
        `tmdb-person-${person.cast_id || person.id}`,
        person.character || "Unbekannte Rolle",
        person.name || "Unbekannter Schauspieler",
        person.known_for_department || "Darsteller",
        person.profile_path ? `${tmdbProfileBaseUrl}${person.profile_path}` : "",
      )),
    });
    return film;
  }

  async function loadTmdbFilms(query) {
    isSearchMode = query.length >= 2;

    if (!tmdbToken || query.length < 2) {
      if (!tmdbToken) films = fallbackFilms.map(enrichFilm);
      activeFilmId = "";
      activeCharacterId = "";
      activeView = "film";
      activeTab = "analysis";
      isAnalysisMode = false;
      statusMessage = tmdbToken
        ? "Gib mindestens zwei Zeichen ein, um TMDB zu durchsuchen."
        : "Lokale Platzhalterdaten aktiv. Für TMDB wird eine lokale Config benötigt.";
      render();
      return;
    }

    isLoading = true;
    statusMessage = "TMDB wird durchsucht ...";
    renderList();

    try {
      const searchResult = await tmdbRequest("/search/movie", { query, include_adult: "false", page: "1" });
      const results = (searchResult.results || []).slice(0, 8);
      const enriched = await Promise.all(results.map(async (movie) => {
        const [details, credits] = await Promise.all([
          tmdbRequest(`/movie/${movie.id}`),
          tmdbRequest(`/movie/${movie.id}/credits`),
        ]);
        return mapTmdbMovie(movie, details, credits);
      }));

      films = enriched.length ? enriched : fallbackFilms.map(enrichFilm);
      activeFilmId = "";
      activeCharacterId = "";
      activeView = "film";
      activeTab = "analysis";
      isAnalysisMode = false;
      statusMessage = enriched.length ? `${enriched.length} Filme über TMDB geladen.` : "Keine TMDB-Treffer gefunden. Platzhalterdaten werden angezeigt.";
    } catch (error) {
      films = fallbackFilms.map(enrichFilm);
      activeFilmId = "";
      activeCharacterId = "";
      activeView = "film";
      activeTab = "analysis";
      isAnalysisMode = false;
      statusMessage = "TMDB konnte nicht geladen werden. Die Seite zeigt lokale Platzhalterdaten.";
    } finally {
      isLoading = false;
      render();
    }
  }

  async function loadTmdbSuggestions() {
    if (!tmdbToken) {
      openFromUrl();
      render();
      return;
    }

    isLoading = true;
    statusMessage = "Filmvorschläge werden geladen ...";
    renderList();

    try {
      const suggestionResult = await tmdbRequest("/movie/popular", { page: "1" });
      const results = (suggestionResult.results || []).slice(0, 18);
      const enriched = await Promise.all(results.map(async (movie) => {
        const [details, credits] = await Promise.all([
          tmdbRequest(`/movie/${movie.id}`),
          tmdbRequest(`/movie/${movie.id}/credits`),
        ]);
        return mapTmdbMovie(movie, details, credits);
      }));

      films = enriched.length ? enriched : fallbackFilms.map(enrichFilm);
      activeFilmId = "";
      activeCharacterId = "";
      activeView = "film";
      activeTab = "analysis";
      isAnalysisMode = false;
      statusMessage = enriched.length ? "Filmvorschläge über TMDB geladen." : "Keine Vorschläge gefunden. Platzhalterdaten werden angezeigt.";
    } catch (error) {
      films = fallbackFilms.map(enrichFilm);
      activeFilmId = "";
      activeCharacterId = "";
      activeView = "film";
      activeTab = "analysis";
      isAnalysisMode = false;
      statusMessage = "TMDB-Vorschläge konnten nicht geladen werden. Platzhalterdaten werden angezeigt.";
    } finally {
      isLoading = false;
      if (!openFromUrl()) render();
    }
  }

  function activeFilm() {
    return films.find((film) => film.id === activeFilmId) || matchingFilms()[0] || films[0];
  }

  function activeCharacter() {
    return activeFilm()?.characters.find((item) => item.id === activeCharacterId);
  }

  function matchingFilms() {
    const query = searchInput?.value.trim().toLowerCase() || "";
    return films.filter((film) => {
      const matchesSearch = film.source === "tmdb" || !query || [film.title, film.year, ...film.genres, film.description].join(" ").toLowerCase().includes(query);
      return matchesSearch;
    });
  }

  function renderList() {
    if (!listRoot) return;
    if (isAnalysisMode) {
      listRoot.innerHTML = "";
      return;
    }
    const visibleFilms = matchingFilms();
    const film = activeFilm();
    const status = `<p class="film-api-note">${escapeHtml(isLoading ? "Lade Filmdaten ..." : statusMessage)}</p>`;
    const filmCards = visibleFilms.length && isSearchMode
      ? `<section class="film-live-results" aria-label="Live-Suche">
          ${visibleFilms.map((item) => `
            <article class="film-card" data-film-id="${escapeHtml(item.id)}">
              <div class="film-poster" aria-hidden="true">${item.posterUrl ? `<img src="${escapeHtml(item.posterUrl)}" alt="" loading="lazy" />` : ""}</div>
              <div>
                <span>${escapeHtml(item.year)}</span>
                <h2>${escapeHtml(item.title)}</h2>
              </div>
            </article>
          `).join("")}
        </section>`
      : visibleFilms.length
        ? `<section class="film-cover-grid" aria-label="Filmvorschläge">
            ${visibleFilms.map((item) => `
              <article class="film-cover-card" data-film-id="${escapeHtml(item.id)}">
                <div class="film-cover-art" aria-hidden="true">${item.posterUrl ? `<img src="${escapeHtml(item.posterUrl)}" alt="" loading="lazy" />` : ""}</div>
                <div>
                  <span>${escapeHtml(item.year)}</span>
                  <h2>${escapeHtml(item.title)}</h2>
                </div>
              </article>
            `).join("")}
          </section>`
        : '<p class="film-empty">Keine passenden Filme gefunden.</p>';
    listRoot.innerHTML = `${status}${filmCards}`;
  }

  function renderFilmReview(film) {
    detailRoot.innerHTML = `
      <article class="film-detail-view">
        <button type="button" class="film-back-button film-search-back" data-back-to-search>Zurück zur Filmsuche</button>
        <aside class="film-detail-summary">
          <div class="film-detail-cover" aria-hidden="true">${film.posterUrl ? `<img src="${escapeHtml(film.posterUrl)}" alt="" />` : ""}</div>
          <h2>${escapeHtml(film.title)}</h2>
          <span>${escapeHtml(film.year)}</span>
        </aside>
        <section class="film-detail-workspace">
          <nav class="film-tabs" aria-label="Filmanalyse Bereiche">
            <button type="button" class="${activeTab === "analysis" ? "is-selected" : ""}" data-film-tab="analysis">Filmanalyse</button>
            <button type="button" class="${activeTab === "characters" ? "is-selected" : ""}" data-film-tab="characters">Charaktere</button>
          </nav>
          ${activeTab === "characters" ? renderCharactersTab(film) : renderAnalysisTab()}
        </section>
      </article>
    `;
  }

  function renderAnalysisTab() {
    const ratings = filmRatings();
    return `
      <section class="film-analysis-tab" aria-label="Filmanalyse">
        ${renderAnalysisProgress(ratings)}
        ${renderRatingSection("Narrativanalyse", "film-narrative", ["Adler-Perspektive", "Empathen-Perspektive", "Narzissten-Perspektive", "Psychopathen-Perspektive", "Covert-Perspektive"], "Warum hast du diese Narrativanalyse vergeben?", "", ratings["film-narrative"])}
        ${renderMoralSection(ratings.moral)}
        ${renderRatingSection("Systemanalyse", "film-system", ["Adlersystem", "Schlangensystem", "Psychopath-System", "Covertsystem"], "Warum hast du diese Systemanalyse vergeben?", "", ratings["film-system"])}
        ${renderFilmResult(ratings)}
        ${renderPublicAnalysesPreview("film")}
      </section>
    `;
  }

  function renderCharactersTab(film) {
    return `
      <section class="film-characters-tab" aria-label="Charaktere">
        ${film.characters.length ? film.characters.slice(0, 12).map((item) => `
          <button type="button" class="film-role-row ${item.id === activeCharacterId ? "is-selected" : ""}" data-character-id="${escapeHtml(item.id)}">
            <span class="film-role-image" aria-hidden="true">${item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="" loading="lazy" />` : ""}</span>
            <span>
              <strong>${escapeHtml(item.characterName)}</strong>
            </span>
          </button>
        `).join("") : '<p class="film-empty">Für diesen Film wurden noch keine Rollen geladen.</p>'}
      </section>
    `;
  }

  function renderAnalysisProgress(ratings) {
    const steps = [
      ["Narrativ", Boolean(ratings["film-narrative"])],
      ["Moral", Boolean(ratings.moral)],
      ["System", Boolean(ratings["film-system"])],
    ];
    return `
      <div class="film-analysis-progress" aria-label="Fortschritt der Filmanalyse">
        ${steps.map(([label, done]) => `<span class="${done ? "is-done" : ""}">${escapeHtml(label)} ${done ? "✓" : "□"}</span>`).join("")}
      </div>
    `;
  }

  function renderCharacterProgress(result) {
    return `
      <div class="film-analysis-progress" aria-label="Fortschritt der Charakteranalyse">
        <span class="${result ? "is-done" : ""}">Charakter ${result ? "✓" : "□"}</span>
        <span class="${result?.reason ? "is-done" : ""}">Kommentar ${result?.reason ? "✓" : "□"}</span>
      </div>
    `;
  }

  function renderCharacterReview(film, characterItem) {
    detailRoot.innerHTML = `
      <article class="film-character-page">
        <div class="film-character-actions">
          <button type="button" class="film-back-button" data-back-to-film>Zurück</button>
          <button type="button" class="film-back-button" data-back-to-search>Zurück zur Filmsuche</button>
        </div>
        <header class="film-character-head">
          <div class="film-character-page-image" aria-hidden="true">${characterItem.imageUrl ? `<img src="${escapeHtml(characterItem.imageUrl)}" alt="" />` : ""}</div>
          <div>
            <span>${escapeHtml(film.title)}</span>
            <h2>${escapeHtml(characterItem.characterName)}</h2>
            <p>${escapeHtml(characterItem.actorName)}</p>
            <p>${escapeHtml(characterItem.role)}</p>
          </div>
        </header>
        ${renderCharacterProgress(characterRating(film, characterItem))}
        ${renderRatingSection("NPC-Programmanalyse", "character-program", ["Empath", "Narzisst", "Psychopath", "Covert"], "Warum hast du diese Bewertung vergeben?", "", characterRating(film, characterItem))}
        ${renderCharacterResult(characterRating(film, characterItem))}
        ${renderPublicAnalysesPreview("character")}
      </article>
    `;
  }

  function renderRatingSection(title, type, categories, reasonPlaceholder, description = "", savedRating = null) {
    const titleInfoKey = infoKeyByLabel[title];
    const values = savedRating?.values || {};
    const savedSnapshot = savedDistributionSnapshot(savedRating);
    const isEditing = editingRatingTypes.has(type);
    const isLocked = Boolean(savedRating) && !isEditing;
    const disabledAttribute = isLocked ? "disabled" : "";
    return `
      <form class="film-rating-form" data-rating-type="${escapeHtml(type)}" data-saved-snapshot="${escapeHtml(savedSnapshot)}" data-editing="${isEditing ? "true" : "false"}" data-locked="${isLocked ? "true" : "false"}">
        <header class="film-rating-header">
          ${renderInfoTitle(title, titleInfoKey)}
          ${description ? `<p>${escapeHtml(description)}</p>` : ""}
        </header>
        <div class="film-rating-sliders">
          ${categories.map((category) => `
            <div class="film-rating-row">
              <div class="film-rating-row-head">${renderTermLabel(category)}<output data-rating-output="${escapeHtml(category)}">0 %</output></div>
              <input type="range" min="0" max="100" step="5" value="${Number(values[category] || 0)}" aria-label="${escapeHtml(category)}" data-rating-slider="${escapeHtml(category)}" ${disabledAttribute} />
            </div>
          `).join("")}
        </div>
        <div class="film-rating-total" aria-live="polite">
          <span>Gesamt: <strong data-rating-total>0 %</strong></span>
          <span>Noch zu vergeben: <strong data-rating-remaining>100 %</strong></span>
        </div>
        <label class="film-rating-reason">
          <span>Begründung</span>
          <textarea rows="4" placeholder="${escapeHtml(reasonPlaceholder)}" ${disabledAttribute}>${escapeHtml(savedRating?.reason || "")}</textarea>
        </label>
        <fieldset class="film-rating-visibility">
          <legend>Sichtbarkeit</legend>
          <label><input type="radio" name="${escapeHtml(type)}-visibility" value="private" data-rating-visibility ${savedRating?.visibility !== "public" ? "checked" : ""} ${disabledAttribute} /> Privat speichern</label>
          <label><input type="radio" name="${escapeHtml(type)}-visibility" value="public" data-rating-visibility ${savedRating?.visibility === "public" ? "checked" : ""} ${disabledAttribute} /> Öffentlich veröffentlichen</label>
        </fieldset>
        ${renderSaveFeedback(type)}
        <div class="film-rating-actions">
          <button type="button" class="film-rating-save" disabled data-rating-save>Bewertung speichern</button>
          ${isLocked ? `<button type="button" class="film-rating-edit-inline" data-edit-rating-type="${escapeHtml(type)}">Bearbeiten</button>` : ""}
        </div>
        <div class="film-community-placeholder" data-community-rating-ready="false">Community-Durchschnitt wird vorbereitet.</div>
      </form>
    `;
  }

  function renderCharacterResult(result) {
    if (!result) return "";
    if (editingRatingTypes.has("character-program")) return "";
    const dominant = dominantLabel(result.values);
    return `
      <section class="film-rating-result" data-character-result>
        <h3>Deine vollständige Analyse</h3>
        <article>
          <h4>Charakteranalyse</h4>
          ${renderDistributionList(result.values)}
          <strong>Dominantes Profil: ${escapeHtml(profileLabel(dominant))}</strong>
        </article>
        <article>
          <h4>Kommentar</h4>
          ${result.reason ? `<blockquote>${escapeHtml(result.reason)}</blockquote>` : "<p>Kein Kommentar gespeichert.</p>"}
        </article>
        <span class="film-result-visibility">${result.visibility === "public" ? "Öffentlich" : "Privat"}</span>
      </section>
    `;
  }

  function renderFilmResult(ratings) {
    const hasNarrative = Boolean(ratings["film-narrative"]);
    const hasMoral = Boolean(ratings.moral);
    const hasSystem = Boolean(ratings["film-system"]);
    const hasOpenEdit = ["film-narrative", "moral", "film-system"].some((type) => editingRatingTypes.has(type));
    if (hasOpenEdit) return "";
    if (!hasNarrative || !hasMoral || !hasSystem) return "";
    const reasons = [ratings["film-narrative"]?.reason, ratings["film-system"]?.reason].filter(Boolean);
    return `
      <section class="film-rating-result film-analysis-result" data-film-result>
        <h3>Deine vollständige Analyse</h3>
        <span class="film-result-visibility">${ratings.visibility === "public" ? "Öffentlich" : "Privat"}</span>
        <article>
          <h4>Narrativanalyse</h4>
          ${renderDistributionList(ratings["film-narrative"].values)}
          <strong>Dominantes Narrativ: ${escapeHtml(dominantLabel(ratings["film-narrative"].values))}</strong>
        </article>
        <article>
          <h4>Moralanalyse</h4>
          <strong>Moralebene: ${escapeHtml(moralLabel(ratings.moral.level))}</strong>
        </article>
        <article>
          <h4>Systemanalyse</h4>
          ${renderDistributionList(ratings["film-system"].values)}
          <strong>Dominantes System: ${escapeHtml(dominantLabel(ratings["film-system"].values))}</strong>
        </article>
        <article>
          <h4>Kommentar</h4>
          ${reasons.length ? `<blockquote>${reasons.map(escapeHtml).join("<br />")}</blockquote>` : "<p>Kein Kommentar gespeichert.</p>"}
        </article>
      </section>
    `;
  }

  function renderMoralSection(savedMoral = null) {
    const savedSnapshot = savedMoralSnapshot(savedMoral);
    const isEditing = editingRatingTypes.has("moral");
    const isLocked = Boolean(savedMoral) && !isEditing;
    const disabledAttribute = isLocked ? "disabled" : "";
    const levels = [
      { value: "empath", label: "Empath", icon: "🟢" },
      { value: "narzisst", label: "Narzisst", icon: "🟡" },
      { value: "psychopath", label: "Psychopath", icon: "🟠" },
      { value: "covert", label: "Covert", icon: "🔴" },
    ];

    return `
      <form class="film-rating-form film-moral-form" data-moral-analysis data-saved-snapshot="${escapeHtml(savedSnapshot)}" data-editing="${isEditing ? "true" : "false"}" data-locked="${isLocked ? "true" : "false"}" data-community-rating-ready="false" data-comments-ready="false" data-ai-analysis-ready="false" data-pattern-links-ready="false" data-book-links-ready="false">
        <header class="film-rating-header">
          ${renderInfoTitle("Moralanalyse", "moralAnalysis")}
        </header>
        <div class="film-moral-scale" role="radiogroup" aria-label="Adlercode-Moralpyramide">
          ${levels.map((level, index) => `
            <div class="film-moral-option">
              <label class="film-moral-choice">
                <input type="radio" name="film-moral-level" value="${escapeHtml(level.value)}" ${savedMoral?.level === level.value ? "checked" : ""} data-moral-level ${disabledAttribute} />
                <span aria-hidden="true">${escapeHtml(level.icon)}</span>
                <strong>${sharedTerms?.renderLink(level.label) || escapeHtml(level.label)}</strong>
              </label>
              ${renderInfoButton(infoKeyByLabel[level.label])}
            </div>
            ${index < levels.length - 1 ? '<span class="film-moral-arrow" aria-hidden="true">↓</span>' : ""}
          `).join("")}
        </div>
        <fieldset class="film-rating-visibility">
          <legend>Sichtbarkeit</legend>
          <label><input type="radio" name="film-moral-visibility" value="private" data-rating-visibility ${savedMoral?.visibility !== "public" ? "checked" : ""} ${disabledAttribute} /> Privat speichern</label>
          <label><input type="radio" name="film-moral-visibility" value="public" data-rating-visibility ${savedMoral?.visibility === "public" ? "checked" : ""} ${disabledAttribute} /> Öffentlich veröffentlichen</label>
        </fieldset>
        ${renderSaveFeedback("moral")}
        <div class="film-rating-actions">
          <button type="button" class="film-rating-save" disabled data-moral-save>Einordnung speichern</button>
          ${isLocked ? '<button type="button" class="film-rating-edit-inline" data-edit-rating-type="moral">Bearbeiten</button>' : ""}
        </div>
        <div class="film-community-placeholder" data-community-rating-ready="false">Community-Durchschnitt wird vorbereitet.</div>
      </form>
    `;
  }

  function renderPublicAnalysesPreview(scope = "film") {
    const analyses = scope === "character" ? publicAnalysesForCharacter() : publicAnalysesForFilm();
    const target = currentPublicAnalysisTarget(scope);
    const showPublishedState = target.isPublished && target.key;
    const emptyText = scope === "character"
      ? "Noch keine öffentlichen Charakteranalysen vorhanden."
      : "Noch keine öffentlichen Filmanalysen vorhanden.";
    const buttonText = analyses.length ? "Eigene Analyse veröffentlichen" : "Analyse veröffentlichen";
    return `
      <section class="film-community-section" data-community-scope="${escapeHtml(scope)}" data-comments-ready="false" data-helpful-ready="false" data-experts-ready="false" data-ranking-ready="false">
        <header>
          <h3>Community</h3>
          <small>Community-Durchschnitt wird vorbereitet.</small>
        </header>
        ${analyses.length
          ? `<div class="film-community-list">${analyses.map(({ key, item }) => renderCommunityAnalysis(item, scope, key)).join("")}</div>`
          : `
            <div class="film-community-empty">
              <p>${emptyText}</p>
              <p>Sei der Erste und veröffentliche deine Analyse.</p>
            </div>
          `}
        ${publishFeedback?.key === target.key ? `
          <div class="film-community-publish-feedback" role="status">
            <strong>✅ Analyse erfolgreich veröffentlicht.</strong>
            <span>Deine Analyse ist jetzt öffentlich und für andere Nutzer sichtbar.</span>
          </div>
        ` : ""}
        <div class="film-community-publish-actions">
          <button type="button" class="film-community-publish ${showPublishedState ? "is-published" : ""}" data-community-publish ${showPublishedState ? "disabled" : ""}>
            ${showPublishedState ? "Veröffentlicht" : buttonText}
          </button>
          ${showPublishedState ? `
            <a class="film-community-secondary" href="${escapeHtml(publicAnalysisPageUrl(scope, target.key))}">👁 Analyse ansehen</a>
            <a class="film-community-secondary" href="${escapeHtml(publicCommunityUrl(target.key))}">💬 Zur Community</a>
          ` : ""}
        </div>
      </section>
    `;
  }

  function renderCommunityAnalysis(item, scope, key = "") {
    const meta = item.meta || {};
    const authorData = item.author || {};
    const author = authorData.username || "Adlercode Nutzer";
    const currentUserId = window.AdlercodeAuth?.currentUser?.()?.id || "";
    const canMessage = authorData.id && authorData.id !== currentUserId;
    const reasons = [item?.["film-narrative"]?.reason, item?.["film-system"]?.reason, item?.reason].filter(Boolean);
    const interaction = interactionFor(key);
    const currentUser = window.AdlercodeAuth?.currentUser?.();
    const helpfulActive = currentUser?.id && interaction.helpfulBy.includes(currentUser.id);
    return `
      <article class="film-community-analysis" id="${escapeHtml(publicAnalysisDomId(key))}" data-public-analysis-key="${escapeHtml(key)}">
        <header>
          <strong>${escapeHtml(author)}</strong>
          <span>${escapeHtml(formatDate(latestRatingDate(item)))}</span>
        </header>
        <dl>
          <div><dt>Film</dt><dd>${escapeHtml(meta.title || "Unbekannter Film")}</dd></div>
          ${scope === "character" ? `<div><dt>Charakter</dt><dd>${escapeHtml(meta.characterName || "Unbekannte Rolle")}</dd></div>` : ""}
          ${item["film-narrative"] ? `<div><dt>Narrativanalyse</dt><dd>${escapeHtml(dominantLabel(item["film-narrative"].values) || "Nicht gespeichert")}</dd></div>` : ""}
          ${item.moral ? `<div><dt>Moralanalyse</dt><dd>${escapeHtml(moralLabel(item.moral.level))}</dd></div>` : ""}
          ${item["film-system"] ? `<div><dt>Systemanalyse</dt><dd>${escapeHtml(dominantLabel(item["film-system"].values) || "Nicht gespeichert")}</dd></div>` : ""}
          ${item.values ? `<div><dt>Charakteranalyse</dt><dd>${escapeHtml(profileLabel(dominantLabel(item.values)))}</dd></div>` : ""}
        </dl>
        ${reasons.length ? `<blockquote>${reasons.map(escapeHtml).join("<br />")}</blockquote>` : ""}
        ${canMessage ? `
          <button
            type="button"
            class="film-community-message"
            data-message-author-id="${escapeHtml(authorData.id)}"
            data-message-author-name="${escapeHtml(author)}"
            data-message-author-avatar="${escapeHtml(authorData.avatarInitial || "")}"
            data-message-analysis-key="${escapeHtml(key)}"
            data-message-film="${escapeHtml(meta.title || "")}"
            data-message-character="${escapeHtml(meta.characterName || meta.character || "")}"
            data-message-scope="${escapeHtml(scope)}"
          >Nachricht senden</button>
        ` : ""}
        ${renderPublicInteraction(key, interaction, helpfulActive)}
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

  function updateRatingForm(form) {
    const sliders = [...form.querySelectorAll("[data-rating-slider]")];
    sliders.forEach((slider) => clampDistributionSlider(slider));
    const total = sliders.reduce((sum, slider) => sum + Number(slider.value || 0), 0);
    const remaining = 100 - total;

    sliders.forEach((slider) => {
      const output = slider.closest(".film-rating-row")?.querySelector("[data-rating-output]");
      if (output) output.textContent = `${slider.value} %`;
    });

    form.querySelector("[data-rating-total]").textContent = `${total} %`;
    form.querySelector("[data-rating-remaining]").textContent = `${Math.max(remaining, 0)} %`;
    const currentSnapshot = currentDistributionSnapshot(form);
    const isLocked = form.dataset.locked === "true";
    const isEditing = form.dataset.editing === "true";
    const isSaved = isLocked || (!isEditing && formHasSavedState(form, currentSnapshot));
    const hasUnsavedChange = Boolean(form.dataset.savedSnapshot) ? form.dataset.savedSnapshot !== currentSnapshot : true;
    const dirty = Boolean(form.dataset.savedSnapshot) && hasUnsavedChange;
    setSaveButtonState(form.querySelector("[data-rating-save]"), {
      canSave: total === 100 && (!isEditing || hasUnsavedChange),
      isSaved,
      dirty,
      editing: isEditing,
    });
    form.classList.toggle("is-complete", total === 100);
    form.classList.toggle("is-saved", isSaved);
    form.classList.remove("is-over");
  }

  function updateMoralForm(form) {
    const selected = form.querySelector("[data-moral-level]:checked");
    const saveButton = form.querySelector("[data-moral-save]");
    const currentSnapshot = currentMoralSnapshot(form);
    const isLocked = form.dataset.locked === "true";
    const isEditing = form.dataset.editing === "true";
    const isSaved = isLocked || (!isEditing && formHasSavedState(form, currentSnapshot));
    const hasUnsavedChange = Boolean(form.dataset.savedSnapshot) ? form.dataset.savedSnapshot !== currentSnapshot : true;
    const dirty = Boolean(form.dataset.savedSnapshot) && hasUnsavedChange;
    setSaveButtonState(saveButton, {
      canSave: Boolean(selected) && (!isEditing || hasUnsavedChange),
      isSaved,
      dirty,
      editing: isEditing,
    });
    form.classList.toggle("is-complete", Boolean(selected));
    form.classList.toggle("is-saved", isSaved);
    if (selected) form.dataset.selectedMoralLevel = selected.value;
  }

  function hydrateRenderedForms() {
    detailRoot?.querySelectorAll("[data-rating-type]").forEach(updateRatingForm);
    detailRoot?.querySelectorAll("[data-moral-analysis]").forEach(updateMoralForm);
  }

  function renderDetail() {
    if (!detailRoot) return;
    if (!isAnalysisMode) {
      detailRoot.innerHTML = "";
      return;
    }
    const film = activeFilm();
    const selectedCharacter = activeCharacter();

    if (!film) return;
    if (activeView === "character" && selectedCharacter) {
      renderCharacterReview(film, selectedCharacter);
      hydrateRenderedForms();
      return;
    }
    renderFilmReview(film);
    hydrateRenderedForms();
  }

  function render() {
    root.classList.toggle("is-analysis-mode", isAnalysisMode);
    renderList();
    renderDetail();
  }

  listRoot?.addEventListener("click", (event) => {
    const characterButton = event.target.closest("[data-character-id]");
    if (characterButton) {
      activeCharacterId = characterButton.dataset.characterId || "";
      activeView = "character";
      editingCharacterRating = false;
      editingRatingTypes.clear();
      saveFeedback = null;
      render();
      return;
    }

    const card = event.target.closest("[data-film-id]");
    const film = films.find((item) => item.id === card?.dataset.filmId);
    if (film) {
      activeFilmId = film.id;
      activeCharacterId = "";
      activeView = "film";
      activeTab = "analysis";
      isAnalysisMode = true;
      editingFilmRating = false;
      editingCharacterRating = false;
      editingRatingTypes.clear();
      saveFeedback = null;
      render();
    }
  });

  detailRoot?.addEventListener("click", (event) => {
    const infoButton = event.target.closest("[data-info-toggle]");
    if (infoButton) {
      event.preventDefault();
      event.stopPropagation();
      toggleInfoFlyout(infoButton);
      return;
    }

    const editRatingType = event.target.closest("[data-edit-rating-type]");
    if (editRatingType) {
      editingRatingTypes.add(editRatingType.dataset.editRatingType || "");
      if (editRatingType.dataset.editRatingType === "character-program") {
        editingCharacterRating = true;
      } else {
        editingFilmRating = true;
      }
      saveFeedback = null;
      render();
      return;
    }

    const editFilm = event.target.closest("[data-edit-film-rating]");
    if (editFilm) {
      editingFilmRating = true;
      render();
      return;
    }

    const editCharacter = event.target.closest("[data-edit-character-rating]");
    if (editCharacter) {
      editingCharacterRating = true;
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
      return;
    }

    const communityPublish = event.target.closest("[data-community-publish]");
    if (communityPublish) {
      if (window.AdlercodeAuth && !window.AdlercodeAuth.requireAuth()) return;
      const scope = activeView === "character" ? "character" : "film";
      const publishedKey = publishCurrentAnalysis(scope);
      if (!publishedKey) {
        if (activeView === "character") {
          editingCharacterRating = true;
          editingRatingTypes.add("character-program");
        } else {
          activeTab = "analysis";
          editingFilmRating = true;
        }
      }
      render();
      return;
    }

    const ratingSave = event.target.closest("[data-rating-save]");
    if (ratingSave) {
      const form = ratingSave.closest("[data-rating-type]");
      if (!form || ratingSave.disabled) return;
      if (window.AdlercodeAuth && !window.AdlercodeAuth.requireAuth()) return;
      const user = window.AdlercodeAuth?.currentUser?.();
      if (!user) return;
      const type = form.dataset.ratingType;
      const payload = {
        values: collectDistribution(form),
        reason: collectReason(form),
        visibility: collectVisibility(form),
        savedAt: new Date().toISOString(),
      };
      const author = currentAuthor(user);

      if (type === "character-program") {
        const key = characterRatingKey();
        if (!key) return;
        ratingStore[key] = { ...payload, ownerId: user.id, author, visibility: payload.visibility, meta: characterMeta() };
        editingRatingTypes.delete(type);
        editingCharacterRating = false;
      } else {
        const key = filmRatingKey();
        if (!key) return;
        ratingStore[key] = { ...filmRatings(), ownerId: user.id, author, visibility: payload.visibility, meta: filmMeta(), [type]: payload };
        editingRatingTypes.delete(type);
        editingFilmRating = false;
      }

      saveRatingStore();
      showTemporarySaveFeedback(type);
      render();
      return;
    }

    const moralSave = event.target.closest("[data-moral-save]");
    if (moralSave) {
      const form = moralSave.closest("[data-moral-analysis]");
      const selected = form?.querySelector("[data-moral-level]:checked");
      if (!form || !selected || moralSave.disabled) return;
      if (window.AdlercodeAuth && !window.AdlercodeAuth.requireAuth()) return;
      const user = window.AdlercodeAuth?.currentUser?.();
      if (!user) return;
      const key = filmRatingKey();
      if (!key) return;
      ratingStore[key] = {
        ...filmRatings(),
        ownerId: user.id,
        author: currentAuthor(user),
        visibility: collectVisibility(form),
        meta: filmMeta(),
        moral: {
          level: selected.value,
          visibility: collectVisibility(form),
          savedAt: new Date().toISOString(),
        },
      };
      editingFilmRating = false;
      editingRatingTypes.delete("moral");
      saveRatingStore();
      showTemporarySaveFeedback("moral");
      render();
      return;
    }

    const tabButton = event.target.closest("[data-film-tab]");
    if (tabButton) {
      activeTab = tabButton.dataset.filmTab || "analysis";
      activeView = "film";
      editingFilmRating = false;
      editingRatingTypes.clear();
      saveFeedback = null;
      render();
      return;
    }

    const characterButton = event.target.closest("[data-character-id]");
    if (characterButton) {
      activeCharacterId = characterButton.dataset.characterId || "";
      activeView = "character";
      editingCharacterRating = false;
      editingRatingTypes.clear();
      saveFeedback = null;
      render();
      return;
    }

    const searchBack = event.target.closest("[data-back-to-search]");
    if (searchBack) {
      isAnalysisMode = false;
      activeView = "film";
      activeTab = "analysis";
      activeCharacterId = "";
      editingFilmRating = false;
      editingCharacterRating = false;
      editingRatingTypes.clear();
      saveFeedback = null;
      render();
      return;
    }

    if (event.target.closest("[data-back-to-film]")) {
      activeView = "film";
      activeTab = "characters";
      editingCharacterRating = false;
      editingRatingTypes.clear();
      saveFeedback = null;
      render();
    }
  });

  detailRoot?.addEventListener("submit", (event) => {
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

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-info-popover]")) return;
    closeInfoFlyouts();
  });

  window.addEventListener("resize", repositionOpenInfoFlyout);
  window.addEventListener("scroll", repositionOpenInfoFlyout, true);

  detailRoot?.addEventListener("input", (event) => {
    const slider = event.target.closest("[data-rating-slider]");
    const reason = event.target.closest(".film-rating-reason textarea");
    if (!slider && !reason) return;
    const form = (slider || reason).closest("[data-rating-type]");
    if (!form) return;
    if (slider) clampDistributionSlider(slider);
    clearSaveFeedback(form);
    updateRatingForm(form);
  });

  detailRoot?.addEventListener("change", (event) => {
    const ratingVisibility = event.target.closest("[data-rating-visibility]");
    if (ratingVisibility) {
      const ratingForm = ratingVisibility.closest("[data-rating-type]");
      const moralForm = ratingVisibility.closest("[data-moral-analysis]");
      if (ratingForm) {
        clearSaveFeedback(ratingForm);
        updateRatingForm(ratingForm);
      }
      if (moralForm) {
        clearSaveFeedback(moralForm);
        updateMoralForm(moralForm);
      }
      return;
    }

    const moralLevel = event.target.closest("[data-moral-level]");
    if (!moralLevel) return;
    const form = moralLevel.closest("[data-moral-analysis]");
    if (form) {
      clearSaveFeedback(form);
      updateMoralForm(form);
    }
  });

  searchInput?.addEventListener("input", debounce((event) => {
    loadTmdbFilms(event.target.value.trim());
  }));

  render();
  loadTmdbSuggestions();
})();

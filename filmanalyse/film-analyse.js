(() => {
  const root = document.querySelector("[data-film-analysis]");

  if (!root) return;

  const tmdbConfig = window.ADLERCODE_TMDB_CONFIG || {};
  const tmdbToken = tmdbConfig.readAccessToken || "";
  const tmdbBaseUrl = "https://api.themoviedb.org/3";
  const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w342";
  const tmdbProfileBaseUrl = "https://image.tmdb.org/t/p/w185";
  const ratingStorageKey = "adlercode-film-ratings-v1";
  let ratingStore = loadRatingStore();
  let editingFilmRating = false;
  let editingCharacterRating = false;
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

  function filmRatingKey(film = activeFilm()) {
    return film ? `film:${film.source || "local"}:${film.id}` : "";
  }

  function characterRatingKey(film = activeFilm(), characterItem = activeCharacter()) {
    return film && characterItem ? `character:${film.source || "local"}:${film.id}:${characterItem.id}` : "";
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
    const isCompleteFilmRating = Boolean(ratings["film-narrative"] && ratings.moral && ratings["film-system"]);
    const showResultOnly = isCompleteFilmRating && !editingFilmRating;
    return `
      <section class="film-analysis-tab" aria-label="Filmanalyse">
        ${renderFilmResult(ratings)}
        ${showResultOnly ? "" : `
          ${renderRatingSection("Narrativanalyse", "film-narrative", ["Adler-Perspektive", "Empathen-Perspektive", "Narzissten-Perspektive", "Psychopathen-Perspektive", "Covert-Perspektive"], "Warum hast du diese Narrativanalyse vergeben?", "", ratings["film-narrative"])}
          ${renderMoralSection(ratings.moral)}
          ${renderRatingSection("Systemanalyse", "film-system", ["Adlersystem", "Schlangensystem", "Psychopath-System", "Covertsystem"], "Warum hast du diese Systemanalyse vergeben?", "", ratings["film-system"])}
        `}
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
        ${characterRating(film, characterItem) && !editingCharacterRating
          ? renderCharacterResult(characterRating(film, characterItem))
          : renderRatingSection("NPC-Programmanalyse", "character-program", ["Empath", "Narzisst", "Psychopath", "Covert"], "Warum hast du diese Bewertung vergeben?", "", characterRating(film, characterItem))}
      </article>
    `;
  }

  function renderRatingSection(title, type, categories, reasonPlaceholder, description = "", savedRating = null) {
    const titleInfoKey = infoKeyByLabel[title];
    const values = savedRating?.values || {};
    return `
      <form class="film-rating-form" data-rating-type="${escapeHtml(type)}">
        <header class="film-rating-header">
          ${renderInfoTitle(title, titleInfoKey)}
          ${description ? `<p>${escapeHtml(description)}</p>` : ""}
        </header>
        <div class="film-rating-sliders">
          ${categories.map((category) => `
            <div class="film-rating-row">
              <div class="film-rating-row-head">${renderTermLabel(category)}<output data-rating-output="${escapeHtml(category)}">0 %</output></div>
              <input type="range" min="0" max="100" step="5" value="${Number(values[category] || 0)}" aria-label="${escapeHtml(category)}" data-rating-slider="${escapeHtml(category)}" />
            </div>
          `).join("")}
        </div>
        <div class="film-rating-total" aria-live="polite">
          <span>Gesamt: <strong data-rating-total>0 %</strong></span>
          <span>Noch zu vergeben: <strong data-rating-remaining>100 %</strong></span>
        </div>
        <label class="film-rating-reason">
          <span>Begründung</span>
          <textarea rows="4" placeholder="${escapeHtml(reasonPlaceholder)}">${escapeHtml(savedRating?.reason || "")}</textarea>
        </label>
        <button type="button" class="film-rating-save" disabled data-rating-save>Bewertung speichern</button>
        <div class="film-rating-future" aria-hidden="true" data-community-rating-ready="false"></div>
      </form>
    `;
  }

  function renderCharacterResult(result) {
    const dominant = dominantLabel(result.values);
    return `
      <section class="film-rating-result" data-character-result>
        <p>Deine Charakteranalyse</p>
        ${renderDistributionList(result.values)}
        <strong>Dominantes Profil: ${escapeHtml(profileLabel(dominant))}</strong>
        ${result.reason ? `<blockquote>${escapeHtml(result.reason)}</blockquote>` : ""}
        <button type="button" class="film-result-edit" data-edit-character-rating>Bewertung bearbeiten</button>
      </section>
    `;
  }

  function renderFilmResult(ratings) {
    const hasNarrative = Boolean(ratings["film-narrative"]);
    const hasMoral = Boolean(ratings.moral);
    const hasSystem = Boolean(ratings["film-system"]);
    if (!hasNarrative && !hasMoral && !hasSystem) return "";
    const reasons = [ratings["film-narrative"]?.reason, ratings["film-system"]?.reason].filter(Boolean);
    return `
      <section class="film-rating-result film-analysis-result" data-film-result>
        <p>Deine Filmanalyse</p>
        ${hasNarrative ? `
          <article>
            <h4>Narrativanalyse</h4>
            ${renderDistributionList(ratings["film-narrative"].values)}
            <strong>Dominantes Narrativ: ${escapeHtml(dominantLabel(ratings["film-narrative"].values))}</strong>
          </article>
        ` : ""}
        ${hasMoral ? `
          <article>
            <h4>Moralanalyse</h4>
            <strong>Moralebene: ${escapeHtml(moralLabel(ratings.moral.level))}</strong>
          </article>
        ` : ""}
        ${hasSystem ? `
          <article>
            <h4>Systemanalyse</h4>
            ${renderDistributionList(ratings["film-system"].values)}
            <strong>Dominantes System: ${escapeHtml(dominantLabel(ratings["film-system"].values))}</strong>
          </article>
        ` : ""}
        ${reasons.length ? `<blockquote>${reasons.map(escapeHtml).join("<br />")}</blockquote>` : ""}
        <button type="button" class="film-result-edit" data-edit-film-rating>Bewertung bearbeiten</button>
      </section>
    `;
  }

  function renderMoralSection(savedMoral = null) {
    const levels = [
      { value: "empath", label: "Empath", icon: "🟢" },
      { value: "narzisst", label: "Narzisst", icon: "🟡" },
      { value: "psychopath", label: "Psychopath", icon: "🟠" },
      { value: "covert", label: "Covert", icon: "🔴" },
    ];

    return `
      <form class="film-rating-form film-moral-form" data-moral-analysis data-community-rating-ready="false" data-comments-ready="false" data-ai-analysis-ready="false" data-pattern-links-ready="false" data-book-links-ready="false">
        <header class="film-rating-header">
          ${renderInfoTitle("Moralanalyse", "moralAnalysis")}
        </header>
        <div class="film-moral-scale" role="radiogroup" aria-label="Adlercode-Moralpyramide">
          ${levels.map((level, index) => `
            <div class="film-moral-option">
              <label class="film-moral-choice">
                <input type="radio" name="film-moral-level" value="${escapeHtml(level.value)}" ${savedMoral?.level === level.value ? "checked" : ""} data-moral-level />
                <span aria-hidden="true">${escapeHtml(level.icon)}</span>
                <strong>${sharedTerms?.renderLink(level.label) || escapeHtml(level.label)}</strong>
              </label>
              ${renderInfoButton(infoKeyByLabel[level.label])}
            </div>
            ${index < levels.length - 1 ? '<span class="film-moral-arrow" aria-hidden="true">↓</span>' : ""}
          `).join("")}
        </div>
        <button type="button" class="film-rating-save" disabled data-moral-save>Einordnung speichern</button>
      </form>
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
    form.querySelector("[data-rating-save]").disabled = total !== 100;
    form.classList.toggle("is-complete", total === 100);
    form.classList.remove("is-over");
  }

  function updateMoralForm(form) {
    const selected = form.querySelector("[data-moral-level]:checked");
    const saveButton = form.querySelector("[data-moral-save]");
    if (saveButton) saveButton.disabled = !selected;
    form.classList.toggle("is-complete", Boolean(selected));
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

    const ratingSave = event.target.closest("[data-rating-save]");
    if (ratingSave) {
      const form = ratingSave.closest("[data-rating-type]");
      if (!form || ratingSave.disabled) return;
      if (window.AdlercodeAuth && !window.AdlercodeAuth.requireAuth()) return;
      const type = form.dataset.ratingType;
      const payload = {
        values: collectDistribution(form),
        reason: collectReason(form),
        savedAt: new Date().toISOString(),
      };

      if (type === "character-program") {
        const key = characterRatingKey();
        if (!key) return;
        ratingStore[key] = { ...payload, meta: characterMeta() };
        editingCharacterRating = false;
      } else {
        const key = filmRatingKey();
        if (!key) return;
        ratingStore[key] = { ...filmRatings(), meta: filmMeta(), [type]: payload };
        editingFilmRating = false;
      }

      saveRatingStore();
      render();
      return;
    }

    const moralSave = event.target.closest("[data-moral-save]");
    if (moralSave) {
      const form = moralSave.closest("[data-moral-analysis]");
      const selected = form?.querySelector("[data-moral-level]:checked");
      if (!form || !selected || moralSave.disabled) return;
      if (window.AdlercodeAuth && !window.AdlercodeAuth.requireAuth()) return;
      const key = filmRatingKey();
      if (!key) return;
      ratingStore[key] = {
        ...filmRatings(),
        meta: filmMeta(),
        moral: {
          level: selected.value,
          savedAt: new Date().toISOString(),
        },
      };
      editingFilmRating = false;
      saveRatingStore();
      render();
      return;
    }

    const tabButton = event.target.closest("[data-film-tab]");
    if (tabButton) {
      activeTab = tabButton.dataset.filmTab || "analysis";
      activeView = "film";
      editingFilmRating = false;
      render();
      return;
    }

    const characterButton = event.target.closest("[data-character-id]");
    if (characterButton) {
      activeCharacterId = characterButton.dataset.characterId || "";
      activeView = "character";
      editingCharacterRating = false;
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
      render();
      return;
    }

    if (event.target.closest("[data-back-to-film]")) {
      activeView = "film";
      activeTab = "characters";
      editingCharacterRating = false;
      render();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-info-popover]")) return;
    closeInfoFlyouts();
  });

  window.addEventListener("resize", repositionOpenInfoFlyout);
  window.addEventListener("scroll", repositionOpenInfoFlyout, true);

  detailRoot?.addEventListener("input", (event) => {
    const slider = event.target.closest("[data-rating-slider]");
    if (!slider) return;
    clampDistributionSlider(slider);
    const form = slider.closest("[data-rating-type]");
    if (form) updateRatingForm(form);
  });

  detailRoot?.addEventListener("change", (event) => {
    const moralLevel = event.target.closest("[data-moral-level]");
    if (!moralLevel) return;
    const form = moralLevel.closest("[data-moral-analysis]");
    if (form) updateMoralForm(form);
  });

  searchInput?.addEventListener("input", debounce((event) => {
    loadTmdbFilms(event.target.value.trim());
  }));

  render();
  loadTmdbSuggestions();
})();

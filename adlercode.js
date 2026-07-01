const revealItems = document.querySelectorAll(".reveal");
const heroMap = document.querySelector(".hero-map");
const heroGrid = document.querySelector(".hero-grid");
const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const brandLink = siteHeader.querySelector(".brand");
  const indexUrl = new URL(brandLink?.getAttribute("href") || "index.html", window.location.href);
  const siteRoot = indexUrl.href.replace(/(?:index\.html)?(?:#.*)?$/, "");
  const navItems = [
    ["Start", "index.html"],
    ["Musterbibliothek", "musterbibliothek/index.html"],
    ["Bücher", "buecher/index.html"],
    ["Filmanalyse", "filmanalyse/index.html"],
    ["Community", "community/index.html"],
    ["Experten", "experten/index.html"],
    ["Adler-Kodex", "adler-kodex/index.html"],
    ["FAQ", "faq/index.html"],
    ["Kontakt", "kontakt.html"],
  ];
  const platformSharedFeatures = [
    "Benutzerkonten",
    "Musterbibliothek",
    "Analysen",
    "Community",
    "Profile",
    "Kommentare",
    "Nachrichten",
    "Öffentliche Analysen",
    "Private Analysen",
    "Suchfunktion",
    "Bücher und Ressourcen",
  ];
  const analysisEngine = {
    id: "adlercode-analysis-engine",
    title: "Adlercode Analyse-Engine",
    steps: [
      {
        id: "situation",
        title: "Situation",
        prompt: "Was ist passiert?",
        description: "Kurze Beschreibung der Situation.",
      },
      {
        id: "narrative",
        title: "Narrativanalyse",
        prompt: "Welche Geschichten, Perspektiven oder Narrative entstehen?",
      },
      {
        id: "participants",
        title: "Charakter- bzw. Beteiligtenanalyse",
        prompt: "Welche Personen oder Rollen kommen vor?",
      },
      {
        id: "system",
        title: "Systemanalyse",
        prompt: "Welche Systeme, Regeln oder Strukturen beeinflussen die Situation?",
      },
      {
        id: "moral",
        title: "Moralanalyse",
        prompt: "Welche Verantwortung tragen die Beteiligten? Welche moralischen Konflikte entstehen?",
      },
      {
        id: "community",
        title: "Community",
        prompt: "Öffentliche Analysen, Kommentare und Diskussionen.",
      },
    ],
  };
  const platformModules = [
    {
      id: "mind",
      label: "Mind",
      fullLabel: "Adlercode Mind",
      status: "Aktiver Bereich",
      active: true,
      url: "mind/index.html",
      contentType: "Filme",
      itemLabel: "Film",
      participantLabel: "Charaktere",
      focus: [
        "Musterbibliothek",
        "Filmanalyse",
        "Charakteranalyse",
        "Persönlichkeitsprofile",
        "Narrative",
        "Moral",
        "Identität",
        "Wahrnehmung",
        "Community",
        "Bücher",
      ],
      sharedFeatures: platformSharedFeatures,
      analysisEngine,
    },
    {
      id: "justice",
      label: "Justice",
      fullLabel: "Adlercode Justice",
      status: "Bereich",
      url: "justice/index.html",
      contentType: "Fälle",
      itemLabel: "Fall",
      participantLabel: "Beteiligte",
      focus: ["Verantwortung", "Recht", "Konflikte", "Gerichtsfälle", "Moral", "Rollen", "Narrative", "Systemanalyse"],
      previewText:
        "Dieser Bereich wird vorbereitet. Hier werden später Fälle, Rollen, Verantwortung, Narrative und Systeme mit dem Adlercode-Framework analysiert.",
      sharedFeatures: platformSharedFeatures,
      analysisEngine,
    },
    {
      id: "politics",
      label: "Politics",
      fullLabel: "Adlercode Politics",
      status: "Bald verfügbar",
      contentType: "Politische Ereignisse",
      itemLabel: "Ereignis",
      participantLabel: "Akteure",
      focus: ["Politik", "Macht", "Propaganda", "Gesellschaft", "Ideologien", "Systeme", "Narrative"],
      previewText:
        "Dieser Bereich wird vorbereitet. Hier werden später politische Ereignisse, Akteure, Machtstrukturen, Narrative und Systeme analysiert.",
      sharedFeatures: platformSharedFeatures,
      analysisEngine,
    },
    {
      id: "business",
      label: "Business",
      fullLabel: "Adlercode Business",
      status: "Bald verfügbar",
      contentType: "Unternehmensfälle",
      itemLabel: "Unternehmensfall",
      participantLabel: "Mitarbeiter und Führungskräfte",
      focus: ["Unternehmen", "Führung", "Organisation", "Strategie", "Kommunikation", "Verhandlungen"],
      previewText:
        "Dieser Bereich wird vorbereitet. Hier werden später Unternehmen, Führung, Organisation, Kommunikation und Strategien analysiert.",
      sharedFeatures: platformSharedFeatures,
      analysisEngine,
    },
    {
      id: "relationships",
      label: "Relationships",
      fullLabel: "Adlercode Relationships",
      status: "Bald verfügbar",
      contentType: "Beziehungssituationen",
      itemLabel: "Beziehungssituation",
      participantLabel: "Partner, Familie und Umfeld",
      focus: ["Partnerschaft", "Familie", "Kommunikation", "Freundschaften", "Konflikte", "Bindung"],
      previewText:
        "Dieser Bereich wird vorbereitet. Hier werden später Beziehungssituationen, Kommunikation, Rollen, Grenzen und Dynamiken analysiert.",
      sharedFeatures: platformSharedFeatures,
      analysisEngine,
    },
    {
      id: "health",
      label: "Health",
      fullLabel: "Adlercode Health",
      status: "Bald verfügbar",
      contentType: "Gesundheitssituationen",
      itemLabel: "Gesundheitssituation",
      participantLabel: "Patient, Umfeld und Routinen",
      focus: ["Gesundheit", "Nervensystem", "Schlaf", "Ernährung", "Bewegung", "Stress", "Gewohnheiten", "Prävention"],
      previewText:
        "Dieser Bereich wird vorbereitet. Hier werden später Gesundheitssituationen, Gewohnheiten, Stress, Nervensystem und Umfeldmuster analysiert.",
      sharedFeatures: platformSharedFeatures,
      analysisEngine,
    },
    {
      id: "academy",
      label: "Academy",
      fullLabel: "Adlercode Academy",
      status: "Bald verfügbar",
      contentType: "Lerninhalte",
      itemLabel: "Lerninhalt",
      participantLabel: "Autoren, Experten und Lernende",
      focus: ["Bücher", "Modelle", "Kurse", "Videos", "Experten", "Lernen"],
      previewText:
        "Dieser Bereich wird vorbereitet. Hier werden später Bücher, Modelle, Kurse, Videos und Lernmaterialien gebündelt.",
      sharedFeatures: platformSharedFeatures,
      analysisEngine,
    },
  ];
  const authStorageKey = "adlercode-auth-v1";
  const authUsersKey = "adlercode-auth-users-v1";
  const chatStorageKey = "adlercode-chats-v1";

  function currentModuleId() {
    return window.location.pathname.includes("/justice/") ? "justice" : "mind";
  }

  function isCurrentModule(module) {
    return module.id === currentModuleId();
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function currentUser() {
    const user = readJson(authStorageKey, null);
    return user ? publicUser(user) : null;
  }

  function authRootPath(path) {
    return new URL(path, siteRoot).href;
  }

  function localPasswordHash(value) {
    let hash = 5381;
    for (const char of String(value)) {
      hash = (hash * 33) ^ char.charCodeAt(0);
    }
    return String(hash >>> 0);
  }

  function avatarInitial(value) {
    return String(value || "A").trim().charAt(0).toUpperCase() || "A";
  }

  function publicUser(user) {
    if (!user) return null;
    const username = user.username || user.name || "Adlercode Nutzer";
    return {
      id: user.id,
      username,
      name: username,
      email: user.email || "",
      avatarInitial: user.avatarInitial || avatarInitial(username || user.email),
      avatarUrl: user.avatarUrl || "",
      description: user.description || "",
      privacy: user.privacy || "private",
      createdAt: user.createdAt || new Date().toISOString(),
    };
  }

  function allUsers() {
    const users = readJson(authUsersKey, []);
    return Array.isArray(users) ? users : [];
  }

  function saveUsers(users) {
    writeJson(authUsersKey, users);
  }

  function saveSessionUser(user) {
    writeJson(authStorageKey, publicUser(user));
  }

  const authButton = document.createElement("button");
  authButton.className = "auth-header-button";
  authButton.type = "button";

  const accountCreateButton = document.createElement("button");
  accountCreateButton.className = "auth-header-button auth-create-button";
  accountCreateButton.type = "button";
  accountCreateButton.textContent = "Konto erstellen";

  const headerAuthActions = document.createElement("div");
  headerAuthActions.className = "header-auth-actions";
  headerAuthActions.setAttribute("aria-label", "Benutzerbereich");

  const profileMenu = document.createElement("div");
  profileMenu.className = "profile-menu";
  profileMenu.hidden = true;

  const authDialog = document.createElement("div");
  authDialog.className = "auth-dialog";
  authDialog.hidden = true;
  authDialog.setAttribute("role", "dialog");
  authDialog.setAttribute("aria-modal", "true");
  authDialog.setAttribute("aria-labelledby", "auth-dialog-title");
  authDialog.innerHTML = `
    <div class="auth-dialog-backdrop" data-auth-close></div>
    <section class="auth-dialog-panel">
      <button type="button" class="auth-dialog-close" data-auth-close aria-label="Anmeldung schließen">×</button>
      <p class="eyebrow">Benutzerkonto</p>
      <h2 id="auth-dialog-title">Adlercode Konto</h2>
      <div class="auth-tabs" role="tablist" aria-label="Konto">
        <button type="button" data-auth-tab="login" class="is-selected">Anmelden</button>
        <button type="button" data-auth-tab="register">Registrieren</button>
        <button type="button" data-auth-tab="forgot">Passwort vergessen</button>
      </div>
      <form class="auth-form is-active" data-auth-panel="login">
        <label>E-Mail<input type="email" name="email" autocomplete="email" required /></label>
        <label>Passwort<input type="password" name="password" autocomplete="current-password" required /></label>
        <button type="submit">Anmelden</button>
      </form>
      <form class="auth-form" data-auth-panel="register">
        <label>Benutzername<input type="text" name="username" autocomplete="username" required /></label>
        <label>E-Mail<input type="email" name="email" autocomplete="email" required /></label>
        <label>Passwort<input type="password" name="password" autocomplete="new-password" required minlength="6" /></label>
        <button type="submit">Registrieren</button>
      </form>
      <form class="auth-form" data-auth-panel="forgot">
        <label>E-Mail<input type="email" name="email" autocomplete="email" required /></label>
        <button type="submit">Link vorbereiten</button>
      </form>
      <p class="auth-message" data-auth-message aria-live="polite"></p>
    </section>
  `;

  const savePromptDialog = document.createElement("div");
  savePromptDialog.className = "auth-dialog save-prompt-dialog";
  savePromptDialog.hidden = true;
  savePromptDialog.setAttribute("role", "dialog");
  savePromptDialog.setAttribute("aria-modal", "true");
  savePromptDialog.setAttribute("aria-labelledby", "save-prompt-title");
  savePromptDialog.innerHTML = `
    <div class="auth-dialog-backdrop" data-save-prompt-close></div>
    <section class="auth-dialog-panel save-prompt-panel">
      <button type="button" class="auth-dialog-close" data-save-prompt-close aria-label="Dialog schließen">×</button>
      <p class="eyebrow" data-save-prompt-eyebrow>Gastmodus</p>
      <h2 id="save-prompt-title" data-save-prompt-title>Analyse speichern</h2>
      <p data-save-prompt-text>Um diese Funktion zu nutzen, benötigst du ein kostenloses Adlercode-Konto.</p>
      <ul class="save-prompt-benefits" data-save-prompt-benefits>
        <li>Analysen erstellen</li>
        <li>Kommentare schreiben</li>
        <li>Experten kontaktieren</li>
        <li>Nachrichten senden</li>
        <li>Inhalte speichern</li>
        <li>Community nutzen</li>
      </ul>
      <div class="save-prompt-actions">
        <button type="button" data-save-prompt-login>Anmelden</button>
        <button type="button" data-save-prompt-register>Konto erstellen</button>
        <button type="button" class="save-prompt-ghost" data-save-prompt-close>Weiter als Gast</button>
      </div>
    </section>
  `;

  const mobileToggle = document.createElement("button");
  mobileToggle.className = "mobile-nav-toggle";
  mobileToggle.type = "button";
  mobileToggle.setAttribute("aria-label", "Menü öffnen");
  mobileToggle.setAttribute("aria-controls", "mobile-nav-panel");
  mobileToggle.setAttribute("aria-expanded", "false");
  mobileToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  const headerControls = document.createElement("div");
  headerControls.className = "header-controls";

  const backButton = document.createElement("button");
  backButton.className = "header-history-button";
  backButton.type = "button";
  backButton.setAttribute("aria-label", "Zurück");
  backButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>';

  const forwardButton = document.createElement("button");
  forwardButton.className = "header-history-button";
  forwardButton.type = "button";
  forwardButton.setAttribute("aria-label", "Vorwärts");
  forwardButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>';

  headerControls.append(mobileToggle, backButton, forwardButton);

  const personalNav = document.createElement("div");
  personalNav.className = "header-personal-nav";
  personalNav.setAttribute("aria-label", "Persönliche Navigation");

  const mobilePanel = document.createElement("nav");
  mobilePanel.className = "mobile-nav-panel";
  mobilePanel.id = "mobile-nav-panel";
  mobilePanel.setAttribute("aria-label", "Mobile Navigation");
  mobilePanel.innerHTML = `
    <p>NAVIGATION</p>
    <div data-mobile-nav-links></div>
  `;

  const modulePreviewDialog = document.createElement("div");
  modulePreviewDialog.className = "module-preview-dialog";
  modulePreviewDialog.hidden = true;
  modulePreviewDialog.setAttribute("role", "dialog");
  modulePreviewDialog.setAttribute("aria-modal", "true");
  modulePreviewDialog.setAttribute("aria-labelledby", "module-preview-title");
  modulePreviewDialog.innerHTML = `
    <div class="module-preview-backdrop" data-module-preview-close></div>
    <section class="module-preview-panel" aria-describedby="module-preview-text">
      <button class="module-preview-close" type="button" data-module-preview-close aria-label="Vorschau schließen">×</button>
      <p class="module-preview-eyebrow">Bald verfügbar</p>
      <h2 id="module-preview-title" data-module-preview-title>Adlercode</h2>
      <p id="module-preview-text" data-module-preview-text></p>
      <button class="module-preview-primary" type="button" data-module-preview-close>Zurück zu Adlercode Mind</button>
    </section>
  `;

  siteHeader.prepend(headerControls);
  headerAuthActions.append(personalNav, accountCreateButton, authButton);
  siteHeader.append(headerAuthActions, profileMenu, mobilePanel, authDialog, savePromptDialog, modulePreviewDialog);

  const menuIcons = {
    profile: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>',
    analyses: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16" /><path d="M6 16V8" /><path d="M12 16V4" /><path d="M18 16v-6" /></svg>',
    messages: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.88.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.01.02.02.04.03.06A1.7 1.7 0 0 0 21 10h.09a2 2 0 0 1 0 4H21a1.7 1.7 0 0 0-1.56 1z" /></svg>',
    logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>',
  };

  const headerIcons = {
    notifications: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>',
    messages: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></svg>',
    profile: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>',
  };

  function renderHeaderNavigation() {
    const links = navItems.map(([label, path]) => `<a href="${new URL(path, siteRoot).href}">${label}</a>`).join("");
    const moduleLinks = platformModules
      .map((module) => {
        const activeModule = isCurrentModule(module);
        const status = activeModule ? "Aktiver Bereich" : module.status;
        return `
        <button type="button" class="module-nav-option${activeModule ? " is-active" : " is-preview"}" data-module-id="${module.id}" ${activeModule ? 'aria-current="true"' : ""}>
          <span>${module.label}</span>
          <small>${status}</small>
        </button>
      `;
      })
      .join("");
    const modulesMenu = `
      <details class="module-nav">
        <summary>Bereiche</summary>
        <div class="module-nav-menu" aria-label="Zukünftige Adlercode Bereiche">
          ${moduleLinks}
        </div>
      </details>
    `;
    const desktopNav = siteHeader.querySelector(".site-nav");
    const mobileLinks = mobilePanel.querySelector("[data-mobile-nav-links]");
    if (desktopNav) desktopNav.innerHTML = `${links}${modulesMenu}`;
    if (mobileLinks) mobileLinks.innerHTML = `${links}${modulesMenu}`;
    profileMenu.innerHTML = `
      <a href="${authRootPath("profil/index.html")}">${menuIcons.profile}<span>Profil</span></a>
      <a href="${authRootPath("meine-analysen/index.html")}">${menuIcons.analyses}<span>Meine Analysen</span></a>
      <a href="${authRootPath("nachrichten/index.html")}">${menuIcons.messages}<span>Nachrichten</span></a>
      <a href="${authRootPath("profil/index.html#einstellungen")}">${menuIcons.settings}<span>Einstellungen</span></a>
      <hr aria-hidden="true" />
      <button type="button" data-auth-logout>${menuIcons.logout}<span>Abmelden</span></button>
    `;
  }

  function setAuthTab(name) {
    authDialog.querySelectorAll("[data-auth-tab]").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.authTab === name);
    });
    authDialog.querySelectorAll("[data-auth-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.authPanel === name);
    });
    setAuthMessage("");
  }

  function setAuthMessage(message) {
    const messageRoot = authDialog.querySelector("[data-auth-message]");
    if (messageRoot) messageRoot.textContent = message;
  }

  function updateAuthUi() {
    const user = currentUser();
    siteHeader.classList.toggle("is-authenticated", Boolean(user));
    siteHeader.classList.toggle("is-guest", !user);
    personalNav.hidden = !user;
    personalNav.innerHTML = user
      ? `
        <button type="button" class="header-personal-link is-notifications" data-notification-open aria-label="Benachrichtigungen">
          ${headerIcons.notifications}
          <span aria-hidden="true">Benachrichtigungen</span>
          <em data-notification-dot hidden></em>
        </button>
        <a class="header-personal-link is-messages" href="${authRootPath("nachrichten/index.html")}" aria-label="Nachrichten">
          ${headerIcons.messages}
          <span>Nachrichten</span>
          <em data-message-dot hidden></em>
        </a>
      `
      : "";
    accountCreateButton.hidden = Boolean(user);
    authButton.classList.toggle("is-avatar", Boolean(user));
    authButton.setAttribute("aria-label", user ? "Benutzermenü öffnen" : "Anmelden");
    authButton.innerHTML = user
      ? `<span class="auth-avatar-initial">${user.avatarInitial || avatarInitial(user.username)}</span><span class="auth-profile-label">Profil</span><span class="auth-notification-badge" data-auth-notification hidden></span>`
      : "Anmelden";
    authButton.setAttribute("aria-expanded", "false");
    renderHeaderNavigation();
    document.dispatchEvent(new CustomEvent("adlercode:auth-change", { detail: { user } }));
  }

  function openSavePrompt(options = {}) {
    const promptTitle = savePromptDialog.querySelector("[data-save-prompt-title]");
    const promptText = savePromptDialog.querySelector("[data-save-prompt-text]");
    const promptEyebrow = savePromptDialog.querySelector("[data-save-prompt-eyebrow]");
    if (promptEyebrow) promptEyebrow.textContent = options.eyebrow || "Geschützte Funktion";
    if (promptTitle) promptTitle.textContent = options.title || "Anmeldung erforderlich";
    if (promptText) {
      promptText.textContent =
        options.text || "Um diese Funktion zu nutzen, benötigst du ein kostenloses Adlercode-Konto.";
    }
    const benefits = savePromptDialog.querySelector("[data-save-prompt-benefits]");
    if (benefits) benefits.hidden = options.hideBenefits === true;
    const guestButton = savePromptDialog.querySelector(".save-prompt-ghost");
    if (guestButton) guestButton.hidden = options.showGuest === false;
    savePromptDialog.querySelectorAll("[data-save-prompt-login], [data-save-prompt-register]").forEach((button) => {
      button.hidden = options.hideAuthActions === true;
    });
    profileMenu.hidden = true;
    savePromptDialog.hidden = false;
    document.body.classList.add("is-auth-dialog-open");
  }

  function closeSavePrompt() {
    savePromptDialog.hidden = true;
    document.body.classList.remove("is-auth-dialog-open");
  }

  function closeModuleMenus() {
    siteHeader.querySelectorAll(".module-nav[open]").forEach((menu) => menu.removeAttribute("open"));
  }

  function openModulePreview(module) {
    const title = modulePreviewDialog.querySelector("[data-module-preview-title]");
    const text = modulePreviewDialog.querySelector("[data-module-preview-text]");
    if (title) title.textContent = module.fullLabel || `Adlercode ${module.label}`;
    if (text) text.textContent = module.previewText || "Dieser Bereich wird vorbereitet.";
    profileMenu.hidden = true;
    modulePreviewDialog.hidden = false;
    document.body.classList.add("is-module-preview-open");
    modulePreviewDialog.querySelector(".module-preview-primary")?.focus();
  }

  function closeModulePreview() {
    modulePreviewDialog.hidden = true;
    document.body.classList.remove("is-module-preview-open");
  }

  function openAuthDialog(mode = "login", message = "") {
    profileMenu.hidden = true;
    authDialog.hidden = false;
    document.body.classList.add("is-auth-dialog-open");
    setAuthTab(mode);
    setAuthMessage(message);
    authDialog.querySelector("[data-auth-panel].is-active input")?.focus();
  }

  function closeAuthDialog() {
    authDialog.hidden = true;
    document.body.classList.remove("is-auth-dialog-open");
  }

  function toggleProfileMenu() {
    const open = profileMenu.hidden;
    profileMenu.hidden = !open;
    authButton.setAttribute("aria-expanded", String(open));
  }

  function loginUser(user) {
    saveSessionUser(user);
    closeAuthDialog();
    updateAuthUi();
  }

  function updateCurrentUser(updates = {}) {
    const sessionUser = currentUser();
    if (!sessionUser) return null;
    const users = allUsers();
    const nextUsers = users.map((user) => {
      if (user.id !== sessionUser.id) return user;
      return {
        ...user,
        username: updates.username || user.username,
        avatarInitial: updates.avatarInitial || avatarInitial(updates.username || user.username),
        description: updates.description ?? user.description ?? "",
        privacy: updates.privacy || user.privacy || "private",
        updatedAt: new Date().toISOString(),
      };
    });
    const nextUser = nextUsers.find((user) => user.id === sessionUser.id) || { ...sessionUser, ...updates };
    saveUsers(nextUsers);
    saveSessionUser(nextUser);
    updateAuthUi();
    return publicUser(nextUser);
  }

  function loadChatStore() {
    const store = readJson(chatStorageKey, { chats: {} });
    return store && typeof store === "object" && store.chats ? store : { chats: {} };
  }

  function saveChatStore(store) {
    writeJson(chatStorageKey, store);
  }

  function normalizeParticipant(participant) {
    const fallbackName = participant?.username || participant?.name || "Adlercode Nutzer";
    return {
      id: participant?.id || `user-${String(fallbackName).toLowerCase().replace(/[^a-z0-9]+/g, "-") || "nutzer"}`,
      username: fallbackName,
      name: fallbackName,
      avatarInitial: participant?.avatarInitial || avatarInitial(fallbackName),
      avatarUrl: participant?.avatarUrl || "",
    };
  }

  function chatIdFor(userId, participantId, context = {}) {
    const pair = [userId, participantId].sort().join("--");
    return `chat-${pair}`;
  }

  function openChatPrompt() {
    openSavePrompt({
      title: "Anmeldung erforderlich",
      text: "Um diese Funktion zu nutzen, benötigst du ein kostenloses Adlercode-Konto.",
      showGuest: false,
    });
  }

  function startChat(participant, context = {}) {
    const user = currentUser();
    if (!user) {
      openChatPrompt();
      return false;
    }
    const otherUser = normalizeParticipant(participant);
    if (!otherUser.id || otherUser.id === user.id) return false;

    const store = loadChatStore();
    let chatId = chatIdFor(user.id, otherUser.id, context);
    const now = new Date().toISOString();
    const existingPairChat = Object.values(store.chats || {}).find((chat) => {
      const ids = chat.participantIds || [];
      return ids.length === 2 && ids.includes(user.id) && ids.includes(otherUser.id);
    });
    if (existingPairChat?.id) chatId = existingPairChat.id;
    const existing = store.chats[chatId] || existingPairChat || {};
    store.chats[chatId] = {
      id: chatId,
      participantIds: [user.id, otherUser.id],
      participants: {
        ...(existing.participants || {}),
        [user.id]: publicUser(user),
        [otherUser.id]: otherUser,
      },
      context: {
        ...(existing.context || {}),
        type: existing.context?.type || context.type || "analysis",
        title: context.title || existing.context?.title || context.caseTitle || context.analysisTitle || context.filmTitle || context.bookTitle || context.termTitle || context.expertName || "",
        href: context.href || context.url || existing.context?.href || existing.context?.url || "",
        icon: context.icon || existing.context?.icon || "",
        filmTitle: existing.context?.filmTitle || context.filmTitle || "",
        characterName: existing.context?.characterName || context.characterName || "",
        caseTitle: existing.context?.caseTitle || context.caseTitle || "",
        bookTitle: existing.context?.bookTitle || context.bookTitle || "",
        termTitle: existing.context?.termTitle || context.termTitle || "",
        expertName: existing.context?.expertName || context.expertName || "",
        analysisKey: existing.context?.analysisKey || context.analysisKey || "",
        future: {
          groupChats: false,
          expertChats: context.type === "expert",
          projectGroups: false,
          analysisGroups: false,
          mentions: false,
          attachments: false,
          aiAssistant: false,
        },
      },
      createdAt: existing.createdAt || now,
      updatedAt: now,
      deletedFor: (existing.deletedFor || []).filter((id) => id !== user.id),
      blockedBy: existing.blockedBy || [],
      reportedMessages: existing.reportedMessages || [],
      messages: existing.messages || [],
    };
    saveChatStore(store);
    document.dispatchEvent(new CustomEvent("adlercode:chats-change"));
    window.location.href = authRootPath(`nachrichten/index.html?chat=${encodeURIComponent(chatId)}`);
    return true;
  }

  function startFromContent(options = {}) {
    const contentKey = String(options.title || options.caseTitle || options.filmTitle || options.bookTitle || options.termTitle || options.expertName || "inhalt")
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const target = normalizeParticipant(options.participant || {
      id: options.participantId || `content-${options.type || "context"}-${contentKey}`,
      username: options.participantName || `${options.icon || "Adlercode"} Diskussion`,
      avatarInitial: options.participantAvatar || "A",
    });
    return startChat(target, {
      type: options.type || "content",
      title: options.title || "",
      href: options.href || window.location.href,
      icon: options.icon || "",
      filmTitle: options.filmTitle || "",
      characterName: options.characterName || "",
      caseTitle: options.caseTitle || "",
      bookTitle: options.bookTitle || "",
      termTitle: options.termTitle || "",
      expertName: options.expertName || "",
      analysisKey: options.analysisKey || "",
    });
  }

  window.AdlercodeAuth = {
    currentUser,
    isLoggedIn: () => Boolean(currentUser()),
    open: openAuthDialog,
    updateProfile: updateCurrentUser,
    requireAuth(message = "") {
      if (currentUser()) return true;
      openSavePrompt({
        title: "Anmeldung erforderlich",
        text: message || "Um diese Funktion zu nutzen, benötigst du ein kostenloses Adlercode-Konto.",
        showGuest: false,
      });
      return false;
    },
    logout() {
      localStorage.removeItem(authStorageKey);
      profileMenu.hidden = true;
      updateAuthUi();
    },
  };

  window.AdlercodePlatform = {
    modules: platformModules,
    sharedFeatures: platformSharedFeatures,
    analysisEngine,
    activeModule: platformModules.find((module) => isCurrentModule(module)) || platformModules[0],
    getModule(id) {
      return platformModules.find((module) => module.id === id) || null;
    },
  };

  window.AdlercodeChat = {
    storageKey: chatStorageKey,
    load: loadChatStore,
    save: saveChatStore,
    startChat,
    startFromContent,
  };

  function setMobileMenu(open) {
    siteHeader.classList.toggle("is-mobile-nav-open", open);
    mobileToggle.setAttribute("aria-expanded", String(open));
    mobileToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }

  mobileToggle.addEventListener("click", () => {
    setMobileMenu(!siteHeader.classList.contains("is-mobile-nav-open"));
  });

  backButton.addEventListener("click", () => {
    window.history.back();
  });

  forwardButton.addEventListener("click", () => {
    window.history.forward();
  });

  authButton.addEventListener("click", () => {
    if (currentUser()) {
      toggleProfileMenu();
    } else {
      openAuthDialog("login");
    }
  });

  accountCreateButton.addEventListener("click", () => {
    openAuthDialog("register");
  });

  personalNav.addEventListener("click", (event) => {
    const notificationButton = event.target.closest("[data-notification-open]");
    if (!notificationButton) return;
    if (!currentUser()) {
      openAuthDialog("login", "Bitte melde dich an oder registriere dich, um Benachrichtigungen zu öffnen.");
      return;
    }
    openSavePrompt({
      eyebrow: "Benachrichtigungen",
      title: "Benachrichtigungen werden vorbereitet",
      text: "Hier erscheinen später neue Nachrichten, Antworten, Erwähnungen und Community-Hinweise.",
      showGuest: false,
      hideAuthActions: true,
    });
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-discussion-start]");
    if (!trigger) return;
    event.preventDefault();
    startFromContent({
      participantId: trigger.dataset.chatParticipantId,
      participantName: trigger.dataset.chatParticipantName,
      participantAvatar: trigger.dataset.chatParticipantAvatar,
      type: trigger.dataset.chatType,
      title: trigger.dataset.chatTitle,
      href: trigger.dataset.chatHref,
      icon: trigger.dataset.chatIcon,
      filmTitle: trigger.dataset.chatFilm,
      characterName: trigger.dataset.chatCharacter,
      caseTitle: trigger.dataset.chatCase,
      bookTitle: trigger.dataset.chatBook,
      termTitle: trigger.dataset.chatTerm,
      expertName: trigger.dataset.chatExpert,
      analysisKey: trigger.dataset.chatAnalysisKey,
    });
  });

  mobilePanel.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target.closest("[data-platform-library]")) {
      setMobileMenu(false);
    }
  });

  siteHeader.addEventListener("click", (event) => {
    const moduleButton = event.target.closest("[data-module-id]");
    if (!moduleButton) return;
    event.preventDefault();
    const module = platformModules.find((item) => item.id === moduleButton.dataset.moduleId);
    closeModuleMenus();
    setMobileMenu(false);
    if (!module || isCurrentModule(module)) return;
    if (module.url) {
      window.location.href = new URL(module.url, siteRoot).href;
      return;
    }
    openModulePreview(module);
  });

  modulePreviewDialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-module-preview-close]")) closeModulePreview();
  });

  document.addEventListener("click", (event) => {
    const personalLink = event.target.closest('a[href*="meine-analysen"], a[href*="profil"], a[href*="nachrichten"]');
    if (!personalLink || currentUser()) return;
    event.preventDefault();
    setMobileMenu(false);
    openAuthDialog("login", "Bitte melde dich an oder registriere dich, um persönliche Bereiche zu öffnen.");
  });

  authDialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-auth-close]")) closeAuthDialog();
    const tabButton = event.target.closest("[data-auth-tab]");
    if (tabButton) setAuthTab(tabButton.dataset.authTab);
  });

  savePromptDialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-save-prompt-close]")) {
      closeSavePrompt();
      return;
    }
    if (event.target.closest("[data-save-prompt-login]")) {
      closeSavePrompt();
      openAuthDialog("login");
      return;
    }
    if (event.target.closest("[data-save-prompt-register]")) {
      closeSavePrompt();
      openAuthDialog("register");
    }
  });

  authDialog.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target.closest("[data-auth-panel]");
    if (!form) return;
    const mode = form.dataset.authPanel;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const users = allUsers();

    if (mode === "login") {
      const user = users.find((item) => item.email === email && item.passwordHash === localPasswordHash(password));
      if (!user) {
        setAuthMessage("Diese lokalen Zugangsdaten wurden nicht gefunden.");
        return;
      }
      loginUser(user);
      return;
    }

    if (mode === "register") {
      if (users.some((item) => item.email === email)) {
        setAuthMessage("Für diese E-Mail gibt es bereits ein lokales Konto.");
        return;
      }
      const username = String(formData.get("username") || "Adlercode Nutzer").trim();
      const user = {
        id: `local-${Date.now()}`,
        username,
        email,
        passwordHash: localPasswordHash(password),
        avatarInitial: avatarInitial(username),
        avatarUrl: "",
        description: "",
        privacy: "private",
        createdAt: new Date().toISOString(),
      };
      saveUsers([...users, user]);
      loginUser(user);
      return;
    }

    if (mode === "forgot") {
      const user = users.find((item) => item.email === email);
      if (!user) {
        setAuthMessage("Für diese E-Mail wurde lokal kein Konto gefunden.");
        return;
      }
      setAuthMessage("Passwort-Wiederherstellung ist für das spätere E-Mail-System vorbereitet.");
    }
  });

  profileMenu.addEventListener("click", (event) => {
    if (event.target.closest("[data-auth-logout]")) {
      window.AdlercodeAuth.logout();
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
      setMobileMenu(false);
      profileMenu.hidden = true;
      authButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenu(false);
      profileMenu.hidden = true;
      closeAuthDialog();
      closeSavePrompt();
      closeModulePreview();
    }
  });

  document.addEventListener("adlercode:chats-change", renderHeaderNavigation);

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 861px)").matches) {
      setMobileMenu(false);
    }
  });

  updateAuthUi();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener(
  "scroll",
  () => {
    const offset = Math.min(window.scrollY, 900);
    if (heroMap) {
      heroMap.style.transform = `translate3d(0, ${offset * 0.05}px, 0)`;
    }
    if (heroGrid) {
      heroGrid.style.opacity = String(Math.max(0.18, 0.38 - offset / 2600));
    }
  },
  { passive: true }
);

const platformHome = document.querySelector("[data-platform-home]");

if (platformHome) {
  function category(title, entries = []) {
    return { id: slug(title), title, entries: entries.map((entryTitle) => ({ id: slug(entryTitle), title: entryTitle })) };
  }

  function slug(value) {
    return value.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  const platformLibraries = {
    muster: {
      title: "Musterbibliothek",
      categories: [
        category("Adlercode", ["Was ist Adlercode?", "Ziel", "Framework"]),
        category("Personen", ["Natürliche Person", "Juristische Person", "Einzelperson", "Gemeinschaft"]),
        category("Systeme", ["Adlersystem", "Schlangensystem", "NPC-System"]),
        category("Personenprofile", ["Empath", "Narzisst", "Psychopath", "Covert", "NPC-Programme"]),
        category("Moral", ["Moralpyramide", "Sicherheitspyramide"]),
        category("Identität", ["Main-ID", "Masken-ID", "Programmwechsel"]),
        category("Wahrnehmung", ["Filter", "NPC-Filter", "Wahrnehmung", "Realität"]),
        category("Narrative", ["Narrativ", "Narrativkontrolle", "NPC-Narrative", "Rollenspiel", "Rollenwechsel"]),
        category("Analyse", ["Musteranalyse", "Rollenanalyse", "Systemanalyse", "Narrativanalyse"]),
        category("Gewalt", ["Naturgewalt", "Systemische Gewalt", "Natürliche Gewalt", "Zwangsgewalt"]),
      ],
    },
    buch: {
      title: "Bücher",
      categories: [
        category("Adlercode-Bücher", ["Lead by Example", "Masks vs. Claws", "Force of Nature", "Setz die Brille auf! – NPC-Filter", "Adler-System"]),
        category("Autoren"),
        category("Themen"),
      ],
    },
    film: { title: "Filmanalyse", categories: [category("Filme"), category("Serien"), category("Charaktere"), category("Musteranalysen"), category("Rollenanalysen"), category("Verhaltensanalysen")] },
  };

  const platformContent = platformHome.querySelector("[data-platform-content]");
  const platformSearch = platformHome.querySelector("[data-platform-search]");

  function allLibraries() {
    return Object.entries(platformLibraries).map(([id, library]) => ({ id, ...library }));
  }

  function showPlatformContent(markup) {
    if (!platformContent) return;
    platformHome.classList.add("has-platform-content");
    platformContent.innerHTML = markup;
  }

  function clearPlatformContent() {
    if (!platformContent) return;
    platformHome.classList.remove("has-platform-content");
    platformContent.innerHTML = "";
  }

  function renderPlatformLibrary(id) {
    const current = platformLibraries[id] || platformLibraries.muster;
    document.querySelectorAll(".mobile-nav-panel [data-platform-library]").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.platformLibrary === id);
    });
    showPlatformContent(`
      <article class="platform-panel">
        <h2>${current.title}</h2>
        <div class="platform-list">
          ${current.categories.map((item) => `<button type="button" data-platform-category="${item.id}" data-platform-library-ref="${id}">${item.title}</button>`).join("")}
        </div>
      </article>
    `);
  }

  function renderPlatformCategory(libraryId, categoryId) {
    const library = platformLibraries[libraryId] || platformLibraries.muster;
    const selectedCategory = library.categories.find((item) => item.id === categoryId);
    if (!selectedCategory) return;
    showPlatformContent(`
      <article class="platform-panel">
        <h2>${selectedCategory.title}</h2>
        <div class="platform-list">
          ${selectedCategory.entries.map((item) => `<button type="button" data-platform-entry="${item.id}" data-platform-library-ref="${libraryId}" data-platform-category-ref="${selectedCategory.id}">${item.title}</button>`).join("")}
        </div>
      </article>
    `);
  }

  function renderPlatformEntry(libraryId, categoryId, entryId) {
    const library = platformLibraries[libraryId] || platformLibraries.muster;
    const selectedCategory = library.categories.find((item) => item.id === categoryId);
    const selectedEntry = selectedCategory?.entries.find((item) => item.id === entryId);
    if (!selectedEntry) return;
    showPlatformContent(`
      <article class="platform-panel platform-entry">
        <h2>${selectedEntry.title}</h2>
        <dl>
          <div><dt>Definition</dt><dd>Wird ergänzt.</dd></div>
          <div><dt>Einordnung</dt><dd>${library.title} / ${selectedCategory.title}</dd></div>
          <div><dt>Verwandte Begriffe</dt><dd>Wird ergänzt.</dd></div>
          <div><dt>Weiterführende Inhalte</dt><dd>Bücher, Filmanalysen und Quellen können später verknüpft werden.</dd></div>
        </dl>
      </article>
    `);
  }

  function renderPlatformSearch(query) {
    const clean = query.trim().toLowerCase();
    if (!clean) {
      clearPlatformContent();
      return;
    }

    const results = allLibraries()
      .flatMap((library) => library.categories.flatMap((item) => [
        { library, category: item, title: item.title },
        ...item.entries.map((entry) => ({ library, category: item, entry, title: entry.title })),
      ]))
      .filter((item) => [item.library.title, item.category.title, item.title].join(" ").toLowerCase().includes(clean));

    showPlatformContent(`
      <article class="platform-panel">
        <p class="eyebrow">Suche</p>
        <div class="platform-list">
          ${results.map((item) => item.entry
            ? `<button type="button" data-platform-entry="${item.entry.id}" data-platform-library-ref="${item.library.id}" data-platform-category-ref="${item.category.id}">${item.title}<span>${item.library.title} / ${item.category.title}</span></button>`
            : `<button type="button" data-platform-category="${item.category.id}" data-platform-library-ref="${item.library.id}">${item.title}<span>${item.library.title}</span></button>`
          ).join("")}
        </div>
      </article>
    `);
  }

  platformHome.addEventListener("click", (event) => {
    const button = event.target.closest("[data-platform-library]");
    if (button) {
      renderPlatformLibrary(button.dataset.platformLibrary);
      platformHome.classList.remove("is-platform-menu-open");
      return;
    }

    const categoryButton = event.target.closest("[data-platform-category]");
    if (categoryButton) {
      renderPlatformCategory(categoryButton.dataset.platformLibraryRef, categoryButton.dataset.platformCategory);
      return;
    }

    const entryButton = event.target.closest("[data-platform-entry]");
    if (entryButton) {
      renderPlatformEntry(entryButton.dataset.platformLibraryRef, entryButton.dataset.platformCategoryRef, entryButton.dataset.platformEntry);
    }
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".mobile-nav-panel [data-platform-library]");
    if (button) {
      event.preventDefault();
      renderPlatformLibrary(button.dataset.platformLibrary);
    }
  });

  if (!window.ADLERCODE_GLOBAL_SEARCH?.ready) {
    platformSearch?.addEventListener("input", (event) => renderPlatformSearch(event.target.value));
  }
}

document.querySelectorAll("[data-origin-trigger]").forEach((trigger) => {
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const accordion = trigger.closest(".origin-accordion");

  if (!panel || !accordion) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    accordion.classList.toggle("is-open", !isOpen);
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});

document.querySelectorAll("[data-faq-trigger]").forEach((trigger) => {
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const accordion = trigger.closest(".faq-item");

  if (!panel || !accordion) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    accordion.classList.toggle("is-open", !isOpen);
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});

document.querySelectorAll("[data-library-trigger]").forEach((trigger) => {
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const accordion = trigger.closest(".library-accordion");

  if (!panel || !accordion) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    accordion.classList.toggle("is-open", !isOpen);
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});

window.addEventListener("resize", () => {
  document.querySelectorAll(".origin-accordion.is-open [data-origin-panel]").forEach((panel) => {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });

  document.querySelectorAll(".faq-item.is-open [data-faq-panel]").forEach((panel) => {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });

  document.querySelectorAll(".library-accordion.is-open [data-library-panel]").forEach((panel) => {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });
});

const patternTestQuestions = [
  {
    question: "Wenn du ein Problem mit jemandem hast:",
    answers: [
      { label: "Ich spreche es direkt an.", type: "adler" },
      { label: "Ich versuche indirekt Einfluss zu nehmen.", type: "schlange" },
      { label: "Ich vermeide die Konfrontation.", type: "misch" },
    ],
  },
  {
    question: "Wenn dein Instinkt etwas anderes sagt als die Mehrheit:",
    answers: [
      { label: "Ich prüfe meinen Instinkt ernsthaft.", type: "adler" },
      { label: "Ich folge lieber der Mehrheit.", type: "schlange" },
      { label: "Kommt auf die Situation an.", type: "misch" },
    ],
  },
  {
    question: "Was ist wichtiger?",
    answers: [
      { label: "Wahrheit.", type: "adler" },
      { label: "Einfluss.", type: "schlange" },
      { label: "Harmonie.", type: "misch" },
    ],
  },
  {
    question: "Wenn jemand Kritik an dir äußert:",
    answers: [
      { label: "Ich prüfe zuerst, ob etwas Wahres daran sein könnte.", type: "adler" },
      { label: "Ich verteidige mich sofort.", type: "schlange" },
      { label: "Es kommt darauf an, wer die Kritik äußert.", type: "misch" },
    ],
  },
  {
    question: "Wie gehst du mit Macht um?",
    answers: [
      { label: "Macht sollte Verantwortung dienen.", type: "adler" },
      { label: "Macht sollte genutzt werden, um Ziele zu erreichen.", type: "schlange" },
      { label: "Macht ist weder gut noch schlecht.", type: "misch" },
    ],
  },
  {
    question: "Wenn du etwas möchtest:",
    answers: [
      { label: "Ich frage direkt.", type: "adler" },
      { label: "Ich versuche die Situation in meine Richtung zu lenken.", type: "schlange" },
      { label: "Ich hoffe, dass es sich ergibt.", type: "misch" },
    ],
  },
  {
    question: "Welche Aussage trifft eher zu?",
    answers: [
      { label: "Freiheit braucht Verantwortung.", type: "adler" },
      { label: "Kontrolle schafft Sicherheit.", type: "schlange" },
      { label: "Man braucht von beidem etwas.", type: "misch" },
    ],
  },
  {
    question: "Wenn jemand dir vertraut:",
    answers: [
      { label: "Ich behandle dieses Vertrauen sorgfältig.", type: "adler" },
      { label: "Vertrauen kann ein Vorteil sein.", type: "schlange" },
      { label: "Das hängt von der Situation ab.", type: "misch" },
    ],
  },
  {
    question: "Wenn ein System Menschen schadet:",
    answers: [
      { label: "Das System sollte hinterfragt werden.", type: "adler" },
      { label: "Menschen sollten sich besser anpassen.", type: "schlange" },
      { label: "Beides kann notwendig sein.", type: "misch" },
    ],
  },
  {
    question: "Welche Aussage passt eher zu dir?",
    answers: [
      { label: "Ich bevorzuge Klarheit.", type: "adler" },
      { label: "Ich bevorzuge Einfluss.", type: "schlange" },
      { label: "Ich bevorzuge Flexibilität.", type: "misch" },
    ],
  },
  {
    question: "Wenn du einen Fehler machst:",
    answers: [
      { label: "Ich suche meinen Anteil daran.", type: "adler" },
      { label: "Ich suche die Ursache bei anderen oder den Umständen.", type: "schlange" },
      { label: "Es kommt auf den Fehler an.", type: "misch" },
    ],
  },
  {
    question: "Welche Art von Kommunikation bevorzugst du?",
    answers: [
      { label: "Direkt und offen.", type: "adler" },
      { label: "Strategisch und indirekt.", type: "schlange" },
      { label: "Situationsabhängig.", type: "misch" },
    ],
  },
  {
    question: "Was beeindruckt dich mehr?",
    answers: [
      { label: "Charakter.", type: "adler" },
      { label: "Status.", type: "schlange" },
      { label: "Erfolg.", type: "misch" },
    ],
  },
  {
    question: "Wenn du ein wiederkehrendes Problem bemerkst:",
    answers: [
      { label: "Ich suche nach dem Muster dahinter.", type: "adler" },
      { label: "Ich konzentriere mich auf den unmittelbaren Vorteil oder Nachteil.", type: "schlange" },
      { label: "Ich beobachte erst einmal weiter.", type: "misch" },
    ],
  },
  {
    question: "Welche Aussage spricht dich am meisten an?",
    answers: [
      { label: "Wahrheit schafft Freiheit.", type: "adler" },
      { label: "Kontrolle schafft Sicherheit.", type: "schlange" },
      { label: "Anpassung schafft Frieden.", type: "misch" },
    ],
  },
];

const resultText = {
  adler: {
    title: "Adler-Muster dominant",
    body: [
      "In deinen Antworten zeigt sich ein starkes Adler-Muster.",
      "Du tendierst zu Klarheit, Wahrheit, direkter Kommunikation, Verantwortung und Mustererkennung.",
      "Das bedeutet nicht, dass du perfekt bist.",
      "Es bedeutet, dass dein aktuelles Programm eher auf Bewusstsein und Freiheit ausgerichtet ist.",
    ],
  },
  schlange: {
    title: "Schlangen-Muster dominant",
    body: [
      "In deinen Antworten zeigen sich stärkere Schlangen-Muster.",
      "Das bedeutet nicht, dass du schlecht bist.",
      "Es zeigt, dass Kontrolle, Einfluss, Absicherung oder indirekte Strategien in deinen Antworten stärker wirken.",
      "Der AdlerCode lädt dich dazu ein, diese Muster nicht zu verdrängen, sondern bewusst zu erkennen.",
    ],
  },
  misch: {
    title: "Gemischtes Profil",
    body: [
      "In deinen Antworten zeigt sich kein eindeutiges Muster.",
      "Du bewegst dich zwischen Adler- und Schlangenmustern, je nach Situation, Umfeld oder innerem Zustand.",
      "Das kann auf Anpassung, Selbstschutz oder Unsicherheit hinweisen.",
      "Der nächste Schritt ist nicht Selbstverurteilung, sondern Beobachtung.",
    ],
  },
};

const tieTitles = {
  "adler,misch": "Adler mit Mischprofil",
  "misch,schlange": "Schlangen-Muster mit Mischprofil",
  "adler,schlange": "Innerer Konflikt zwischen Adler und Schlange",
  "adler,misch,schlange": "Drei aktive Programme",
};

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);

const testForm = document.querySelector("[data-pattern-test]");
const questionsRoot = document.querySelector("[data-test-questions]");
const testMessage = document.querySelector("[data-test-message]");
const testResult = document.querySelector("[data-test-result]");

if (testForm && questionsRoot && testMessage && testResult) {
  questionsRoot.innerHTML = patternTestQuestions
    .map((item, questionIndex) => {
      const answers = item.answers
        .map((answer, answerIndex) => {
          const optionLetter = ["A", "B", "C"][answerIndex];
          const inputId = `question-${questionIndex + 1}-${optionLetter.toLowerCase()}`;
          return `
            <label class="test-option" for="${inputId}">
              <input id="${inputId}" type="radio" name="question-${questionIndex}" value="${answer.type}" />
              <span>${optionLetter}) ${escapeHtml(answer.label)}</span>
            </label>
          `;
        })
        .join("");

      return `
        <fieldset class="test-question">
          <legend>${questionIndex + 1}. ${escapeHtml(item.question)}</legend>
          <div class="test-options">${answers}</div>
        </fieldset>
      `;
    })
    .join("");

  testForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(testForm);
    const answeredCount = Array.from(formData.keys()).length;

    if (answeredCount !== patternTestQuestions.length) {
      testMessage.textContent = "Bitte beantworte alle Fragen, bevor du die Auswertung startest.";
      testResult.hidden = true;
      return;
    }

    const scores = { adler: 0, schlange: 0, misch: 0 };
    Array.from(formData.values()).forEach((type) => {
      if (scores[type] !== undefined) {
        scores[type] += 1;
      }
    });

    testMessage.textContent = "";
    const maxScore = Math.max(scores.adler, scores.schlange, scores.misch);
    const winners = Object.keys(scores).filter((type) => scores[type] === maxScore).sort();
    const isTie = winners.length > 1;
    const winnerKey = winners.join(",");
    const winner = isTie ? null : winners[0];
    const result = winner ? resultText[winner] : {
      title: tieTitles[winnerKey] || "Gemischtes Profil",
      body: [
        winners.length === 3
          ? "Deine Antworten zeigen mehrere aktive Programme. Das ist nicht ungewöhnlich. Menschen reagieren je nach Situation unterschiedlich. Wichtig ist, welches Programm du bewusst stärken willst."
          : "Deine Antworten zeigen zwei aktive Programme. Das ist nicht ungewöhnlich. Menschen reagieren je nach Situation unterschiedlich. Wichtig ist, welches Programm du bewusst stärken willst.",
      ],
    };

    const scoreLabels = {
      adler: "Adler-Punkte",
      schlange: "Schlangen-Punkte",
      misch: "Mischprofil-Punkte",
    };

    const scoreCards = Object.entries(scores)
      .map(([type, score]) => {
        const width = (score / patternTestQuestions.length) * 100;
        return `
          <div class="score-card">
            <header>
              <span>${scoreLabels[type]}</span>
              <span>${score}</span>
            </header>
            <div class="score-bar" aria-hidden="true"><span style="width: ${width}%"></span></div>
          </div>
        `;
      })
      .join("");

    testResult.innerHTML = `
      <div class="score-grid">${scoreCards}</div>
      <h2>${result.title}</h2>
      ${result.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <div class="result-actions">
        <button class="button button-secondary" type="button" data-test-reset>Test wiederholen</button>
        <a class="button button-secondary" href="../adler-kodex/index.html">Adler-Kodex lesen</a>
        <a class="button button-secondary" href="../buecher/index.html">Bücher ansehen</a>
      </div>
    `;
    testResult.hidden = false;
    testResult.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  testResult.addEventListener("click", (event) => {
    if (!event.target.closest("[data-test-reset]")) {
      return;
    }
    testForm.reset();
    testResult.hidden = true;
    testMessage.textContent = "";
    testForm.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

(() => {
  const root = document.querySelector("[data-profile-page]");
  if (!root) return;

  const storageKey = "adlercode-film-ratings-v1";

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  }

  function setText(selector, value) {
    const element = root.querySelector(selector);
    if (element) element.textContent = String(value);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function latestDate(item) {
    return [item?.savedAt, item?.moral?.savedAt, item?.["film-narrative"]?.savedAt, item?.["film-system"]?.savedAt]
      .filter(Boolean)
      .sort()
      .at(-1) || "";
  }

  function isPublicAnalysis(item) {
    return item?.visibility === "public" || item?.["film-narrative"]?.visibility === "public" || item?.moral?.visibility === "public" || item?.["film-system"]?.visibility === "public";
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  const store = loadStore();
  const user = window.AdlercodeAuth?.currentUser?.();
  if (!user) {
    window.AdlercodeAuth?.open?.("login", "Bitte melde dich an oder registriere dich, um dein Profil zu nutzen.");
  }
  const entries = Object.entries(store);

  function belongsToCurrentUser(key, item) {
    if (!user?.id) return false;
    return item?.ownerId === user.id || key.startsWith(`film:${user.id}:`) || key.startsWith(`character:${user.id}:`);
  }

  const filmAnalyses = entries
    .filter(([key, item]) => key.startsWith("film:") && (item?.["film-narrative"] || item?.moral || item?.["film-system"]))
    .filter(([key, item]) => belongsToCurrentUser(key, item))
    .map(([key, item]) => ({ key, type: "Filmanalyse", title: item?.meta?.title || "Unbenannter Film", date: latestDate(item), href: "../meine-analysen/" }));
  const characterAnalyses = entries
    .filter(([key, item]) => key.startsWith("character:") && item?.values)
    .filter(([key, item]) => belongsToCurrentUser(key, item))
    .map(([key, item]) => ({
      key,
      type: "Charakteranalyse",
      title: item?.meta?.character || item?.meta?.name || "Unbenannte Rolle",
      date: item?.savedAt || "",
      href: "../meine-analysen/?tab=characters",
    }));
  const filmCount = filmAnalyses.length;
  const characterCount = characterAnalyses.length;
  const publicCount = [...filmAnalyses, ...characterAnalyses].filter((item) => isPublicAnalysis(store[item.key])).length;
  const privateCount = filmCount + characterCount - publicCount;
  const recentRoot = root.querySelector("[data-profile-recent]");
  const publicListRoot = root.querySelector("[data-profile-public-list]");
  const emptyPublicRoot = root.querySelector(".profile-empty-public");
  const editButton = root.querySelector("[data-profile-edit]");
  const editForm = root.querySelector("[data-profile-edit-form]");
  const editMessage = root.querySelector("[data-profile-edit-message]");
  const messageButton = root.querySelector("[data-profile-message]");
  const profileParams = new URLSearchParams(window.location.search);
  const viewedProfile = profileParams.get("user")
    ? {
        id: profileParams.get("user"),
        username: profileParams.get("name") || "Adlercode Nutzer",
        avatarInitial: profileParams.get("avatar") || "A",
      }
    : null;

  if (user) {
    setText("[data-profile-name]", user.username || user.name || user.email || "Adlercode Nutzer");
    setText("[data-profile-email]", user.email || "Keine E-Mail gespeichert");
    setText("[data-profile-member-since]", formatDate(user.createdAt) || "2026");
    setText(".profile-avatar", user.avatarInitial || "A");
    setText("[data-profile-description]", user.description || "Persönliches Zentrum für Analysen, Einstellungen und zukünftige Community-Funktionen.");
    setText("[data-profile-account-name]", user.username || user.name || user.email || "Adlercode Nutzer");
    setText(
      "[data-profile-account-description]",
      user.description || "Beschreibe kurz, welche Themen und Analysen dich interessieren.",
    );
    if (editForm) {
      editForm.elements.username.value = user.username || user.name || "";
      editForm.elements.description.value = user.description || "";
      editForm.elements.privacy.value = user.privacy || "private";
    }
  }

  if (viewedProfile && viewedProfile.id !== user?.id) {
    setText("[data-profile-name]", viewedProfile.username);
    setText(".profile-avatar", viewedProfile.avatarInitial || "A");
    if (messageButton) {
      messageButton.hidden = false;
      messageButton.addEventListener("click", () => {
        window.AdlercodeChat?.startChat?.(viewedProfile, { type: "profile" });
      });
    }
  }

  setText("[data-stat-films]", filmCount);
  setText("[data-stat-characters]", characterCount);
  setText("[data-stat-public]", publicCount);
  setText("[data-stat-private]", Math.max(privateCount, 0));

  const recentAnalyses = [...filmAnalyses, ...characterAnalyses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (recentRoot && recentAnalyses.length) {
    recentRoot.hidden = false;
    recentRoot.innerHTML = recentAnalyses
      .map(
        (item) => `
          <a href="${item.href}">
            <span>${escapeHtml(item.type)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            ${item.date ? `<small>${escapeHtml(formatDate(item.date))}</small>` : ""}
          </a>
        `
      )
      .join("");
  }

  const publicAnalyses = [...filmAnalyses, ...characterAnalyses]
    .filter((item) => {
      const storeItem = store[item.key];
      return isPublicAnalysis(storeItem);
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  if (publicListRoot && publicAnalyses.length) {
    if (emptyPublicRoot) emptyPublicRoot.hidden = true;
    publicListRoot.hidden = false;
    publicListRoot.innerHTML = publicAnalyses
      .map(
        (item) => `
          <a href="${item.href}">
            <span>${escapeHtml(item.type)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            ${item.date ? `<small>${escapeHtml(formatDate(item.date))}</small>` : ""}
          </a>
        `
      )
      .join("");
  }

  root.querySelector(".profile-secondary-button")?.addEventListener("click", () => {
    window.AdlercodeAuth?.requireAuth?.("Bitte melde dich an oder registriere dich, um Analysen zu veröffentlichen.");
  });

  editButton?.addEventListener("click", () => {
    if (!window.AdlercodeAuth?.requireAuth?.("Bitte melde dich an oder registriere dich, um dein Profil zu bearbeiten.")) return;
    editForm.hidden = !editForm.hidden;
    if (!editForm.hidden) editForm.elements.username?.focus();
  });

  root.querySelector("[data-profile-edit-cancel]")?.addEventListener("click", () => {
    editForm.hidden = true;
    if (editMessage) editMessage.textContent = "";
  });

  editForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);
    const username = String(formData.get("username") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const privacy = String(formData.get("privacy") || "private");
    if (!username) {
      if (editMessage) editMessage.textContent = "Bitte gib einen Benutzernamen ein.";
      return;
    }
    const updated = window.AdlercodeAuth?.updateProfile?.({ username, description, privacy });
    if (!updated) return;
    setText("[data-profile-name]", updated.username || "Adlercode Nutzer");
    setText(".profile-avatar", updated.avatarInitial || "A");
    setText("[data-profile-description]", updated.description || "Persönliches Zentrum für Analysen, Einstellungen und zukünftige Community-Funktionen.");
    setText("[data-profile-account-name]", updated.username || "Adlercode Nutzer");
    setText("[data-profile-account-description]", updated.description || "Beschreibe kurz, welche Themen und Analysen dich interessieren.");
    if (editMessage) editMessage.textContent = "Profil gespeichert.";
    editForm.hidden = true;
  });
})();

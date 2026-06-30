(() => {
  const root = document.querySelector("[data-messages-page]");
  if (!root) return;

  const listRoot = root.querySelector("[data-chat-list]");
  const threadRoot = root.querySelector("[data-chat-thread]");
  const storageKey = window.AdlercodeChat?.storageKey || "adlercode-chats-v1";
  const params = new URLSearchParams(window.location.search);
  let activeChatId = params.get("chat") || "";

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function loadStore() {
    if (window.AdlercodeChat?.load) return window.AdlercodeChat.load();
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{"chats":{}}');
    } catch {
      return { chats: {} };
    }
  }

  function saveStore(store) {
    if (window.AdlercodeChat?.save) {
      window.AdlercodeChat.save(store);
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(store));
  }

  function currentUser() {
    return window.AdlercodeAuth?.currentUser?.() || null;
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  }

  function visibleChats(store, user) {
    return Object.values(store.chats || {})
      .filter((chat) => chat.participantIds?.includes(user.id))
      .filter((chat) => !(chat.deletedFor || []).includes(user.id))
      .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  }

  function otherParticipant(chat, user) {
    const otherId = (chat.participantIds || []).find((id) => id !== user.id);
    return chat.participants?.[otherId] || { username: "Adlercode Nutzer", avatarInitial: "A" };
  }

  function lastMessage(chat) {
    return (chat.messages || []).at(-1);
  }

  function renderLoginGate() {
    listRoot.innerHTML = "";
    threadRoot.innerHTML = `
      <div class="messages-empty messages-login-gate">
        <p>Bitte melde dich an oder registriere dich, um Nachrichten zu senden.</p>
        <div class="messages-login-actions">
          <button type="button" data-message-login>Anmelden</button>
          <button type="button" data-message-register>Registrieren</button>
        </div>
      </div>
    `;
  }

  function markChatRead(chat, user, store) {
    if (!chat || !user?.id) return false;
    let changed = false;
    chat.messages = (chat.messages || []).map((message) => {
      if (message.senderId === user.id || (message.readBy || []).includes(user.id)) return message;
      changed = true;
      return { ...message, readBy: [...(message.readBy || []), user.id] };
    });
    if (changed) {
      store.chats[chat.id] = chat;
      saveStore(store);
      document.dispatchEvent(new CustomEvent("adlercode:chats-change"));
    }
    return changed;
  }

  function renderList(chats, user) {
    if (!chats.length) {
      listRoot.innerHTML = `
        <div class="messages-empty compact">
          <p>Noch keine Unterhaltungen vorhanden.</p>
        </div>
      `;
      return;
    }

    if (!activeChatId || !chats.some((chat) => chat.id === activeChatId)) {
      activeChatId = chats[0].id;
    }

    listRoot.innerHTML = chats
      .map((chat) => {
        const participant = otherParticipant(chat, user);
        const message = lastMessage(chat);
        return `
          <button type="button" class="messages-conversation ${chat.id === activeChatId ? "is-active" : ""}" data-chat-id="${escapeHtml(chat.id)}">
            <span class="messages-avatar">${escapeHtml(participant.avatarInitial || "A")}</span>
            <span>
              <strong>${escapeHtml(participant.username || participant.name || "Adlercode Nutzer")}</strong>
              <small>${escapeHtml(message?.text || chat.context?.filmTitle || "Neue Unterhaltung")}</small>
            </span>
            <time>${escapeHtml(formatDate(message?.createdAt || chat.updatedAt))}</time>
          </button>
        `;
      })
      .join("");
  }

  function renderThread(chat, user) {
    if (!chat) {
      threadRoot.innerHTML = `
        <div class="messages-empty">
          <p>Wähle eine Unterhaltung aus.</p>
        </div>
      `;
      return;
    }

    const participant = otherParticipant(chat, user);
    const blocked = (chat.blockedBy || []).includes(user.id);
    const messages = chat.messages || [];
    threadRoot.innerHTML = `
      <header class="messages-thread-head">
        <div class="messages-avatar large">${escapeHtml(participant.avatarInitial || "A")}</div>
        <div>
          <h2>${escapeHtml(participant.username || participant.name || "Adlercode Nutzer")}</h2>
          ${chat.context?.filmTitle ? `<p>${escapeHtml(chat.context.filmTitle)}${chat.context.characterName ? ` · ${escapeHtml(chat.context.characterName)}` : ""}</p>` : ""}
        </div>
      </header>

      <div class="messages-thread-actions" aria-label="Chat-Sicherheit">
        <button type="button" data-chat-block>${blocked ? "Blockierung aufheben" : "Nutzer blockieren"}</button>
        <button type="button" data-chat-report>Nachricht melden</button>
        <button type="button" data-chat-delete>Chat löschen</button>
      </div>

      <div class="messages-history">
        ${messages.length
          ? messages
              .map(
                (message) => `
                  <article class="messages-bubble ${message.senderId === user.id ? "is-own" : ""}" data-message-id="${escapeHtml(message.id)}">
                    <strong>${message.senderId === user.id ? "Du" : escapeHtml(participant.username || "Nutzer")}</strong>
                    <p>${escapeHtml(message.text)}</p>
                    <time>${escapeHtml(formatDate(message.createdAt))}</time>
                  </article>
                `
              )
              .join("")
          : `<div class="messages-empty compact"><p>Noch keine Nachrichten. Beginne den Austausch über diese Analyse.</p></div>`}
      </div>

      <form class="messages-compose" data-chat-compose>
        <input type="text" name="message" placeholder="${blocked ? "Chat ist blockiert" : "Nachricht schreiben ..."}" ${blocked ? "disabled" : ""} />
        <button type="submit" ${blocked ? "disabled" : ""}>Senden</button>
      </form>
    `;
  }

  function render() {
    const user = currentUser();
    if (!user) {
      renderLoginGate();
      return;
    }

    const store = loadStore();
    const chats = visibleChats(store, user);
    renderList(chats, user);
    const activeChat = chats.find((chat) => chat.id === activeChatId);
    if (activeChat) markChatRead(activeChat, user, store);
    renderThread(chats.find((chat) => chat.id === activeChatId), user);
  }

  listRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chat-id]");
    if (!button) return;
    activeChatId = button.dataset.chatId || "";
    render();
  });

  threadRoot.addEventListener("click", (event) => {
    const user = currentUser();
    if (!user) {
      if (event.target.closest("[data-message-login]")) window.AdlercodeAuth?.open?.("login");
      if (event.target.closest("[data-message-register]")) window.AdlercodeAuth?.open?.("register");
      return;
    }

    const store = loadStore();
    const chat = store.chats?.[activeChatId];
    if (!chat) return;

    if (event.target.closest("[data-chat-block]")) {
      const blockedBy = new Set(chat.blockedBy || []);
      if (blockedBy.has(user.id)) blockedBy.delete(user.id);
      else blockedBy.add(user.id);
      chat.blockedBy = [...blockedBy];
      chat.updatedAt = new Date().toISOString();
      saveStore(store);
      document.dispatchEvent(new CustomEvent("adlercode:chats-change"));
      render();
      return;
    }

    if (event.target.closest("[data-chat-report]")) {
      const last = lastMessage(chat);
      chat.reportedMessages = [
        ...new Set([...(chat.reportedMessages || []), last?.id || `chat-${Date.now()}`]),
      ];
      saveStore(store);
      document.dispatchEvent(new CustomEvent("adlercode:chats-change"));
      render();
      return;
    }

    if (event.target.closest("[data-chat-delete]")) {
      if (!window.confirm("Diesen Chat aus deiner Übersicht entfernen?")) return;
      chat.deletedFor = [...new Set([...(chat.deletedFor || []), user.id])];
      saveStore(store);
      document.dispatchEvent(new CustomEvent("adlercode:chats-change"));
      activeChatId = "";
      render();
    }
  });

  threadRoot.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target.closest("[data-chat-compose]");
    const user = currentUser();
    if (!form || !user) return;

    const input = form.elements.message;
    const text = String(input.value || "").trim();
    if (!text) return;

    const store = loadStore();
    const chat = store.chats?.[activeChatId];
    if (!chat || (chat.blockedBy || []).includes(user.id)) return;

    const now = new Date().toISOString();
    chat.messages = [
      ...(chat.messages || []),
      {
        id: `msg-${Date.now()}`,
        senderId: user.id,
        text,
        createdAt: now,
        status: "sent",
        reportStatus: "none",
        readBy: [user.id],
      },
    ];
    chat.updatedAt = now;
    saveStore(store);
    document.dispatchEvent(new CustomEvent("adlercode:chats-change"));
    form.reset();
    render();
  });

  document.addEventListener("adlercode:auth-change", render);
  render();
})();

(() => {
  const data = window.ADLERCODE_PLATFORM_DATA;
  const cards = [...document.querySelectorAll(".book-library-card")];
  if (!data || !cards.length) return;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function textOf(card) {
    return [
      card.querySelector("h2")?.textContent || "",
      ...[...card.querySelectorAll(".book-library-tags span")].map((tag) => tag.textContent || ""),
    ].join(" ").toLowerCase();
  }

  function matches(item, source) {
    const target = [item.titel, item.name, item.beschreibung, item.fachgebiet, item.kategorie, ...(item.tags || []), ...(item.themen || [])].join(" ").toLowerCase();
    return source.split(/\s+/).filter((part) => part.length > 4).some((part) => target.includes(part));
  }

  function group(title, items) {
    if (!items.length) return "";
    return `
      <div class="book-network-group">
        <strong>${escapeHtml(title)}</strong>
        <span>${items.slice(0, 3).map((item) => escapeHtml(item.titel || item.name || item.problem || item.frage)).join(" · ")}</span>
      </div>
    `;
  }

  cards.forEach((card) => {
    const source = textOf(card);
    const resources = data.resources.filter((item) => item.typ !== "Buch" && matches(item, source));
    const tools = data.tools.filter((item) => matches(item, source));
    const experts = data.experts.filter((item) => matches(item, source));
    const projects = data.projects.filter((item) => matches(item, source));
    const discussions = data.communityPosts.filter((item) => matches(item, source));
    if (!(resources.length || tools.length || experts.length || projects.length || discussions.length)) return;
    const root = document.createElement("section");
    root.className = "book-network";
    root.innerHTML = `
      <h3>Passende Inhalte</h3>
      ${group("Verwandte Ressourcen", resources)}
      ${group("Passende Werkzeuge", tools)}
      ${group("Passende Experten", experts)}
      ${group("Verwandte Projekte", projects)}
      ${group("Diskussionen", discussions)}
    `;
    card.querySelector(".book-library-content")?.append(root);
  });
})();

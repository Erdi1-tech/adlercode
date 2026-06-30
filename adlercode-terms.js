(() => {
  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const categories = {
    Adlercode: "Adlercode ist ein Framework zur Analyse von Mustern, Systemen, Narrativen und Personenprofilen. Ziel ist es, Zusammenhänge verständlicher zu machen und Klarheit durch strukturierte Modelle zu schaffen.",
    Personen: "Diese Kategorie beschreibt verschiedene Arten von Personen und Gemeinschaften sowie ihre rechtliche und gesellschaftliche Einordnung.",
    Systeme: "Diese Kategorie beschreibt die grundlegenden Systemmodelle des Adlercode-Frameworks und deren Eigenschaften.",
    Personenprofile: "Diese Kategorie beschreibt Persönlichkeitsprogramme und wiederkehrende Verhaltensmuster, die zur Analyse von Personen verwendet werden.",
    Moral: "Diese Kategorie beschreibt die moralischen Modelle des Adlercode-Frameworks und ihre Einordnung.",
    Identität: "Diese Kategorie beschreibt Identität, Rollen und Programmwechsel innerhalb des Adlercode-Frameworks.",
    Wahrnehmung: "Diese Kategorie beschreibt Wahrnehmungsfilter und deren Einfluss auf Denken, Interpretation und Verhalten.",
    Narrative: "Diese Kategorie beschreibt Geschichten, Perspektiven und Narrative sowie deren Einfluss auf Wahrnehmung und Systeme.",
    Analyse: "Diese Kategorie beschreibt die Analysewerkzeuge des Adlercode-Frameworks zur Untersuchung von Mustern, Rollen und Systemen.",
    Gewalt: "Diese Kategorie beschreibt verschiedene Formen von Gewalt und deren Einordnung innerhalb des Adlercode-Frameworks.",
  };

  const definitions = {
    "Natürliche Person": "Eine natürliche Person ist ein einzelner Mensch mit eigenen Rechten, Pflichten und Verantwortung.",
    "Juristische Person": "Eine juristische Person ist eine rechtlich anerkannte Organisation oder Einrichtung, die unabhängig von einzelnen Menschen Rechte und Pflichten besitzen kann.",
    Einzelperson: "Eine Einzelperson handelt eigenständig und trägt die Verantwortung für ihre eigenen Entscheidungen und Handlungen.",
    Gemeinschaft: "Eine Gemeinschaft besteht aus mehreren Personen, die gemeinsame Ziele, Interessen oder Strukturen miteinander teilen.",
    Adlersystem: "Das Adlersystem beschreibt ein Modell, das auf Eigenverantwortung, Klarheit, langfristiger Entwicklung und natürlicher Ordnung basiert.",
    Schlangensystem: "Das Schlangensystem beschreibt ein Modell, das überwiegend auf Status, Kontrolle, Anpassung und kurzfristigen Vorteilen basiert.",
    "NPC-System": "Das NPC-System dient als Analysemodell für wiederkehrende Programme, Rollen und Verhaltensmuster innerhalb von Personen und Systemen.",
    Empath: "Ein Empath beschreibt ein Personenprofil, das überwiegend durch Mitgefühl, Verantwortung und Rücksicht geprägt ist.",
    Narzisst: "Ein Narzisst beschreibt ein Personenprofil, das überwiegend auf Selbstbild, Anerkennung, Status und Überlegenheit ausgerichtet ist.",
    Psychopath: "Ein Psychopath beschreibt ein Personenprofil, das überwiegend durch emotionale Distanz, Kontrolle und strategisches Handeln geprägt ist.",
    Covert: "Ein Covert beschreibt ein Personenprofil, das überwiegend indirekt, verdeckt und über subtile Einflussnahme wirkt.",
    "NPC-Programme": "NPC-Programme beschreiben wiederkehrende Denk-, Wahrnehmungs- und Verhaltensmuster, die innerhalb des Adlercode-Frameworks analysiert werden.",
    Moralpyramide: "Die Moralpyramide ist ein Modell zur Einordnung moralischer Ebenen und dient als Werkzeug zur Analyse moralischer Orientierung.",
    Sicherheitspyramide: "Die Sicherheitspyramide beschreibt verschiedene Ebenen von Macht, Verantwortung und Schutz innerhalb gesellschaftlicher Strukturen.",
    "Main-ID": "Die Main-ID beschreibt die grundlegende und langfristig dominante Identität oder Persönlichkeit eines Menschen.",
    "Masken-ID": "Die Masken-ID beschreibt Rollen oder Verhaltensweisen, die situationsabhängig nach außen gezeigt werden.",
    Programmwechsel: "Ein Programmwechsel beschreibt den Übergang von einem Verhaltens- oder Denkprogramm in ein anderes.",
    Filter: "Ein Filter beeinflusst, wie Informationen wahrgenommen, bewertet und interpretiert werden.",
    "NPC-Filter": "Der NPC-Filter beschreibt Wahrnehmungs- und Denkfilter, die bestimmte Programme oder Verhaltensmuster verstärken.",
    Wahrnehmung: "Wahrnehmung beschreibt den Prozess, Informationen aus der Umwelt aufzunehmen und zu interpretieren.",
    Realität: "Realität beschreibt die Gesamtheit der tatsächlichen Gegebenheiten, unabhängig von ihrer individuellen Wahrnehmung oder Interpretation.",
    Narrativ: "Ein Narrativ ist eine Geschichte oder Deutung, durch die Ereignisse erklärt und eingeordnet werden.",
    Narrativkontrolle: "Narrativkontrolle beschreibt den Einfluss auf Geschichten, Deutungen und Perspektiven, durch die Menschen Ereignisse verstehen.",
    "NPC-Narrative": "NPC-Narrative beschreiben wiederkehrende Geschichten und Perspektiven, die typische Programme und Verhaltensmuster widerspiegeln.",
    Rollenspiel: "Rollenspiel beschreibt das bewusste oder unbewusste Einnehmen einer bestimmten sozialen Rolle.",
    Rollenwechsel: "Ein Rollenwechsel beschreibt den Übergang von einer sozialen oder psychologischen Rolle in eine andere.",
    Musteranalyse: "Die Musteranalyse untersucht wiederkehrende Strukturen, Zusammenhänge und Verhaltensweisen.",
    Rollenanalyse: "Die Rollenanalyse untersucht die Funktionen, Aufgaben und Dynamiken verschiedener Rollen.",
    Systemanalyse: "Die Systemanalyse untersucht Aufbau, Dynamik und Wechselwirkungen innerhalb eines Systems.",
    Narrativanalyse: "Die Narrativanalyse untersucht Perspektiven, Werte und Botschaften, die durch Geschichten und Erzählungen vermittelt werden.",
    Naturgewalt: "Naturgewalt beschreibt Kräfte und Einwirkungen, die unmittelbar aus natürlichen Prozessen entstehen.",
    "Systemische Gewalt": "Systemische Gewalt beschreibt Schäden oder Benachteiligungen, die durch Strukturen, Regeln oder Organisationen entstehen.",
    "Natürliche Gewalt": "Natürliche Gewalt beschreibt unmittelbare Kräfte oder Konflikte, die ohne künstliche Steuerung oder institutionelle Einwirkung entstehen.",
    Zwangsgewalt: "Zwangsgewalt beschreibt den Einsatz von Druck oder Macht, um Verhalten gegen den eigenen Willen zu erzwingen.",
  };

  const aliases = {
    "Adler-System": "Adlersystem",
    Adlerlogik: "Adlersystem",
    Schlangenlogik: "Schlangensystem",
    "Covert-Programm": "Covert",
    "NPC-Programm": "NPC-Programme",
    "NPC-Programmanalyse": "NPC-Programme",
    Moralanalyse: "Moralpyramide",
    "Psychopath-System": "Psychopath",
    Covertsystem: "Covert",
    "Adler-Perspektive": "Adlersystem",
    "Empathen-Perspektive": "Empath",
    "Narzissten-Perspektive": "Narzisst",
    "Psychopathen-Perspektive": "Psychopath",
    "Covert-Perspektive": "Covert",
    Identität: "Main-ID",
    Moral: "Moralpyramide",
    Programme: "NPC-Programme",
    Filteranalyse: "Filter",
  };

  function canonicalTitle(value) {
    const title = String(value || "").trim();
    return definitions[title] ? title : aliases[title] || title;
  }

  function has(value) {
    return Boolean(definitions[canonicalTitle(value)] || categories[canonicalTitle(value)]);
  }

  function get(value) {
    const title = canonicalTitle(value);
    return definitions[title]
      ? { title, definition: definitions[title], id: slug(title) }
      : categories[title]
        ? { title, definition: categories[title], id: "bereich-" + slug(title) }
        : null;
  }

  function libraryHref(value) {
    const term = get(value);
    if (!term) return "";
    const currentPath = window.location.pathname;
    const base = currentPath.includes("/musterbibliothek/") ? "./" : "../musterbibliothek/";
    return `${base}?term=${encodeURIComponent(term.id)}`;
  }

  function renderLink(value, className = "adlercode-term-link") {
    const href = libraryHref(value);
    const label = String(value || "");
    return href ? `<a class="${className}" href="${href}">${escapeHtml(label)}</a>` : escapeHtml(label);
  }

  function linkElement(element) {
    if (!element || element.querySelector("a")) return;
    const label = element.dataset.term || element.textContent.trim();
    const href = libraryHref(label);
    if (!href) return;
    const link = document.createElement("a");
    link.className = "adlercode-term-link";
    link.href = href;
    link.textContent = element.textContent;
    element.textContent = "";
    element.append(link);
  }

  function linkify(root = document) {
    root.querySelectorAll("[data-adlercode-term]").forEach(linkElement);
    root.querySelectorAll(".book-library-tags span, .film-info-box li").forEach(linkElement);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  window.ADLERCODE_TERMS = {
    aliases,
    categories,
    definitions,
    canonicalTitle,
    get,
    has,
    libraryHref,
    linkify,
    renderLink,
    slug,
  };

  document.addEventListener("DOMContentLoaded", () => linkify());
})();

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
    Adlercode: "Adlercode ist ein Framework zur Analyse von Mustern, Systemen, Narrativen und Personenprofilen. Ziel ist es, wiederkehrende Strukturen sichtbar zu machen und dadurch mehr Klarheit in komplexe Situationen zu bringen. Adlercode dient als Wissens- und Analysemodell, nicht als starre Wahrheit.",
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
    Adlercode: "Adlercode ist ein Framework zur Analyse von Mustern, Systemen, Narrativen und Personenprofilen. Ziel ist es, wiederkehrende Strukturen sichtbar zu machen und dadurch mehr Klarheit in komplexe Situationen zu bringen. Adlercode dient als Wissens- und Analysemodell, nicht als starre Wahrheit.",
    "Natürliche Person": "Eine natürliche Person ist ein einzelner Mensch mit eigenen Rechten, Pflichten und Verantwortung.",
    "Juristische Person": "Eine juristische Person ist eine rechtlich anerkannte Organisation oder Einrichtung, die unabhängig von einzelnen Menschen Rechte und Pflichten besitzen kann.",
    Einzelperson: "Eine Einzelperson handelt eigenständig und trägt die Verantwortung für ihre eigenen Entscheidungen und Handlungen.",
    Gemeinschaft: "Eine Gemeinschaft besteht aus mehreren Personen, die gemeinsame Ziele, Interessen oder Strukturen miteinander teilen.",
    Adlersystem: "Das Adlersystem beschreibt ein System, das auf Eigenverantwortung, Klarheit, Entwicklung und natürlicher Ordnung basiert. Es steht für Strukturen, in denen Wahrnehmung, Entscheidung und Handlung bewusst miteinander verbunden werden.",
    Schlangensystem: "Das Schlangensystem beschreibt ein System, das überwiegend auf Kontrolle, Status, Anpassung und verdeckten Vorteilen basiert. Es dient im Adlercode als Gegenmodell zum Adlersystem.",
    "NPC-System": "Das NPC-System beschreibt wiederkehrende Programme, Rollen und Verhaltensmuster, die in Personen und Systemen sichtbar werden können. Es dient dazu, Muster wie Nachahmung, Rollenwechsel, Manipulation und fremdgesteuerte Dynamiken zu analysieren.",
    Empath: "Ein Empath beschreibt ein Personenprofil, das stark durch Mitgefühl, Verantwortung und emotionale Wahrnehmung geprägt ist. Im Adlercode wird der Empath als Rolle verstanden, die häufig viel wahrnimmt, trägt und auf Verbindung ausgerichtet ist.",
    Narzisst: "Ein Narzisst beschreibt ein Personenprofil, das stark auf Selbstbild, Anerkennung, Status und Überlegenheit ausgerichtet ist. Im Adlercode wird dieses Muster zur Analyse von Dominanz, Selbstaufwertung und Abwertung anderer verwendet.",
    Psychopath: "Ein Psychopath beschreibt ein Personenprofil, das durch emotionale Distanz, Kontrolle, strategisches Handeln und geringe Bindung geprägt ist. Im Adlercode wird dieses Muster genutzt, um kalte, berechnende und instrumentelle Dynamiken zu analysieren.",
    Covert: "Covert beschreibt ein verdecktes Personenprofil, das indirekt, subtil und häufig über Opferrolle, Schuld, Verwirrung oder versteckte Kontrolle wirkt. Im Adlercode steht Covert für schwer erkennbare Einfluss- und Manipulationsmuster.",
    "NPC-Programme": "NPC-Programme beschreiben wiederkehrende Denk-, Wahrnehmungs- und Verhaltensmuster, die innerhalb des Adlercode-Frameworks analysiert werden.",
    Moralpyramide: "Die Moralpyramide ist ein Modell zur Einordnung moralischer Ebenen innerhalb des Adlercode-Frameworks. Sie dient dazu, moralische Haltungen, Verantwortung, Täuschung und opportunistisches Verhalten vergleichbar zu machen.",
    Sicherheitspyramide: "Die Sicherheitspyramide beschreibt Ebenen von Schutz, Macht, Verantwortung und Stabilität. Sie dient als Ergänzung zur Moralpyramide und hilft dabei, Sicherheit und Kontrolle innerhalb von Systemen einzuordnen.",
    "Main-ID": "Die Main-ID beschreibt die grundlegende und langfristig dominante Identität einer Person. Sie steht für den inneren Kern, aus dem Wahrnehmung, Verhalten und Entscheidungen überwiegend entstehen.",
    "Masken-ID": "Die Masken-ID beschreibt eine nach außen gezeigte Rolle oder Identität, die situationsabhängig eingesetzt wird. Sie kann Schutz, Anpassung, Täuschung oder soziale Funktion erfüllen.",
    Programmwechsel: "Ein Programmwechsel beschreibt den Übergang von einem Denk-, Wahrnehmungs- oder Verhaltensprogramm in ein anderes. Im Adlercode wird damit erklärt, wie Menschen zwischen Rollen, Strategien und Reaktionsmustern wechseln können.",
    Filter: "Ein Filter beeinflusst, wie Informationen wahrgenommen, bewertet und interpretiert werden. Filter bestimmen, welche Aspekte einer Situation sichtbar werden und welche ausgeblendet bleiben.",
    "NPC-Filter": "Der NPC-Filter ist ein Analysewerkzeug zur Erkennung wiederkehrender Programme, Rollen und Muster. Er richtet den Fokus weg von Worten und Inszenierungen hin zu Verhalten, Wiederholung und Struktur.",
    Wahrnehmung: "Wahrnehmung beschreibt den Prozess, durch den Informationen aus der Umwelt aufgenommen, gefiltert und interpretiert werden. Im Adlercode ist Wahrnehmung zentral, weil sie bestimmt, welche Muster erkannt oder übersehen werden.",
    Realität: "Realität beschreibt die tatsächlichen Gegebenheiten unabhängig davon, wie sie individuell wahrgenommen oder interpretiert werden. Adlercode unterscheidet zwischen Realität, Wahrnehmung und Narrativ.",
    Narrativ: "Ein Narrativ ist eine Geschichte oder Deutung, durch die Ereignisse erklärt und eingeordnet werden. Narrative beeinflussen, welche Rollen, Ursachen und Bedeutungen einer Situation zugeschrieben werden.",
    Narrativkontrolle: "Narrativkontrolle beschreibt den Einfluss auf Geschichten, Deutungen und Perspektiven. Wer das Narrativ kontrolliert, beeinflusst, wie Ereignisse verstanden und bewertet werden.",
    "NPC-Narrative": "NPC-Narrative beschreiben wiederkehrende Geschichten und Perspektiven, die typische NPC-Programme stützen oder rechtfertigen. Sie können Rollen verschieben, Verantwortung verlagern oder Wahrnehmung verzerren.",
    Rollenspiel: "Rollenspiel beschreibt das bewusste oder unbewusste Einnehmen einer bestimmten sozialen oder psychologischen Rolle. Im Adlercode wird untersucht, welche Funktion eine Rolle innerhalb eines Systems erfüllt.",
    Rollenwechsel: "Ein Rollenwechsel beschreibt den Übergang von einer Rolle in eine andere. Er kann bewusst, strategisch oder reaktiv erfolgen und verändert die Dynamik zwischen Personen oder Gruppen.",
    Musteranalyse: "Musteranalyse untersucht wiederkehrende Strukturen, Abläufe und Verhaltensweisen. Ziel ist es, einzelne Ereignisse nicht isoliert zu betrachten, sondern ihre dahinterliegenden Wiederholungen zu erkennen.",
    Rollenanalyse: "Rollenanalyse untersucht, welche Funktion eine Person, Figur oder Gruppe innerhalb eines Systems übernimmt. Dabei geht es nicht nur darum, was jemand tut, sondern welche Rolle dadurch stabilisiert wird.",
    Systemanalyse: "Systemanalyse untersucht Aufbau, Regeln, Dynamiken und Wechselwirkungen innerhalb eines Systems. Sie fragt, welche Strukturen Verhalten fördern, begrenzen oder erzwingen.",
    Narrativanalyse: "Narrativanalyse untersucht, welche Perspektiven, Werte und Botschaften durch Geschichten vermittelt werden. Sie hilft dabei zu erkennen, welches Weltbild ein Film, Text, System oder Ereignis transportiert.",
    Naturgewalt: "Naturgewalt beschreibt Kräfte und Einwirkungen, die aus natürlichen Prozessen entstehen. Im Adlercode steht der Begriff für direkte, ursprüngliche und nicht künstlich verschleierte Kräfte.",
    "Systemische Gewalt": "Systemische Gewalt beschreibt Schäden oder Belastungen, die durch Strukturen, Regeln, Abhängigkeiten oder Organisationen entstehen. Sie wirkt oft indirekt und ist nicht immer an eine einzelne Person gebunden.",
    "Natürliche Gewalt": "Natürliche Gewalt beschreibt unmittelbare Kräfte, Konflikte oder Reaktionen, die ohne künstliche Steuerung oder institutionelle Vermittlung entstehen. Sie unterscheidet sich von verdeckter oder systemisch erzeugter Gewalt.",
    Zwangsgewalt: "Zwangsgewalt beschreibt den Einsatz von Druck, Kontrolle oder Macht, um Verhalten gegen den eigenen Willen zu erzwingen. Sie kann direkt, indirekt, psychologisch oder systemisch wirken.",
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

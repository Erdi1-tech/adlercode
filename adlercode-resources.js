(() => {
  const experts = [
    {
      id: "musteranalyse-experte",
      name: "Experte für Musteranalyse",
      fachgebiet: "Musteranalyse",
      beschreibung: "Analysiert wiederkehrende Denk-, Wahrnehmungs- und Verhaltensmuster im Adlercode-Framework.",
      website: "#",
      socialMedia: "LinkedIn",
      ressourcenIds: ["gaslighting-checkliste", "vertrauensradar-arbeitsblatt", "adlercode-muster-modell"],
    },
    {
      id: "kommunikationstrainer",
      name: "Kommunikationstrainer",
      fachgebiet: "Kommunikation",
      beschreibung: "Bereitet Vorlagen und Leitfäden für klare Gespräche, Konfliktklärung und Kommunikationsanalyse vor.",
      website: "#",
      socialMedia: "LinkedIn",
      ressourcenIds: ["kommunikationsmuster-vorlage", "experteninterview-manipulation", "vertriebsleitfaden-anfaenger"],
    },
    {
      id: "business-coach",
      name: "Business Coach",
      fachgebiet: "Business",
      beschreibung: "Fokussiert auf digitale Produkte, Positionierung, Vertrieb, Finanzübersicht und einfache Projektplanung.",
      website: "#",
      socialMedia: "Website",
      ressourcenIds: ["businessplan-basis", "pitch-deck-struktur", "marketing-checkliste-digitale-produkte", "finanzuebersicht-projekte"],
    },
    {
      id: "rechtsberater",
      name: "Rechtsberater",
      fachgebiet: "Recht",
      beschreibung: "Bereitet rechtliche Grundlagen, Vertragsmuster und Orientierungshilfen für Selbstständige und kleine Projekte vor.",
      website: "#",
      socialMedia: "Website",
      ressourcenIds: ["rechtliche-grundlagen-selbststaendige", "kooperationsvertrag-muster"],
    },
    {
      id: "projektmentor",
      name: "Projektmentor",
      fachgebiet: "Projektaufbau",
      beschreibung: "Begleitet frühe Projekte von der Idee über Struktur, Rollen, Ressourcen und erste Umsetzungsschritte.",
      website: "#",
      socialMedia: "LinkedIn",
      ressourcenIds: ["projektstart-checkliste", "businessplan-basis", "finanzuebersicht-projekte"],
    },
    {
      id: "entscheidungscoach",
      name: "Entscheidungscoach",
      fachgebiet: "Entscheidungen",
      beschreibung: "Hilft bei strukturierten Entscheidungen, Chancen-Risiko-Abwägungen und klaren nächsten Schritten.",
      website: "#",
      socialMedia: "Website",
      ressourcenIds: ["entscheidungsbaum-tool", "vertrauensradar-arbeitsblatt", "kommunikationsmuster-vorlage"],
    },
  ];

  const resources = [
    {
      id: "gaslighting-checkliste",
      titel: "Gaslighting erkennen - Checkliste",
      beschreibung: "Kompakte Checkliste zur Einordnung wiederkehrender Manipulationssignale, Widersprüche und Verunsicherungsstrategien in Gesprächen.",
      typ: "Checkliste",
      kategorie: "Musteranalyse",
      themen: ["Manipulation", "Wahrnehmung", "Grenzen"],
      experte: "musteranalyse-experte",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-12",
      tags: ["Gaslighting", "Manipulation", "Wahrnehmung"],
    },
    {
      id: "kommunikationsmuster-vorlage",
      titel: "Kommunikationsmuster analysieren - Vorlage",
      beschreibung: "Arbeitsvorlage zur strukturierten Beobachtung von Gesprächsmustern, Rollenwechseln, Verantwortung und wiederkehrenden Auslösern.",
      typ: "Vorlage",
      kategorie: "Kommunikation",
      themen: ["Kommunikation", "Rollen", "Verantwortung"],
      experte: "kommunikationstrainer",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-15",
      tags: ["Kommunikation", "Vorlage", "Rollenanalyse"],
    },
    {
      id: "businessplan-basis",
      titel: "Businessplan Basis-Vorlage",
      beschreibung: "Schlichte Struktur für Zielgruppe, Nutzenversprechen, Angebot, Kosten, Umsatzlogik und erste Umsetzungsschritte.",
      typ: "Vorlage",
      kategorie: "Business",
      themen: ["Business", "Planung", "Strategie"],
      experte: "business-coach",
      kostenlosOderKostenpflichtig: "Kostenpflichtig",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: false,
      datum: "2026-05-22",
      tags: ["Businessplan", "Strategie", "Projekt"],
    },
    {
      id: "pitch-deck-struktur",
      titel: "Pitch Deck Struktur",
      beschreibung: "Übersichtliche Folienstruktur für Problem, Lösung, Markt, Angebot, Geschäftsmodell und nächste Schritte.",
      typ: "PDF",
      kategorie: "Business",
      themen: ["Pitch", "Präsentation", "Strategie"],
      experte: "business-coach",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-05-29",
      tags: ["Pitch Deck", "Präsentation", "Business"],
    },
    {
      id: "vertriebsleitfaden-anfaenger",
      titel: "Vertriebsleitfaden für Anfänger",
      beschreibung: "Ein ruhiger Einstieg in Bedarfsklärung, Nutzenargumentation, Einwandbehandlung und klare Abschlussgespräche.",
      typ: "Artikel",
      kategorie: "Vertrieb",
      themen: ["Vertrieb", "Kommunikation", "Angebot"],
      experte: "kommunikationstrainer",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: false,
      datum: "2026-06-02",
      tags: ["Vertrieb", "Gespräch", "Anfänger"],
    },
    {
      id: "experteninterview-manipulation",
      titel: "Experteninterview: Manipulation erkennen",
      beschreibung: "Videointerview über subtile Gesprächsdynamiken, verdeckte Kontrolle und praktische Fragen zur Musteranalyse.",
      typ: "Video",
      kategorie: "Kommunikation",
      themen: ["Manipulation", "Kommunikation", "Covert"],
      experte: "kommunikationstrainer",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-08",
      tags: ["Video", "Manipulation", "Interview"],
    },
    {
      id: "rechtliche-grundlagen-selbststaendige",
      titel: "Rechtliche Grundlagen für Selbstständige",
      beschreibung: "Erste Orientierung zu Impressum, Datenschutz, Vertragsgrundlagen und sauberer Dokumentation für kleine Projekte.",
      typ: "Studie",
      kategorie: "Recht",
      themen: ["Recht", "Selbstständigkeit", "Dokumentation"],
      experte: "rechtsberater",
      kostenlosOderKostenpflichtig: "Kostenpflichtig",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: false,
      datum: "2026-04-18",
      tags: ["Recht", "Selbstständig", "Grundlagen"],
    },
    {
      id: "marketing-checkliste-digitale-produkte",
      titel: "Marketing-Checkliste für digitale Produkte",
      beschreibung: "Praktische Checkliste für Positionierung, Angebot, Zielgruppe, Inhalte, Verkaufsseite und einfache Kampagnenplanung.",
      typ: "Checkliste",
      kategorie: "Marketing",
      themen: ["Marketing", "Digitale Produkte", "Vertrieb"],
      experte: "business-coach",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-20",
      tags: ["Marketing", "Checkliste", "Produkt"],
    },
    {
      id: "vertrauensradar-arbeitsblatt",
      titel: "Vertrauensradar Arbeitsblatt",
      beschreibung: "Arbeitsblatt zur Einschätzung von Vertrauen, Konsistenz, Verantwortung, Grenzen und wiederkehrenden Signalen.",
      typ: "PDF",
      kategorie: "Beziehungen",
      themen: ["Vertrauen", "Beziehungen", "Grenzen"],
      experte: "musteranalyse-experte",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-17",
      tags: ["Vertrauen", "Arbeitsblatt", "Beziehungen"],
    },
    {
      id: "adlercode-muster-modell",
      titel: "Adlercode Muster-Modell Grafik",
      beschreibung: "Grafische Übersicht, wie Muster, Systeme, Narrative, Rollen und Ressourcen im Adlercode-Framework verbunden werden können.",
      typ: "Grafik",
      kategorie: "Musteranalyse",
      themen: ["Adlercode", "Framework", "Systeme"],
      experte: "musteranalyse-experte",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-25",
      tags: ["Adlercode", "Modell", "Grafik"],
    },
    {
      id: "kooperationsvertrag-muster",
      titel: "Kooperationsvertrag Muster",
      beschreibung: "Einfaches Vertragsmuster als Orientierung für Rollen, Leistungen, Vergütung, Laufzeit und Verantwortlichkeiten.",
      typ: "Vertrag",
      kategorie: "Recht",
      themen: ["Kooperation", "Vertrag", "Verantwortung"],
      experte: "rechtsberater",
      kostenlosOderKostenpflichtig: "Kostenpflichtig",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: false,
      datum: "2026-05-11",
      tags: ["Vertrag", "Kooperation", "Recht"],
    },
    {
      id: "finanzuebersicht-projekte",
      titel: "Finanzübersicht für kleine Projekte",
      beschreibung: "Kompaktes Tool zur Planung von Einnahmen, Ausgaben, Reserven, Fixkosten und einfachen Projektszenarien.",
      typ: "Tool",
      kategorie: "Finanzen",
      themen: ["Finanzen", "Planung", "Projekt"],
      experte: "business-coach",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: false,
      datum: "2026-06-04",
      tags: ["Finanzen", "Tool", "Projektplanung"],
    },
  ];

  resources.push(
    {
      id: "projektstart-checkliste",
      titel: "Projektstart-Checkliste",
      beschreibung: "Strukturierte Checkliste für Ziel, Rollen, Ressourcen, Zeitplan und erste Verantwortlichkeiten in neuen Projekten.",
      typ: "Checkliste",
      kategorie: "Business",
      themen: ["Projekt", "Aufbau", "Verantwortung"],
      experte: "projektmentor",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-28",
      tags: ["Projektstart", "Checkliste", "Rollen"],
    },
    {
      id: "entscheidungsbaum-tool",
      titel: "Entscheidungsbaum - Tool",
      beschreibung: "Ein einfaches Tool zur Strukturierung von Optionen, Risiken, Chancen und nächsten Schritten.",
      typ: "Tool",
      kategorie: "Selbstentwicklung",
      themen: ["Entscheidung", "Risiko", "Klarheit"],
      experte: "entscheidungscoach",
      kostenlosOderKostenpflichtig: "Kostenlos",
      sprache: "Deutsch",
      dateiOderLink: "#",
      empfohlen: true,
      datum: "2026-06-30",
      tags: ["Entscheidung", "Tool", "Klarheit"],
    }
  );

  resources.forEach((resource, index) => {
    resource.experteId = resource.experteId || resource.experte || "";
    resource.werkzeugIds = resource.werkzeugIds || [];
    resource.projektIds = resource.projektIds || [];
    resource.loesungsIds = resource.loesungsIds || [];
    resource.entscheidungsIds = resource.entscheidungsIds || [];
    resource.relatedResources = resource.relatedResources || [];
    resource.relatedExperts = resource.relatedExperts || [resource.experteId].filter(Boolean);
    resource.relatedTools = resource.relatedTools || resource.werkzeugIds;
    resource.relatedProjects = resource.relatedProjects || resource.projektIds;
    resource.relatedSolutions = resource.relatedSolutions || resource.loesungsIds;
    resource.relatedDecisions = resource.relatedDecisions || resource.entscheidungsIds;
    resource.relatedDiscussions = resource.relatedDiscussions || [];
    resource.relatedBooks = resource.relatedBooks || [];
    resource.link = resource.link || resource.dateiOderLink || "#";
    resource.bewertung = resource.bewertung || Number((4.1 + ((index % 7) * 0.12)).toFixed(1));
    resource.bewertungenAnzahl = resource.bewertungenAnzahl || 12 + index * 3;
    resource.aufrufe = resource.aufrufe || 180 + index * 47;
    resource.diskussionen = resource.diskussionen || 2 + (index % 6);
    resource.gespeichertAnzahl = resource.gespeichertAnzahl || 24 + index * 5;
    resource.gespeichert = false;
  });

  const tools = [
    {
      id: "musteranalyse-checkliste",
      titel: "Musteranalyse-Checkliste",
      beschreibung: "Hilft dabei, wiederkehrende Signale, Rollen, Trigger und Systemmuster strukturiert festzuhalten.",
      kategorie: "Musteranalyse",
      schwierigkeit: "Einfach",
      dauer: "15 Minuten",
      ressourcenIds: ["gaslighting-checkliste", "adlercode-muster-modell"],
      expertenIds: ["musteranalyse-experte"],
      tags: ["Muster", "Analyse", "Checkliste"],
    },
    {
      id: "vertrauensradar",
      titel: "Vertrauensradar",
      beschreibung: "Bewertet Vertrauen, Klarheit, Konsistenz und Verantwortungsübernahme in Beziehungen oder Projekten.",
      kategorie: "Beziehungen",
      schwierigkeit: "Einfach",
      dauer: "20 Minuten",
      ressourcenIds: ["vertrauensradar-arbeitsblatt"],
      expertenIds: ["musteranalyse-experte", "entscheidungscoach"],
      tags: ["Vertrauen", "Beziehungen", "Klarheit"],
    },
    {
      id: "kommunikationsleitfaden",
      titel: "Kommunikationsleitfaden",
      beschreibung: "Bereitet schwierige Gespräche mit Ziel, Grenzen, Fragen und möglichen Eskalationspunkten vor.",
      kategorie: "Kommunikation",
      schwierigkeit: "Einfach",
      dauer: "25 Minuten",
      ressourcenIds: ["kommunikationsmuster-vorlage", "vertriebsleitfaden-anfaenger"],
      expertenIds: ["kommunikationstrainer"],
      tags: ["Kommunikation", "Gespräch", "Vorbereitung"],
    },
    {
      id: "konfliktanalyse",
      titel: "Konfliktanalyse",
      beschreibung: "Ordnet Situation, Beteiligte, Narrative, Verantwortung und mögliche nächste Schritte in Konflikten.",
      kategorie: "Recht",
      schwierigkeit: "Mittel",
      dauer: "35 Minuten",
      ressourcenIds: ["rechtliche-grundlagen-selbststaendige", "kommunikationsmuster-vorlage"],
      expertenIds: ["rechtsberater", "kommunikationstrainer"],
      tags: ["Konflikt", "Rollen", "Verantwortung"],
    },
    {
      id: "businessplan-vorlage",
      titel: "Businessplan-Vorlage",
      beschreibung: "Strukturiert Zielgruppe, Angebot, Nutzen, Kosten, Umsatzlogik und erste Meilensteine.",
      kategorie: "Business",
      schwierigkeit: "Mittel",
      dauer: "60 Minuten",
      ressourcenIds: ["businessplan-basis", "finanzuebersicht-projekte"],
      expertenIds: ["business-coach", "projektmentor"],
      tags: ["Business", "Planung", "Projekt"],
    },
    {
      id: "pitch-deck-tool",
      titel: "Pitch-Deck-Struktur",
      beschreibung: "Hilft bei einer klaren Präsentation von Problem, Lösung, Markt, Modell und nächstem Schritt.",
      kategorie: "Business",
      schwierigkeit: "Mittel",
      dauer: "45 Minuten",
      ressourcenIds: ["pitch-deck-struktur"],
      expertenIds: ["business-coach"],
      tags: ["Pitch", "Präsentation", "Business"],
    },
    {
      id: "entscheidungsbaum",
      titel: "Entscheidungsbaum",
      beschreibung: "Vergleicht Optionen anhand von Chancen, Risiken, Ressourcen, Beteiligten und Konsequenzen.",
      kategorie: "Selbstentwicklung",
      schwierigkeit: "Einfach",
      dauer: "20 Minuten",
      ressourcenIds: ["entscheidungsbaum-tool"],
      expertenIds: ["entscheidungscoach"],
      tags: ["Entscheidung", "Risiko", "Klarheit"],
    },
    {
      id: "finanzuebersicht",
      titel: "Finanzübersicht",
      beschreibung: "Sammelt Einnahmen, Ausgaben, Fixkosten, Reserven und einfache Szenarien für kleine Projekte.",
      kategorie: "Finanzen",
      schwierigkeit: "Einfach",
      dauer: "30 Minuten",
      ressourcenIds: ["finanzuebersicht-projekte"],
      expertenIds: ["business-coach"],
      tags: ["Finanzen", "Projekt", "Planung"],
    },
  ];

  const projects = [
    {
      id: "adlercode-workshop",
      titel: "Adlercode Workshop-Reihe",
      beschreibung: "Eine kleine Workshop-Reihe zur Einführung in Musteranalyse, Kommunikation und Ressourcenarbeit.",
      kategorie: "Education",
      status: "Aufbau",
      gesucht: "Trainer, Organisation, Marketing",
      geboten: "Framework, Inhalte, Community-Zugang",
      ressourcenIds: ["adlercode-muster-modell", "kommunikationsmuster-vorlage"],
      werkzeugIds: ["musteranalyse-checkliste", "kommunikationsleitfaden"],
      expertenIds: ["kommunikationstrainer", "musteranalyse-experte"],
      tags: ["Workshop", "Education", "Community"],
      datum: "2026-06-18",
    },
    {
      id: "business-template-bibliothek",
      titel: "Business Template Bibliothek",
      beschreibung: "Sammlung einfacher Vorlagen für Businessplan, Pitch, Finanzen, Projektstart und Vertrieb.",
      kategorie: "Business",
      status: "Aktiv",
      gesucht: "Designer, Vertrieb",
      geboten: "Ressourcen, Struktur, Plattform",
      ressourcenIds: ["businessplan-basis", "pitch-deck-struktur", "finanzuebersicht-projekte"],
      werkzeugIds: ["businessplan-vorlage", "pitch-deck-tool", "finanzuebersicht"],
      expertenIds: ["business-coach", "projektmentor"],
      tags: ["Templates", "Business", "Tools"],
      datum: "2026-06-21",
    },
    {
      id: "konfliktklarheit",
      titel: "Konfliktklarheit",
      beschreibung: "Projekt zur Entwicklung einfacher Konfliktanalyse-Werkzeuge für Teams und Selbstständige.",
      kategorie: "Recht",
      status: "Suche Mitgründer",
      gesucht: "Mediation, Recht, Produktdesign",
      geboten: "Analysemodell, Demo-Fälle, Plattform",
      ressourcenIds: ["rechtliche-grundlagen-selbststaendige", "kooperationsvertrag-muster"],
      werkzeugIds: ["konfliktanalyse", "kommunikationsleitfaden"],
      expertenIds: ["rechtsberater", "kommunikationstrainer"],
      tags: ["Konflikt", "Mediation", "Justice"],
      datum: "2026-06-23",
    },
    {
      id: "vertrauensradar-app",
      titel: "Vertrauensradar App",
      beschreibung: "Leichte App-Idee zur Einschätzung von Vertrauen, Grenzen und Beziehungsmustern.",
      kategorie: "Relationships",
      status: "Idee",
      gesucht: "Entwickler, UX",
      geboten: "Modell, Checkliste, Testfälle",
      ressourcenIds: ["vertrauensradar-arbeitsblatt"],
      werkzeugIds: ["vertrauensradar", "entscheidungsbaum"],
      expertenIds: ["musteranalyse-experte", "entscheidungscoach"],
      tags: ["Vertrauen", "App", "Beziehungen"],
      datum: "2026-06-25",
    },
    {
      id: "adlercode-expertennetzwerk",
      titel: "Adlercode Expertennetzwerk",
      beschreibung: "Aufbau eines kuratierten Netzwerks aus Fachpersonen für Ressourcen, Tools, Analysen und Projekte.",
      kategorie: "Experten",
      status: "Aufbau",
      gesucht: "Fachpersonen, Kuratoren",
      geboten: "Plattform, Profile, Ressourcenbank",
      ressourcenIds: ["experteninterview-manipulation"],
      werkzeugIds: ["kommunikationsleitfaden"],
      expertenIds: ["musteranalyse-experte", "business-coach", "rechtsberater"],
      tags: ["Experten", "Netzwerk", "Plattform"],
      datum: "2026-06-27",
    },
    {
      id: "entscheidungshilfe-gruenden",
      titel: "Entscheidungshilfe Gründen",
      beschreibung: "Projekt zur Entwicklung einer strukturierten Entscheidungshilfe für Gründer und Projektstarter.",
      kategorie: "Business",
      status: "Suche Investor",
      gesucht: "Investor, Business Coach, Entwickler",
      geboten: "Konzept, Inhalte, erste Tools",
      ressourcenIds: ["entscheidungsbaum-tool", "businessplan-basis"],
      werkzeugIds: ["entscheidungsbaum", "businessplan-vorlage"],
      expertenIds: ["entscheidungscoach", "business-coach"],
      tags: ["Gründung", "Entscheidung", "Business"],
      datum: "2026-06-30",
    },
  ];

  const solutions = [
    {
      id: "konflikte-im-team-loesen",
      problem: "Konflikte im Team lösen",
      beschreibung: "Strukturiert Rollen, Narrative, Verantwortung und nächste Schritte, ohne vorschnell Schuld zu verteilen.",
      kategorie: "Kommunikation",
      schritte: ["Situation sauber beschreiben", "Beteiligte und Rollen trennen", "Narrative vergleichen", "Nächsten Klärungsschritt festlegen"],
      ressourcenIds: ["kommunikationsmuster-vorlage", "rechtliche-grundlagen-selbststaendige"],
      werkzeugIds: ["konfliktanalyse", "kommunikationsleitfaden"],
      expertenIds: ["kommunikationstrainer", "rechtsberater"],
      projektIds: ["konfliktklarheit"],
      tags: ["Konflikt", "Team", "Verantwortung"],
    },
    {
      id: "manipulation-erkennen",
      problem: "Manipulation erkennen",
      beschreibung: "Hilft, wiederkehrende Verunsicherung, verdeckte Kontrolle und widersprüchliche Kommunikation einzuordnen.",
      kategorie: "Musteranalyse",
      schritte: ["Signale sammeln", "Wiederholungen prüfen", "Grenzen klären", "Ressourcen sichern"],
      ressourcenIds: ["gaslighting-checkliste", "experteninterview-manipulation"],
      werkzeugIds: ["musteranalyse-checkliste", "vertrauensradar"],
      expertenIds: ["musteranalyse-experte", "kommunikationstrainer"],
      projektIds: ["vertrauensradar-app"],
      tags: ["Manipulation", "Muster", "Grenzen"],
    },
    {
      id: "vertrauen-aufbauen",
      problem: "Vertrauen aufbauen",
      beschreibung: "Verbindet Konsistenz, klare Kommunikation, Verantwortungsübernahme und realistische Erwartungen.",
      kategorie: "Beziehungen",
      schritte: ["Vertrauenssignale prüfen", "Grenzen sichtbar machen", "Verantwortung konkretisieren", "Entwicklung beobachten"],
      ressourcenIds: ["vertrauensradar-arbeitsblatt"],
      werkzeugIds: ["vertrauensradar", "kommunikationsleitfaden"],
      expertenIds: ["musteranalyse-experte"],
      projektIds: ["vertrauensradar-app"],
      tags: ["Vertrauen", "Beziehungen", "Kommunikation"],
    },
    {
      id: "business-idee-pruefen",
      problem: "Business-Idee prüfen",
      beschreibung: "Ordnet Zielgruppe, Nutzen, Angebot, Kosten und erste Testschritte für digitale Produkte.",
      kategorie: "Business",
      schritte: ["Problem definieren", "Zielgruppe prüfen", "Angebot skizzieren", "Mini-Test planen"],
      ressourcenIds: ["businessplan-basis", "marketing-checkliste-digitale-produkte"],
      werkzeugIds: ["businessplan-vorlage", "entscheidungsbaum"],
      expertenIds: ["business-coach", "entscheidungscoach"],
      projektIds: ["entscheidungshilfe-gruenden"],
      tags: ["Business", "Idee", "Test"],
    },
    {
      id: "produkt-verkaufen",
      problem: "Produkt verkaufen",
      beschreibung: "Verbindet Positionierung, Kommunikation, Vertrieb und einfache Verkaufsstruktur.",
      kategorie: "Vertrieb",
      schritte: ["Nutzen klären", "Einwände sammeln", "Angebot formulieren", "Gespräch vorbereiten"],
      ressourcenIds: ["vertriebsleitfaden-anfaenger", "marketing-checkliste-digitale-produkte"],
      werkzeugIds: ["kommunikationsleitfaden", "pitch-deck-tool"],
      expertenIds: ["kommunikationstrainer", "business-coach"],
      projektIds: ["business-template-bibliothek"],
      tags: ["Vertrieb", "Produkt", "Kommunikation"],
    },
    {
      id: "projekt-starten",
      problem: "Projekt starten",
      beschreibung: "Macht Rollen, Ressourcen, Risiken, Finanzen und nächste Schritte früh sichtbar.",
      kategorie: "Business",
      schritte: ["Ziel definieren", "Rollen klären", "Ressourcen prüfen", "Startplan erstellen"],
      ressourcenIds: ["projektstart-checkliste", "finanzuebersicht-projekte"],
      werkzeugIds: ["finanzuebersicht", "businessplan-vorlage"],
      expertenIds: ["projektmentor", "business-coach"],
      projektIds: ["business-template-bibliothek"],
      tags: ["Projekt", "Start", "Rollen"],
    },
  ];

  const decisions = [
    {
      id: "unternehmen-gruenden",
      frage: "Soll ich ein Unternehmen gründen?",
      chancen: ["Eigenständigkeit", "Skalierbares Angebot", "Lernkurve"],
      risiken: ["Finanzielle Belastung", "Unklare Zielgruppe", "Zeitdruck"],
      ressourcenIds: ["businessplan-basis", "finanzuebersicht-projekte"],
      werkzeugIds: ["businessplan-vorlage", "finanzuebersicht"],
      expertenIds: ["business-coach"],
      naechsteSchritte: ["Mini-Angebot testen", "Kosten prüfen", "Entscheidungsbaum ausfüllen"],
      kategorie: "Business",
      tags: ["Gründung", "Business", "Risiko"],
    },
    {
      id: "projekt-starten-entscheidung",
      frage: "Soll ich ein Projekt starten?",
      chancen: ["Erfahrung sammeln", "Netzwerk aufbauen", "Ressourcen nutzen"],
      risiken: ["Unklare Rollen", "Zu wenig Zeit", "Fehlende Umsetzungskraft"],
      ressourcenIds: ["projektstart-checkliste"],
      werkzeugIds: ["entscheidungsbaum", "businessplan-vorlage"],
      expertenIds: ["projektmentor"],
      naechsteSchritte: ["Ziel formulieren", "Rollen klären", "Startaufwand begrenzen"],
      kategorie: "Projekte",
      tags: ["Projekt", "Entscheidung", "Start"],
    },
    {
      id: "investieren",
      frage: "Soll ich investieren?",
      chancen: ["Beteiligung", "Lernchance", "Wachstum"],
      risiken: ["Kapitalverlust", "Unklare Daten", "Abhängigkeit"],
      ressourcenIds: ["finanzuebersicht-projekte"],
      werkzeugIds: ["finanzuebersicht", "entscheidungsbaum"],
      expertenIds: ["entscheidungscoach", "business-coach"],
      naechsteSchritte: ["Risiko begrenzen", "Zahlen prüfen", "Ausstiegsszenario klären"],
      kategorie: "Finanzen",
      tags: ["Investition", "Risiko", "Finanzen"],
    },
    {
      id: "kooperieren",
      frage: "Soll ich mit jemandem kooperieren?",
      chancen: ["Kompetenzen ergänzen", "Reichweite erhöhen", "Schneller testen"],
      risiken: ["Unklare Verantwortung", "Konflikte", "Abhängigkeit"],
      ressourcenIds: ["kooperationsvertrag-muster", "vertrauensradar-arbeitsblatt"],
      werkzeugIds: ["vertrauensradar", "kommunikationsleitfaden"],
      expertenIds: ["rechtsberater", "entscheidungscoach"],
      naechsteSchritte: ["Rollen schriftlich klären", "Grenzen definieren", "Pilotphase vereinbaren"],
      kategorie: "Business",
      tags: ["Kooperation", "Vertrauen", "Vertrag"],
    },
    {
      id: "produkt-verkaufen-entscheidung",
      frage: "Soll ich ein Produkt verkaufen?",
      chancen: ["Markttest", "Umsatz", "Feedback"],
      risiken: ["Unklare Positionierung", "Falsche Zielgruppe", "Zu früher Launch"],
      ressourcenIds: ["marketing-checkliste-digitale-produkte", "vertriebsleitfaden-anfaenger"],
      werkzeugIds: ["pitch-deck-tool", "kommunikationsleitfaden"],
      expertenIds: ["business-coach", "kommunikationstrainer"],
      naechsteSchritte: ["Nutzen formulieren", "Testgruppe wählen", "Einfaches Angebot erstellen"],
      kategorie: "Marketing",
      tags: ["Produkt", "Vertrieb", "Marketing"],
    },
    {
      id: "experten-kontaktieren",
      frage: "Soll ich einen Experten kontaktieren?",
      chancen: ["Schnellere Klarheit", "Externe Perspektive", "Bessere Struktur"],
      risiken: ["Kosten", "Falscher Experte", "Unklare Frage"],
      ressourcenIds: ["kommunikationsmuster-vorlage"],
      werkzeugIds: ["kommunikationsleitfaden", "entscheidungsbaum"],
      expertenIds: ["entscheidungscoach", "kommunikationstrainer"],
      naechsteSchritte: ["Frage konkret formulieren", "Passendes Fachgebiet wählen", "Erwartung klären"],
      kategorie: "Experten",
      tags: ["Experten", "Kontakt", "Klarheit"],
    },
  ];

  const communityPosts = [
    { id: "muster-heute", titel: "Welches Muster hast du heute erkannt?", typ: "Diskussion", kategorie: "Musteranalyse", beitraege: 18 },
    { id: "ressource-geholfen", titel: "Welche Ressource hat dir geholfen?", typ: "Frage", kategorie: "Ressourcen", beitraege: 11 },
    { id: "naechstes-thema", titel: "Welches Thema soll als Nächstes ausgebaut werden?", typ: "Abstimmung", kategorie: "Plattform", beitraege: 24 },
    { id: "projekt-unterstuetzung", titel: "Wer sucht Unterstützung bei einem Projekt?", typ: "Projektfrage", kategorie: "Projekte", beitraege: 7 },
    { id: "tool-erfahrung", titel: "Erfahrungen mit dem Vertrauensradar", typ: "Erfahrungsbericht", kategorie: "Werkzeuge", beitraege: 9 },
    { id: "business-frage", titel: "Wie prüfst du eine Business-Idee?", typ: "Diskussion", kategorie: "Business", beitraege: 15 },
  ];

  resources.forEach((resource) => {
    resource.werkzeugIds = tools
      .filter((tool) => tool.ressourcenIds.includes(resource.id))
      .map((tool) => tool.id);
    resource.projektIds = projects
      .filter((project) => project.ressourcenIds.includes(resource.id))
      .map((project) => project.id);
    resource.loesungsIds = solutions
      .filter((solution) => solution.ressourcenIds.includes(resource.id))
      .map((solution) => solution.id);
    resource.entscheidungsIds = decisions
      .filter((decision) => decision.ressourcenIds.includes(resource.id))
      .map((decision) => decision.id);
    resource.relatedResources = resources
      .filter((candidate) => candidate.id !== resource.id && (candidate.kategorie === resource.kategorie || candidate.tags.some((tag) => resource.tags.includes(tag))))
      .slice(0, 4)
      .map((candidate) => candidate.id);
    resource.relatedExperts = [
      resource.experteId,
      ...tools.flatMap((tool) => (resource.werkzeugIds.includes(tool.id) ? tool.expertenIds : [])),
      ...solutions.flatMap((solution) => (resource.loesungsIds.includes(solution.id) ? solution.expertenIds : [])),
    ].filter((value, index, list) => value && list.indexOf(value) === index);
    resource.relatedTools = resource.werkzeugIds;
    resource.relatedProjects = resource.projektIds;
    resource.relatedSolutions = resource.loesungsIds;
    resource.relatedDecisions = resource.entscheidungsIds;
    resource.relatedDiscussions = communityPosts
      .filter((post) => post.kategorie === resource.kategorie || resource.tags.some((tag) => post.titel.toLowerCase().includes(tag.toLowerCase())))
      .slice(0, 3)
      .map((post) => post.id);
    resource.relatedBooks = resources
      .filter((candidate) => candidate.typ === "Buch" && candidate.id !== resource.id)
      .slice(0, 3)
      .map((candidate) => candidate.id);
  });

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function expertById(id) {
    return experts.find((expert) => expert.id === id) || null;
  }

  function resourceLabel(resource) {
    return expertById(resource.experteId || resource.experte)?.name || resource.experteId || resource.experte || "Adlercode";
  }

  function resourceIcon(type = "") {
    return {
      Buch: "B",
      Video: "▶",
      PDF: "PDF",
      Vorlage: "V",
      Checkliste: "☑",
      Vertrag: "§",
      Studie: "S",
      Artikel: "✦",
      Grafik: "◇",
      Tool: "⌘",
      Kurs: "K",
      Prompt: "⌁",
    }[type] || "•";
  }

  function getResourcesByIds(ids = []) {
    return resources.filter((resource) => ids.includes(resource.id));
  }

  function getToolsByIds(ids = []) {
    return tools.filter((tool) => ids.includes(tool.id));
  }

  function getProjectsByIds(ids = []) {
    return projects.filter((project) => ids.includes(project.id));
  }

  function getExpertsByIds(ids = []) {
    return experts.filter((expert) => ids.includes(expert.id));
  }

  function getSolutionsByIds(ids = []) {
    return solutions.filter((solution) => ids.includes(solution.id));
  }

  function getDecisionsByIds(ids = []) {
    return decisions.filter((decision) => ids.includes(decision.id));
  }

  function itemTitle(item) {
    return item.titel || item.name || item.problem || item.frage || "Adlercode Eintrag";
  }

  function itemDescription(item) {
    return item.beschreibung || item.fachgebiet || (item.schritte || item.naechsteSchritte || []).join(" · ") || "";
  }

  function renderLinkedList(title, items) {
    if (!items.length) return "";
    return `
      <div class="platform-linked-list">
        <strong>${escapeHtml(title)}</strong>
        <span>${items.map((item) => escapeHtml(itemTitle(item))).join(" · ")}</span>
      </div>
    `;
  }

  function renderPlatformCards(items, container, options = {}) {
    if (!container) return;
    const savedIds = new Set(options.savedIds || []);
    container.innerHTML = items.length
      ? items
          .map((item) => {
            const saved = savedIds.has(`${options.type || "item"}:${item.id}`);
            const actionLabel =
              options.type === "tools"
                ? "Werkzeug öffnen"
                : options.type === "projects"
                  ? "Projekt ansehen"
                  : options.type === "solutions"
                    ? "Lösung ansehen"
                    : options.type === "decisions"
                      ? "Entscheidung ansehen"
                      : "Details ansehen";
            return `
              <article class="platform-object-card" data-platform-object-id="${escapeHtml(item.id)}">
                <div class="resource-card-meta">
                  <span>${escapeHtml(item.kategorie || item.fachgebiet || item.status || options.label || "Adlercode")}</span>
                  ${item.status ? `<span>${escapeHtml(item.status)}</span>` : ""}
                </div>
                <h3>${escapeHtml(itemTitle(item))}</h3>
                <p>${escapeHtml(itemDescription(item))}</p>
                ${renderLinkedList("Ressourcen", getResourcesByIds(item.ressourcenIds || []))}
                ${renderLinkedList("Werkzeuge", getToolsByIds(item.werkzeugIds || []))}
                ${renderLinkedList("Experten", getExpertsByIds(item.expertenIds || []))}
                <div class="resource-tags">
                  ${(item.tags || item.kategorien || []).slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
                </div>
                <div class="resource-card-actions">
                  <button type="button" data-platform-detail="${escapeHtml(item.id)}">${actionLabel}</button>
                  <button type="button" class="${saved ? "is-saved" : ""}" data-platform-save="${escapeHtml(options.type || "item")}:${escapeHtml(item.id)}">${saved ? "Gespeichert" : "Speichern"}</button>
                </div>
              </article>
            `;
          })
          .join("")
      : `<div class="resource-empty"><p>Keine passenden Einträge gefunden.</p></div>`;
  }

  function renderResourceCards(items, container, options = {}) {
    if (!container) return;
    const savedIds = new Set(options.savedIds || []);
    const ratings = options.ratings || {};
    container.innerHTML = items.length
      ? items
          .map((resource) => {
            const saved = savedIds.has(resource.id);
            const local = ratings[resource.id];
            const average = local ? local.value : resource.bewertung;
            const count = local ? resource.bewertungenAnzahl + 1 : resource.bewertungenAnzahl;
            const expert = expertById(resource.experteId || resource.experte);
            return `
              <article class="resource-card${resource.empfohlen ? " is-recommended" : ""}" data-resource-id="${escapeHtml(resource.id)}">
                <div class="resource-card-meta">
                  <span><b aria-hidden="true">${escapeHtml(resourceIcon(resource.typ))}</b>${escapeHtml(resource.typ)}</span>
                  <span>${escapeHtml(resource.kategorie)}</span>
                </div>
                <h3>${escapeHtml(resource.titel)}</h3>
                <p>${escapeHtml(resource.beschreibung)}</p>
                <div class="resource-expert-mini">
                  <span aria-hidden="true">${escapeHtml((expert?.name || resourceLabel(resource)).split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase())}</span>
                  <div>
                    <strong>${escapeHtml(expert?.name || resourceLabel(resource))}</strong>
                    <small>${escapeHtml(expert?.fachgebiet || "Adlercode")}</small>
                  </div>
                </div>
                <dl class="resource-card-facts">
                  <div><dt>Sprache</dt><dd>${escapeHtml(resource.sprache)}</dd></div>
                  <div><dt>Status</dt><dd>${escapeHtml(resource.kostenlosOderKostenpflichtig)}</dd></div>
                  <div><dt>Bewertung</dt><dd>${escapeHtml(average)} / 5 · ${escapeHtml(count)} Bewertungen</dd></div>
                </dl>
                <div class="resource-card-stats" aria-label="Ressourcenkennzahlen">
                  <span>👁 ${escapeHtml(resource.aufrufe)}</span>
                  <span>⭐ ${escapeHtml(average)}</span>
                  <span>💬 ${escapeHtml(resource.diskussionen)}</span>
                  <span>📥 ${escapeHtml(resource.gespeichertAnzahl)}</span>
                  <span>👨 ${escapeHtml((resource.relatedExperts || []).length)}</span>
                  <span>⌘ ${escapeHtml((resource.relatedTools || []).length)}</span>
                </div>
                <div class="resource-rating" aria-label="Ressource bewerten">
                  ${[1, 2, 3, 4, 5]
                    .map((value) => `<button type="button" class="${Number(average) >= value ? "is-active" : ""}" data-resource-rate="${escapeHtml(resource.id)}" data-rating-value="${value}" aria-label="${value} Sterne">★</button>`)
                    .join("")}
                </div>
                <div class="resource-tags">
                  ${resource.tags.slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
                </div>
                <div class="resource-card-actions">
                  <button type="button" data-resource-detail="${escapeHtml(resource.id)}">Details ansehen</button>
                  <button type="button" class="${saved ? "is-saved" : ""}" data-resource-save="${escapeHtml(resource.id)}">${saved ? "Gespeichert" : "Merken"}</button>
                </div>
              </article>
            `;
          })
          .join("")
      : `<div class="resource-empty"><p>Keine passenden Ressourcen gefunden.</p></div>`;
  }

  window.ADLERCODE_RESOURCE_DATA = {
    resources,
    tools,
    experts,
    projects,
    solutions,
    decisions,
    communityPosts,
    categories: ["Musteranalyse", "Kommunikation", "Beziehungen", "Business", "Recht", "Selbstentwicklung", "Marketing", "Vertrieb", "Finanzen"],
    types: ["Buch", "Video", "PDF", "Vorlage", "Checkliste", "Vertrag", "Studie", "Artikel", "Grafik", "Tool", "Kurs", "Prompt"],
    expertById,
    resourceLabel,
    getResourcesByIds,
    getToolsByIds,
    getProjectsByIds,
    getExpertsByIds,
    getSolutionsByIds,
    getDecisionsByIds,
    resourceIcon,
    renderResourceCards,
    renderPlatformCards,
  };
  window.ADLERCODE_PLATFORM_DATA = window.ADLERCODE_RESOURCE_DATA;
})();
